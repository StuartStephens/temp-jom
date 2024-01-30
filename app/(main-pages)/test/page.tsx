import { Metadata } from "next";
import Link from "next/link";
import { LoginDialog } from "../../components/authentication/LoginDialog";

export const metadata: Metadata = {
  title: "Test Page",
};
export default function Page() {
  return (
    <>
      Test
      <Link href="/test2">test 2 </Link>
      <LoginDialog show={true} />
    </>
  );
}
