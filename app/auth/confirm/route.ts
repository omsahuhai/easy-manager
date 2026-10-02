import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

function safeNextPath(value: string | null) {
  if (!value) return "/protected/dashboard";
  try {
    const url = new URL(value, "http://easy-manager.local");
    if (url.origin !== "http://easy-manager.local") {
      return "/protected/dashboard";
    }
    return url.pathname + url.search;
  } catch {
    return value.startsWith("/") && !value.startsWith("//")
      ? value
      : "/protected/dashboard";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(searchParams.get("next"));

  if (tokenHash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      redirect(next);
    }

    redirect("/auth/error?error=Unable%20to%20confirm%20your%20email");
  }

  redirect("/auth/error?error=Invalid%20or%20expired%20confirmation%20link");
}
