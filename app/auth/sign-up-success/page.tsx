import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="items-center text-center">
              <MailCheck className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-2xl">
                Check your email
              </CardTitle>
              <CardDescription>Account confirmation sent</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                You&apos;ve successfully signed up. Please check your email to
                confirm your account. Once confirmed, you can sign in below.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <Link href="/auth/login">Go to Login</Link>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Didn&apos;t receive an email?{" "}
                <Link href="/auth/sign-up" className="underline underline-offset-4">
                  Try again
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
