"use client";

import { MENU_TYPE, Menu } from "../../../../app/components/navigation/Menu";

export interface IPrimaryMenuProps {}

export function PrimaryMenu(props: IPrimaryMenuProps) {
  return (
    <Menu menuStateName="state-root" level={1} menuType={MENU_TYPE.MAIN_MENU} />
  );
}
