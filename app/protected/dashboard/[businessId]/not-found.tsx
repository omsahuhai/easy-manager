import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowLeft } from "lucide-react";

export default function BusinessNotFound() {
  return (
    <Card className="w-full max-w-md mx-auto my-12 text-center shadow-md">
      <CardHeader className="flex flex-col items-center">
        <div className="p-3 rounded-full bg-muted text-muted-foreground mb-2">
          <Store className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl">Business Not Found</CardTitle>
        <CardDescription>
          This petrol pump outlet does not exist or you do not have permission to view it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/protected/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
