import { ReactNode, Suspense } from "react";
import { MenuStates } from "./MenuStates";
import { PrimaryMenu } from "./components/navbar/PrimaryMenu";
import { AuthBlock } from "./components/authentication/AuthBlock";

export interface IMasterViewProps {
  children: ReactNode;
}

async function getMenuItemStates() {
  try {
    const res = await fetch("http://localhost:4000/jomapi/MenuState", {
      next: {
        revalidate: 0, // millis frequency of cache
      },
    });
    const menuItemStates = await res.json();
    return menuItemStates;
  } catch (e) {
    console.error(e);
  } finally {
    //DONE
  }
  return;
}

// extract this as a server component so we can call API in server component
export async function MasterView(props: IMasterViewProps) {
  const menuItemStates = await getMenuItemStates();
  // if (!menuItemStates) {
  //   return null;
  // }
  return (
    <>
      {menuItemStates && <MenuStates menuItemStates={menuItemStates} />}

      <AuthBlock />
      <PrimaryMenu />

      {props.children}
    </>
  );
}
