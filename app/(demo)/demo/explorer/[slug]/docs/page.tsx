import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Explorer",
};
export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Documentation for:</h1>
      <h2>{params.slug}</h2>
    </div>
  );
}
