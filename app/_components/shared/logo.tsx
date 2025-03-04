/**
 * Logo component for the application
 */
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function Logo({
  className,
  iconClassName,
  textClassName,
  showText = true,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Layers className={cn("h-6 w-6 text-primary", iconClassName)} />
      {showText && (
        <span className={cn("font-bold text-xl", textClassName)}>
          CursorStarter
        </span>
      )}
    </div>
  );
} 