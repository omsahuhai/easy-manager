import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="flex flex-col gap-8 items-center pt-16 pb-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-center">
          Manage your petrol pump <span className="text-primary">with ease.</span>
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl text-center">
          The all-in-one mobile-first accounting solution for petrol pump owners. Track sales, expenses, and analytics securely.
        </p>
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button asChild size="lg" className="px-8">
          <Link href="/auth/sign-up">Get Started</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="px-8">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-16" />
    </div>
  );
}
