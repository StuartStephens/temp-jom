"use client";

import {
  IMenuProps,
  MENU_TYPE,
  Menu,
} from "../../../components/navbar";

export function SecondaryMenu(props: IMenuProps) {
  const { menuStateName, onMenuSelect } = props;

  return (
    <Menu
      menuStateName={menuStateName}
      level={1}
      menuType={MENU_TYPE.TAB_MENU}
      onMenuSelect={onMenuSelect}
    />
  );
}
