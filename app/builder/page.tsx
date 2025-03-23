import { auth } from "@/auth";
import BuilderPage from "./Builder";

export default async function page() {
  const session = await auth();
  return <BuilderPage session={session} />;
}
