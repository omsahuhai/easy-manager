"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Workspace error boundary caught error:", error);
  }, [error]);

  return (
    <Card className="w-full max-w-lg mx-auto my-12 border-destructive/30 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Unable to Load Workspace</CardTitle>
            <CardDescription>
              An error occurred while loading this business workspace.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Please try refreshing the page or navigating back to your businesses.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Button onClick={reset} variant="default" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/protected/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
