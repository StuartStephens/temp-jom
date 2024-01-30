import { AccountInfoProvider } from "./contexts/AccountInformationContext/AccountInformationContext";
import { AuthProvider } from "./contexts/Auth/Context";
import { CMColorModeProvider } from "./contexts/ColorModeContext/CMColorModeContext";
import { UIStateProvider } from "./contexts/UIStateContext/Context";
import { MasterView } from "./MasterView";

export function Providers({
  children, //
}: {
  children: React.ReactNode;
}) {
  return (
    <CMColorModeProvider>
      <AuthProvider>
        <UIStateProvider>
          <AccountInfoProvider>
            <MasterView>{children}</MasterView>
          </AccountInfoProvider>
        </UIStateProvider>
      </AuthProvider>
    </CMColorModeProvider>
  );
}

