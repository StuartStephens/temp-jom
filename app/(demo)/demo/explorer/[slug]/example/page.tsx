import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Explorer",
};
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My component id: {params.slug}</div>;
}
