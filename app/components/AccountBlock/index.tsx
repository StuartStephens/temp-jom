"use client";
import { ReactNode } from "react";
import { SecondaryMenu } from "../shared/Menus/SecondaryMenu";

export interface IAccountBlockProps {
  children: ReactNode;
}

export function AccountBlock(props: IAccountBlockProps) {
  const { children } = props;

  return (
    <div>
      <SecondaryMenu
        level={2}
        menuStateName="state-manage-account"
        onMenuSelect={(eventKey: string) => {}}
      />

      {children}
    </div>
  );
}
