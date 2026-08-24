import { PlusCircle, FileText, Settings, Banknote } from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  comingSoon?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function QuickActions(_props: { businessId: string }) {
  // businessId will be wired to routes in Phase 4
  const actions: QuickAction[] = [
    {
      icon: <PlusCircle className="h-5 w-5" />,
      label: "Add Reading",
      comingSoon: true,
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
      icon: <Settings className="h-5 w-5" />,
      label: "Manage Rates",
      comingSoon: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <button
          key={action.label}
          disabled={action.comingSoon}
          title={action.comingSoon ? "Coming in Phase 4" : undefined}
          className={`
            w-full h-24 flex flex-col items-center justify-center gap-2 rounded-md border
            text-sm font-medium transition-colors
            ${action.comingSoon
              ? "opacity-50 cursor-not-allowed bg-background text-muted-foreground border-border"
              : "hover:bg-accent hover:text-accent-foreground border-border cursor-pointer"
            }
          `}
        >
          {action.icon}
          <span>{action.label}</span>
          {action.comingSoon && (
            <span className="text-[10px] text-muted-foreground -mt-1">Phase 4</span>
          )}
        </button>
      ))}
    </div>
  );
}
