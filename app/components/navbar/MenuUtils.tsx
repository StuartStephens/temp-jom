// import { IMenuItem } from "../../../src/contexts/UIStateContext.tsx/Context";

export const showMenu = (isLoggedIn: boolean, menuItem: any): boolean => {
    return (
        (isLoggedIn && menuItem.ShowWhenLoggedIn) ||
        (!isLoggedIn && menuItem.ShowWhenLoggedOut)
    );
};

export const disableMenu = (
    isLoggedIn: boolean,
    menuItem: any
): boolean => {
    return (
        (isLoggedIn && menuItem.DisableWhenLoggedIn) ||
        (!isLoggedIn && menuItem.DisableWhenLoggedOut)
    );
};
