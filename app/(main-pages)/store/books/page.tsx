import { Metadata } from "next";
import { BookListPage } from "./components/BookListPage";

export const metadata: Metadata = {
  title: "Store - Books",
};
export default function Page() {
  return <BookListPage />;
}
