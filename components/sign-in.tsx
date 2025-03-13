import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button className="w-full" variant="outline" type="submit">
        <Icons.google className="mr-2 h-4 w-max" />
        Google
      </Button>
    </form>
  );
}
