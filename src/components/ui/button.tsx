import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90 shadow-soft",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/15 bg-white/5 backdrop-blur text-foreground hover:bg-white/10 hover:border-white/25",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",
        ghost: "text-foreground hover:bg-white/8",
        link: "text-foreground underline-offset-4 hover:underline rounded-none",
        hero: "glossy bg-gradient-sunset text-white shadow-glow-coral hover:shadow-float hover:-translate-y-0.5 border border-white/15",
        cobalt: "glossy bg-gradient-cobalt text-white shadow-glow-cobalt hover:shadow-float hover:-translate-y-0.5 border border-white/15",
        glass: "glass text-foreground hover:bg-white/12 border-white/15",
        gold: "glossy bg-gold text-gold-foreground hover:brightness-110 shadow-glow-gold border border-white/20",
        lilac: "glossy bg-gradient-lilac text-white shadow-card hover:-translate-y-0.5 border border-white/15",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
