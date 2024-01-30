import { ReactNode } from "react";

export default function PageLayout({
  params,
  children,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <div>
      {children}
      {/* {params.slug} */}
    </div>
  );
}
