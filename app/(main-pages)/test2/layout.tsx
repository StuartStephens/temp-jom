import { UserSettings } from "../../components/LoginForm/UserSettings";

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserSettings />
      {children}
    </>
  );
}
