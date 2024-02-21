'use client';
import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { useAuth } from "../../contexts/Auth/Context";
import {
    IMenuItem,
    useUIStateContext,
} from "../../contexts/UIStateContext/Context";
import Logo from "../../components/navbar/Logo";
import { MainMenu } from "./MainMenu";
import { TabMenu } from "./TabMenu";
import { TertiaryNavigation } from "./TertiaryNavigation";

import ShoppingCart from "./DynamicParts/Cart/ShoppingCart";

export enum MENU_TYPE {
    TAB_MENU = "TAB_MENU",
    MAIN_MENU = "MAIN_MENU",
    TERTIARY_MENU = "TERTIARY_MENU",
}

export interface IMenuProps {
    menuStateName: string; //identifies the menu, e.g. mainNav, or loginMenu
    level: number;
    menuType?: MENU_TYPE;
    onMenuSelect?: (eventKey: string) => void;
    className?: string;
}

export function Menu(props: any) {
    const { checkIsLoggedIn } = useAuth();
    const { menuType, onMenuSelect } = props;
    const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

    const { companyDetails, menuStates, getMenuItemsByMenuStateName } =
        useUIStateContext();

    const { menuStateName } = props;
    const [menuDisplayType, setMenuDisplayType] = useState(
        menuType || MENU_TYPE.TAB_MENU
    );

    useEffect(() => {
        const menuItemsForState = getMenuItemsByMenuStateName(menuStateName);
        menuItemsForState && setMenuItems(menuItemsForState);
    }, []);

    useEffect(() => {
        const menuItemsForState = getMenuItemsByMenuStateName(menuStateName);
        menuItemsForState && setMenuItems(menuItemsForState);
    }, [menuStates]);

    function handleMenuSelected(eventKey: any) {
        onMenuSelect && onMenuSelect(eventKey as string);
    }

    if (!menuItems || menuItems.length < 1) {
        return null;
    }

    if (MENU_TYPE.MAIN_MENU === menuDisplayType) {
        return (
            <MainMenu
                isLoggedIn={checkIsLoggedIn()}
                menuItems={menuItems}
                onSelect={handleMenuSelected}
            >
                <Navbar.Toggle aria-controls="basic-navbar-nav  " />
                <Navbar.Brand href="/home-page" className="align-self-start ">
                    <Logo
                        className="bs-logo align-self-start"
                        companyName={companyDetails.Name}
                        logoURL={companyDetails.LogoURL}
                        logoHeight={50}
                    />
                </Navbar.Brand>
                <div className="jom-cart-icon d-flex d-xl-none d-xxl-none">
                    <ShoppingCart />
                </div>
            </MainMenu>
        );
    }
    if (MENU_TYPE.TAB_MENU === menuDisplayType) {
        return (
            <TabMenu
                menuItems={menuItems}
                isLoggedIn={checkIsLoggedIn()}
                onSelect={handleMenuSelected}
            />
        );
    }
    if (MENU_TYPE.TERTIARY_MENU === menuDisplayType) {
        return (
            <TertiaryNavigation
                menuItems={menuItems}
                isLoggedIn={checkIsLoggedIn()}
                onSelect={handleMenuSelected}
            />
        );
    }
    return null;
}
