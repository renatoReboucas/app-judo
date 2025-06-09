import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/authentication");
  if (!session?.user?.cpf) redirect("/user-form");
  return <div>Dashboard</div>;
};

export default DashboardPage;
