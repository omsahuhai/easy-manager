import Link from "next/link";
import { PlusCircle, FileText, Settings, Banknote } from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export function QuickActions({ businessId }: { businessId: string }) {
  const baseUrl = `/protected/dashboard/${businessId}`;

  const actions: QuickAction[] = [
    {
      icon: <PlusCircle className="h-5 w-5 text-primary" />,
      label: "Add Reading",
      href: `${baseUrl}/readings`,
    },
    {
      icon: <Banknote className="h-5 w-5 text-primary" />,
      label: "Add Expense",
      href: `${baseUrl}/expenses`,
    },
    {
      icon: <FileText className="h-5 w-5 text-primary" />,
      label: "View Reports",
      href: `${baseUrl}/reports`,
    },
    {
      icon: <Settings className="h-5 w-5 text-primary" />,
      label: "Manage Rates",
      href: `${baseUrl}/rates`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground border-border cursor-pointer shadow-sm bg-card"
        >
          {action.icon}
          <span>{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
