import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() { 
  const session = await auth();
  console.log(session)
  if(session) {
    redirect('/builder')
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 px-4 md:px-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Log in
            </Button>
          </form>
          <div className="text-center text-sm">
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <SignIn />
            <p className="text-center text-sm text-muted-foreground">
              Don`&apos;`t have an account?
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Create here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
