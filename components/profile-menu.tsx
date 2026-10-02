"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUserRound, LogOut, Settings, UserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

function getInitials(fullName: string | null, email: string) {
  const source = fullName?.trim() || email.split("@")[0] || "U";
  return source.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}

export function ProfileMenu({ email, fullName, avatarUrl }: { email: string; fullName: string | null; avatarUrl: string | null }) {
  const router = useRouter();
  const initials = getInitials(fullName, email);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label="Open profile menu" className="h-9 w-9 overflow-hidden rounded-full border border-input bg-muted text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center">{initials || <CircleUserRound className="h-5 w-5" />}</span>}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 py-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
              {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : <span className="text-xs font-semibold">{initials}</span>}
            </div>
            <div className="min-w-0"><p className="truncate text-sm font-semibold">{fullName || "Your profile"}</p><p className="truncate text-xs text-muted-foreground">{email}</p></div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/protected/profile"><UserRound />Profile</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/auth/update-password"><Settings />Change password</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(event) => { event.preventDefault(); void logout(); }} className="text-destructive focus:text-destructive"><LogOut />Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
