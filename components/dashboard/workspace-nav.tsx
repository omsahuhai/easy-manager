"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Gauge, IndianRupee, Receipt, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceNavProps {
  businessId: string;
}

export function WorkspaceNav({ businessId }: WorkspaceNavProps) {
  const pathname = usePathname();

  const baseUrl = `/protected/dashboard/${businessId}`;

  const navItems = [
    {
      label: "Overview",
      href: baseUrl,
      icon: LayoutDashboard,
      isActive: pathname === baseUrl,
    },
    {
      label: "Daily Readings",
      href: `${baseUrl}/readings`,
      icon: Gauge,
      isActive: pathname.startsWith(`${baseUrl}/readings`),
    },
    {
      label: "Fuel Rates",
      href: `${baseUrl}/rates`,
      icon: IndianRupee,
      isActive: pathname.startsWith(`${baseUrl}/rates`),
    },
    {
      label: "Expenses",
      href: `${baseUrl}/expenses`,
      icon: Receipt,
      isActive: pathname.startsWith(`${baseUrl}/expenses`),
    },
    {
      label: "Reports",
      href: `${baseUrl}/reports`,
      icon: BarChart3,
      isActive: pathname.startsWith(`${baseUrl}/reports`),
    },
  ];

  return (
    <nav className="flex items-center gap-1 overflow-x-auto border-b pb-px scrollbar-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors",
              item.isActive
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
