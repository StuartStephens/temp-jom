"use client";
import { usePathname } from "next/navigation";
import {
    ReactNode,
    createContext,
    useContext,
    useReducer,
    useState,
} from "react";
import { Container } from "react-bootstrap";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { deepCopy } from "../utilities/FormSupport/FSUtils";
import { convertCompilerOptionsFromJson } from "typescript";

interface ILinkCollection {
    Href: string;
    Title: string;
    Target: string;
    Text: string;
}

export enum NAV_LINK_TYPE {
    STANDARD = "STANDARD",
    DONATE = "DONATE",
    CART = "CART",
    SEARCH = "SEARCH",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export interface IMenuItem extends ILinkCollection {
    id: string;
    Name: string;
    ParentName?: string | undefined;
    IsSelected: boolean;
    IsDefault: boolean;
    Level: number;
    ShowWhenLoggedIn: boolean;
    ShowWhenLoggedOut: boolean;
    DisableWhenLoggedIn: boolean;
    DisableWhenLoggedOut: boolean;
    Icon?: string;
    IsTool: boolean;
    IsBrand: boolean;
    LinkType?: NAV_LINK_TYPE;
}

export interface ICompanyDetails {
    Name: string;
    LogoURL: string;
}

interface UIStateContextData {
    // level1NavState: IMenuItem[] | undefined;
    // setLevel1NavState: (menuItems: IMenuItem[]) => void;
    // level2NavState: IMenuItem[] | undefined;
    // setLevel2NavState: (menuItems: IMenuItem[]) => void;
    // level3NavState: IMenuItem[] | undefined;
    // setLevel3NavState: (menuItems: IMenuItem[]) => void;
    // addUpdateMenuState: (menuStateName: string, menuItems: IMenuItem[]) => void;
    menuStates: IMenuState[];
    getMenuItemsByMenuStateName: (menuStateName: string) => IMenuItem[];
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isDonateDialogVisible: boolean;
    setIsDonateDialogVisible: (isVisible: boolean) => void;
    // setSelectedMenu: (menuStateName: string, menuItemName: string) => void;
    getActiveKey: (menuStateName?: string) => string | undefined;
    companyDetails: ICompanyDetails;
    dispatch: Function;
}

const UIStateContext = createContext<UIStateContextData>(
    {} as UIStateContextData
);

interface UIStateProviderProps {
    children: ReactNode;
}

export interface IMenuState {
    name: string;
    menuItems?: IMenuItem[];
}

function reducer(state: IMenuState[], action: any): IMenuState[] {
    switch (action.type) {
        case "setMenuStates":
            // state = "action.payload";
            return action.payload || [];
        case "addUpdateMenuState":
            const { menuStateName, menuItems } = action.payload;
            const newState: IMenuState = {
                name: menuStateName,
                menuItems: menuItems,
            };

            if (state.includes(menuStateName)) {
                const newMenuStates1 = state.reduce(
                    (accum: IMenuState[], currVal: IMenuState) => {
                        if (currVal.name === menuStateName) {
                            accum.push(newState);
                        } else {
                            accum.push(currVal);
                        }
                        return accum;
                    },
                    []
                );
                return newMenuStates1;
            } else {
                const adding = state ? deepCopy(state) : [];

                return [...adding, newState];
            }
            break;

        case "setSelectedMenus":
            const copyState: IMenuState[] = deepCopy(state);
            if (!copyState || !copyState.reduce) {
                // why is this here?
            }
            let finalState: IMenuState[] = copyState.reduce(
                (accumStates: IMenuState[], currState: IMenuState) => {
                    const foundState = action?.payload?.find((o: any) => {
                        const { menuItemName, menuStateName } = o;
                        return o.menuStateName == currState.name;
                    });
                    if (
                        foundState &&
                        !(
                            currState &&
                            currState.menuItems &&
                            currState.menuItems.find((o: IMenuItem) => {
                                return o.IsSelected && o.Name === foundState.menuStateName;
                            })
                        )
                    ) {
                        //update the menuItems for that state
                        // const alreadySelected =
                        //   currState &&
                        //   currState.menuItems &&
                        //   currState.menuItems.find((o: IMenuItem) => {
                        //     return o.IsSelected && o.Name === foundState.menuStateName;
                        //   });
                        const newMenuItems =
                            currState &&
                            currState.menuItems &&
                            currState.menuItems.reduce(
                                (accumMenuItems: IMenuItem[], currMenu: IMenuItem) => {
                                    accumMenuItems.push({
                                        ...currMenu,
                                        ...{
                                            IsSelected: foundState.menuItemName === currMenu.Name,
                                        },
                                    });
                                    return accumMenuItems;
                                },
                                []
                            );
                        accumStates.push({
                            name: currState.name,
                            menuItems: newMenuItems,
                        } as IMenuState);
                    } else {
                        //add the existing state back to the accumilator
                        accumStates.push(currState);
                    }

                    // action.payload &&
                    // action.payload.map((o: any) => {
                    //   const { menuItemName, menuStateName } = o;

                    // if(currState.name == o.menuStateName){
                    //       //iterate the menu items and change the selected state, ONLY IF it is not already the selected item
                    // } else {

                    // }

                    return accumStates;
                },
                []
            );
            return finalState;

            break;
        case "setSelectedMenusXXX":
            const currStates: IMenuState[] = deepCopy(state);
            action.payload &&
                action.payload.map((o: any) => {
                    const { menuItemName, menuStateName } = o; //menuStateName, menuItemName
                    const menuState =
                        currStates &&
                        currStates.find((ms: IMenuState) => ms.name === menuStateName);
                    const selected =
                        menuState &&
                        menuState.menuItems &&
                        menuState.menuItems.find(
                            (menuItem: IMenuItem) => !!menuItem.IsSelected
                        );

                    if (selected && selected.Name === menuItemName) {
                    } else {
                        if (menuState && menuState.menuItems) {
                            const newMenuItems = menuState.menuItems.reduce(
                                (acc: IMenuItem[], currMenuItem: IMenuItem) => {
                                    acc.push({
                                        ...currMenuItem,
                                        ...({
                                            IsSelected: currMenuItem.Name === menuItemName,
                                        } as IMenuItem),
                                    });
                                    return acc;
                                },
                                []
                            );
                            menuState.menuItems = newMenuItems;
                        }
                    }
                });
            // const { menuItemName, menuStateName: menuStateName2 } = action.payload; //menuStateName, menuItemName
            // if (getActiveKey(menuStateName2) === menuItemName) {
            //   return state;
            // }
            // const currStates: IMenuState[] = deepCopy(state);
            // const newMenuStates = currStates.reduce(
            //   (accumStates: IMenuState[], currState: IMenuState) => {
            //     if (currState.name === menuStateName2) {
            //       const newMenuItems =
            //         currState &&
            //         currState.menuItems &&
            //         currState.menuItems.reduce(
            //           (acc: IMenuItem[], currMenuItem: IMenuItem) => {
            //             acc.push({
            //               ...currMenuItem,
            //               ...({
            //                 IsSelected: currMenuItem.Name === menuItemName,
            //               } as IMenuItem),
            //             });
            //             return acc;
            //           },
            //           []
            //         );
            //       const newState = {
            //         name: currState.name,
            //         menuItems: newMenuItems,
            //       } as IMenuState;
            //       accumStates.push(newState);
            //     } else {
            //       accumStates.push(currState);
            //     }

            //     return accumStates;
            //   },
            //   []
            // );
            // return newMenuStates;
            return state;

        default:
            return [];
    }
}

export function UIStateProvider({ children }: UIStateProviderProps) {
    const pathname = usePathname();

    const [menuStates, dispatch] = useReducer(reducer, []);
    const [isLoading, setIsLoading] = useState(false);
    const [isDonateDialogVisible, setIsDonateDialogVisible] = useState(false);
    const [companyDetails, setCompanyDetails] = useState({
        Name: "JOM",
        LogoURL: `https://int.joelosteen.com/globalassets/images/jom/logo-svg.svg`,
    } as ICompanyDetails);

    function getMenuItemsByMenuStateName(menuStateName: string): IMenuItem[] {
        if (!menuStates) return [];

        const ret =
            menuStates &&
            menuStates.find((ms: IMenuState) => ms.name === menuStateName);
        return (ret && ret.menuItems) || [];
    }

    function getActiveKey(menuStateName?: string): string | undefined {
        if (!menuStateName) return undefined;
        const menuState =
            menuStates &&
            menuStates.find((ms: IMenuState) => {
                return ms.name == menuStateName;
            });
        const selected =
            menuState &&
            menuState.menuItems &&
            menuState.menuItems.find((menuItem: IMenuItem) => !!menuItem.IsSelected);
        return selected?.id;
    }

    return (
        <UIStateContext.Provider
            value={{
                menuStates,
                getMenuItemsByMenuStateName,
                isDonateDialogVisible,
                setIsDonateDialogVisible,
                isLoading,
                setIsLoading,
                getActiveKey,
                // setSelectedMenu,
                companyDetails,
                dispatch,
            }}
        >
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <Container fluid className="full-width">
                    {/* <h6>menuStates</h6>
          {JSON.stringify(menuStates)} */}
                    {children}
                </Container>
            )}
        </UIStateContext.Provider>
    );
}

export function useUIStateContext(): UIStateContextData {
    const context = useContext(UIStateContext);
    if (!context) {
        throw new Error(
            "useUIStateContext must be used within an UIStateContextProvider"
        );
    }
    return context;
}
