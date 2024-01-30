import { TertiaryNavigationLayout } from "../../../components/shared/Menus/TertiaryNavigationLayout";

export default function ManageAccountInformationPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TertiaryNavigationLayout menuStateName="state-manage-information">
        {children}
      </TertiaryNavigationLayout>
    </>
  );
}
