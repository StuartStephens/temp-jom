import { TertiaryNavigationLayout } from "../../../components/shared/Menus/TertiaryNavigationLayout";
import { ChurchInfoProvider } from "../../../contexts/ChurchInfoContext/ChurchInfoContext";

export default function ManageAccountInformationPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChurchInfoProvider>
        <TertiaryNavigationLayout menuStateName="state-church-info">
          {children}
        </TertiaryNavigationLayout>
      </ChurchInfoProvider>
    </>
  );
}
