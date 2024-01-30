"use client";
import { useEffect, useState } from "react";
import { LoginDialog } from "../LoginDialog";
import {
    IMenuState,
    useUIStateContext,
} from "../../../contexts/UIStateContext/Context";
import { useAuth } from "../../../contexts/Auth/Context";
// import { IContactInformation } from "../../../apis/Account/AccountTypes";
import { DonateDialog } from "../../DonateDialog";

export interface IAuthBlockProps {
    menuStates?: IMenuState[];
}

/*add the login dialog to a page causing that page to for isLogin query param and show the login dialog if the param is true*/
export function AuthBlock(props: IAuthBlockProps) {
    const { dispatch, isDonateDialogVisible, setIsDonateDialogVisible } =
        useUIStateContext();
    const { menuStates } = props;

    const {
        isLoginModalVisible,
        setIsLoginModalVisible,
        closeLoginModal,
        checkIsLoggedIn,
        openLoginModal,
    } = useAuth();

    useEffect(() => {
        let ulrparams = new URLSearchParams(document.location.search);
        let isLogin = ulrparams.get("isLogin");

        if (isLogin) {
            setIsLoginModalVisible(isLogin == "true");
        }
    }, [menuStates]);

    useEffect(() => {
        menuStates && dispatch({ type: "setMenuStates", payload: menuStates });
    }, []);

    useEffect(() => {
        let ulrparams = new URLSearchParams(document.location.search);
        let isDonate = ulrparams.get("donate");
        if (isDonate && checkIsLoggedIn()) {
            setIsDonateDialogVisible(true);
        } else if (isDonate && !checkIsLoggedIn()) {
            openLoginModal("/home-page?donate=true");
        }
    }, [checkIsLoggedIn()]);

    return (
        <>
            <LoginDialog
                show={isLoginModalVisible}
                onHide={() => {
                    closeLoginModal();
                }}
            />
            {isDonateDialogVisible && (
                <DonateDialog
                    show={isDonateDialogVisible}
                    onHide={() => {
                        setIsDonateDialogVisible(false);
                    }}
                />
            )}
        </>
    );
}

