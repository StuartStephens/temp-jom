import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Test Page",
};
export default function Page() {
  return (
    <>
      Test 2<Link href="/test">test </Link>
    </>
  );
}
