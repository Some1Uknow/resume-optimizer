import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { v4 as uuidv4 } from "uuid";

export default function SignIn() {
  
  const handleSignIn = async () => {
    "use server";
    const id = uuidv4();
    await signIn("google", { redirectTo: `/builder/${id}` });
  };

  return (
    <form action={handleSignIn}>
      <Button className="w-full" variant="outline" type="submit">
        <Icons.google className="mr-2 h-4 w-max" />
        Google
      </Button>
    </form>
  );
}
