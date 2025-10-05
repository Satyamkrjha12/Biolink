import { cn } from "@/lib/utils" // or replace with your class utility

export function Badge({ children, variant = "default" }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-xs font-medium rounded", {
      "border border-gray-400 text-gray-800": variant === "outline",
      "bg-blue-500 text-white": variant === "default"
    })}>
      {children}
    </span>
  );
}
