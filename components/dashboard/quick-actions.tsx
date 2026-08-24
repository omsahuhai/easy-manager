import Link from "next/link";
import { PlusCircle, FileText, Settings, Banknote } from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  href?: string;
  comingSoon?: boolean;
}

export function QuickActions({ businessId }: { businessId: string }) {
  const baseUrl = `/protected/dashboard/${businessId}`;

  const actions: QuickAction[] = [
    {
      icon: <PlusCircle className="h-5 w-5 text-primary" />,
      label: "Add Reading",
      href: `${baseUrl}/readings`,
      comingSoon: false,
    },
    {
      icon: <Banknote className="h-5 w-5" />,
      label: "Add Expense",
      comingSoon: true,
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "View Reports",
      comingSoon: true,
    },
    {
      icon: <Settings className="h-5 w-5 text-primary" />,
      label: "Manage Rates",
      href: `${baseUrl}/rates`,
      comingSoon: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => {
        if (action.href) {
          return (
            <Link
              key={action.label}
              href={action.href}
              className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground border-border cursor-pointer shadow-sm"
            >
              {action.icon}
              <span>{action.label}</span>
            </Link>
          );
        }

        return (
          <button
            key={action.label}
            disabled={action.comingSoon}
            title="Available in subsequent phase"
            className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-md border text-sm font-medium transition-colors opacity-50 cursor-not-allowed bg-background text-muted-foreground border-border"
          >
            {action.icon}
            <span>{action.label}</span>
            <span className="text-[10px] text-muted-foreground -mt-1">Coming Soon</span>
          </button>
        );
      })}
    </div>
  );
}
