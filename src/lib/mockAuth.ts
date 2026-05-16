export type MockUserRole = "guest" | "host";

export type MockUser = {
  name: string;
  role: string;
  city: string;
  email: string;
  whatsapp: string;
  verified: boolean;
  roleType: MockUserRole;
};

export const JUAN_MOCK_USER: MockUser = {
  name: "Juan Sierra",
  role: "Anfitrión + Creador",
  city: "Medellín, Colombia",
  email: "juan@booked.co",
  whatsapp: "+57 300 123 4567",
  verified: true,
  roleType: "host",
};

const AUTH_KEY = "booked.mockUser";

export const getMockUser = (): MockUser | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    window.localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const setMockUser = (roleType: MockUserRole = "host") => {
  if (typeof window === "undefined") return JUAN_MOCK_USER;
  const user: MockUser = { ...JUAN_MOCK_USER, roleType };
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("booked-auth-change"));
  return user;
};

export const clearMockUser = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event("booked-auth-change"));
};
