// import { headers } from "next/headers";
// import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import { auth } from "@/lib/auth";
import LoginForm from "./_components/login-form";
import SignUpFormFull from "./_components/sign-up-form-full";

const AuthenticationPage = async () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  // if (session?.user) {
  //   redirect("/dashboard");
  // }
  return (
    <div className="flex min-h-screen items-center justify-center p-10">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpFormFull />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
