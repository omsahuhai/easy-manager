import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getBusinessesForUser } from "@/lib/queries/businesses";
import { CreateBusinessForm } from "@/components/business/create-business-form";

export default async function CreateBusinessPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const businesses = await getBusinessesForUser();
  const isFirstBusiness = businesses.length === 0;

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <CreateBusinessForm isFirstBusiness={isFirstBusiness} />
    </div>
  );
}
