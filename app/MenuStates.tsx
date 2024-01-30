"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  IMenuState,
  useUIStateContext,
} from "./contexts/UIStateContext/Context";
import { useEffect } from "react";
import { useAuth } from "./contexts/Auth/Context";

export interface IMenuStatesProps {
  menuItemStates: IMenuState[];
}

export function MenuStates(props: IMenuStatesProps) {
  const pathname = usePathname();

  const { dispatch } = useUIStateContext();
  const router = useRouter();
  const { contactInfo } = useAuth();

  function updateMenus(
    primarySegment: string = "home-page",
    secondarySegment?: string,
    tertiarySegment?: string
  ) {
    let payload = [];
    primarySegment &&
      payload.push({
        menuStateName: "state-root",
        menuItemName: primarySegment,
      });

    secondarySegment &&
      payload.push({
        menuStateName: "state-" + primarySegment,
        menuItemName: secondarySegment || "UNKNOWN",
      });

    tertiarySegment &&
      payload.push({
        menuStateName: "state-" + secondarySegment,
        menuItemName: tertiarySegment || "UNKNOWN",
      });
    dispatch({
      type: "setSelectedMenus",
      payload: payload,
    });
  }

  function updateMenuSelections() {
    var pathArray = pathname.split("/");
    const primarySegment = pathArray[1];
    const secondarySegment = pathArray[2];
    const tertiarySegment = pathArray[3];

    updateMenus(primarySegment, secondarySegment, tertiarySegment);
  }

  //updateMenuItemStates();
  useEffect(() => {
    dispatch({ type: "setMenuStates", payload: props.menuItemStates });
    // updateMenuItemStates();
  }, []);
  useEffect(() => {
    // updateMenuItemStates();
  }, [router]);
  useEffect(() => {
    // updateMenuItemStates();
    updateMenuSelections();
  }, [pathname]);

  return <></>;
}

