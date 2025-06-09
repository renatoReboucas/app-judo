import { headers } from "next/headers";

import SignUpFormFull from "@/app/authentication/_components/sign-up-form-full";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { users } from "@/db/schema";
import { auth } from "@/lib/auth";

const UserFormPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <Dialog open>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Concluir cadastro</DialogTitle>
          <DialogDescription>
            Por favor, preencha os campos abaixo para concluir seu cadastro.
          </DialogDescription>
        </DialogHeader>
        {session?.user && (
          <SignUpFormFull user={session.user as typeof users.$inferSelect} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserFormPage;
