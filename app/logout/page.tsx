import { Metadata } from "next";
import { LoginFormLayout } from "../../app/components/LoginForm/LoginFormLayout";
import { MainLayout } from "../../app/layouts/MainLayout";

export const metadata: Metadata = {
  title: "Logout",
};
export default function LogoutPage() {
  return <MainLayout />;
}
