import Link from "next/link";
import { Fuel } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-semibold text-base ${className || ""}`}>
      <Fuel className="h-5 w-5 text-primary" />
      <span>Easy Manager</span>
    </Link>
  );
}
