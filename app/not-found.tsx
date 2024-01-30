import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  return (
    <div>
      <h2>Oops! </h2>
      <p> We can&apos;t find the page you are looking for!</p>
      <Link href="/home">Return to Home</Link>
    </div>
  );
}
