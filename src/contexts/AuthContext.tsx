import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getProfileById, upsertProfile } from "@/data/profilesRepository";
import { clearMockUser, getMockUser, setMockUser, type MockUserRole } from "@/lib/mockAuth";
import type { UserProfile, UserRole } from "@/lib/marketplaceTypes";
import { isSupabaseConfigured } from "@/lib/supabaseStatus";

type SignUpInput = {
  email: string;
  password: string;
  fullName: string;
  roleType: MockUserRole;
};

type SignInInput = {
  email: string;
  password: string;
  roleType: MockUserRole;
};

type AuthResult = {
  profileCreated: boolean;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  profileSynced: boolean;
  loading: boolean;
  profileLoading: boolean;
  isAuthenticated: boolean;
  isMockMode: boolean;
  signIn: (input: SignInInput) => Promise<AuthResult>;
  signUp: (input: SignUpInput) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  activateMockUser: (roleType?: MockUserRole) => void;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

const logAuthDev = (label: string, error: unknown) => {
  if (import.meta.env.DEV) {
    console.warn(`[Booked auth] ${label}`, error);
  }
};

const buildProfileForUser = (authUser: User, fullName?: string, roleType: MockUserRole = "guest"): UserProfile => {
  const roles: UserRole[] = roleType === "host" ? ["creador", "anfitrion"] : ["creador"];
  const email = authUser.email || "";

  return {
    id: authUser.id,
    fullName: fullName || authUser.user_metadata?.full_name || email.split("@")[0] || "Creador Booked",
    email,
    city: "Medellín, Colombia",
    phone: "",
    avatarUrl: "",
    roles,
    verificationStatus: "pending",
    whatsappConnected: false,
    createdAt: new Date().toISOString(),
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileSynced, setProfileSynced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [mockVersion, setMockVersion] = useState(0);

  const isMockMode = !isSupabaseConfigured;

  const loadProfile = useCallback(async (authUser: User | null) => {
    if (!authUser || !supabase) {
      setProfile(null);
      return;
    }

    setProfileLoading(true);
    try {
      const loadedProfile = await getProfileById(authUser.id);
      if (loadedProfile) {
        setProfile(loadedProfile);
        setProfileSynced(true);
        return;
      }

      const fallbackProfile = buildProfileForUser(authUser);
      try {
        const createdProfile = await upsertProfile(fallbackProfile);
        setProfile(createdProfile);
        setProfileSynced(true);
      } catch (error) {
        logAuthDev("profile auto-create failed during profile load", error);
        setProfile(fallbackProfile);
        setProfileSynced(false);
      }
    } catch (error) {
      logAuthDev("profile load failed", error);
      setProfile(buildProfileForUser(authUser));
      setProfileSynced(false);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let mounted = true;

    supabase.auth.getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        setUser(data.session?.user || null);
        loadProfile(data.session?.user || null).finally(() => {
          if (mounted) setLoading(false);
        });
      })
      .catch((error) => {
        logAuthDev("session restore failed", error);
        if (mounted) {
          setSession(null);
          setUser(null);
          setLoading(false);
        }
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user || null);
      loadProfile(nextSession?.user || null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [loadProfile]);

  useEffect(() => {
    const updateMock = () => setMockVersion((current) => current + 1);
    window.addEventListener("storage", updateMock);
    window.addEventListener("booked-auth-change", updateMock);
    return () => {
      window.removeEventListener("storage", updateMock);
      window.removeEventListener("booked-auth-change", updateMock);
    };
  }, []);

  const mockUser = useMemo(() => getMockUser(), [mockVersion]);

  const createProfileForUser = useCallback(async (authUser: User, fullName: string, roleType: MockUserRole) => {
    const nextProfile = buildProfileForUser(authUser, fullName, roleType);
    const savedProfile = await upsertProfile(nextProfile);
    setProfile(savedProfile);
    setProfileSynced(true);
  }, []);

  const signIn = useCallback(async ({ email, password, roleType }: SignInInput) => {
    if (!supabase) {
      setMockUser(roleType);
      return { profileCreated: true };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      logAuthDev("Supabase login error", error);
      throw error;
    }
    setSession(data.session);
    setUser(data.user);
    await loadProfile(data.user);
    return { profileCreated: true };
  }, [loadProfile]);

  const signUp = useCallback(async ({ email, password, fullName, roleType }: SignUpInput) => {
    if (!supabase) {
      setMockUser(roleType);
      return { profileCreated: true };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: roleType === "host" ? "anfitrion" : "creador",
        },
      },
    });
    if (error) {
      logAuthDev("Supabase signup error", error);
      throw error;
    }
    if (!data.user) throw new Error("No pudimos crear la cuenta. Inténtalo de nuevo.");

    setSession(data.session);
    setUser(data.user);
    try {
      await createProfileForUser(data.user, fullName, roleType);
      return { profileCreated: true };
    } catch (error) {
      logAuthDev("profile insert failed after signup", error);
      setProfile(buildProfileForUser(data.user, fullName, roleType));
      setProfileSynced(false);
      return { profileCreated: false };
    }
  }, [createProfileForUser]);

  const signOut = useCallback(async () => {
    clearMockUser();
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    setSession(null);
    setUser(null);
    setProfile(null);
    setProfileSynced(false);
  }, []);

  const activateMockUser = useCallback((roleType: MockUserRole = "host") => {
    setMockUser(roleType);
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(user);
  }, [loadProfile, user]);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    user,
    profile,
    profileSynced,
    loading,
    profileLoading,
    isAuthenticated: Boolean(user || mockUser),
    isMockMode,
    signIn,
    signUp,
    signOut,
    activateMockUser,
    refreshProfile,
  }), [activateMockUser, isMockMode, loading, mockUser, profile, profileLoading, profileSynced, refreshProfile, session, signIn, signOut, signUp, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
