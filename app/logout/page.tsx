import { Metadata } from "next";
// import { LoginFormLayout } from "../../src/components/LoginForm/LoginFormLayout";
import { MainLayout } from "../layouts/MainLayout";

export const metadata: Metadata = {
  title: "Logout",
};
export default function LogoutPage() {
  return <MainLayout />;
}
