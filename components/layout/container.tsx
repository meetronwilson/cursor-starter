/**
 * Container component for consistent layout spacing
 */
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "small" | "large" | "full";
}

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6",
        {
          "max-w-screen-xl": size === "default",
          "max-w-screen-lg": size === "small",
          "max-w-screen-2xl": size === "large",
          "max-w-none": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 