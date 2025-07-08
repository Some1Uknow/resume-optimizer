import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function BuilderIndexPage() {
  // Generate a new UUID and redirect to the builder with that ID
  const newId = uuidv4();
  redirect(`/app/builder/${newId}`);
}
