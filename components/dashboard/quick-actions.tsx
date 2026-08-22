import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Settings, Banknote } from "lucide-react";
import Link from "next/link";

export function QuickActions({ businessId }: { businessId: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Link href={`/protected/dashboard/${businessId}/meter-readings/new`}>
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <PlusCircle className="h-6 w-6" />
          <span>Add Reading</span>
        </Button>
      </Link>
      <Link href={`/protected/dashboard/${businessId}/expenses/new`}>
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <Banknote className="h-6 w-6" />
          <span>Add Expense</span>
        </Button>
      </Link>
      <Link href={`/protected/dashboard/${businessId}/reports`}>
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <FileText className="h-6 w-6" />
          <span>View Reports</span>
        </Button>
      </Link>
      <Link href={`/protected/dashboard/${businessId}/settings/rates`}>
        <Button variant="outline" className="w-full h-24 flex flex-col gap-2">
          <Settings className="h-6 w-6" />
          <span>Manage Rates</span>
        </Button>
      </Link>
    </div>
  );
}
