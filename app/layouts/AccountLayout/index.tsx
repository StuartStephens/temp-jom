"use client";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { StoredAddresses } from "../../StoredAddresses";
import { IAddressForm } from "../../components/AddressForm";
import { ChangePasswordWithFormSupport } from "../../components/ChangePassword";
import { DisplayEmails } from "../../components/EmailAddress/DisplayEmails";
import { ManageDonations } from "../../components/ManageDonations";
import { ManageSubscriptions } from "../../components/ManageSubscriptions";
import { PaymentInfo } from "../../components/PaymentInfo";
import { IBankAccountForm } from "../../components/PaymentInfo/BankAccountForm";
import { PhoneNumbers } from "../../components/PhoneNumbers";
import { useAuth } from "../../contexts/Auth/Context";
import {
  IMenuItem,
  useUIStateContext,
} from "../../contexts/UIStateContext/Context";
import { CHANGE_PASSWORD_FORM } from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import TransactionHistoryPageLayout from "../../../app/(main-pages)/manage-account/transaction-history/layout";

export interface IAccountLayoutProps { }

export function AccountLayout(props: IAccountLayoutProps) {
  const { emailHash } = useAuth();
  const { dispatch } = useUIStateContext();
  const [storedAddresses, setStoredAddresses] = useState<IAddressForm[]>([]);
  const [layout, setLayout] = useState("PAYMENT_INFORMATION");

  function updateLayout(value: string) {
    localStorage.setItem("accountLayout", value);
    setLayout(value);
  }

  useEffect(() => {
    const layoutValue: string | null = localStorage.getItem("accountLayout");
    // if (layoutValue) {
    //   setLayout(layoutValue);
    // } else {
    //   setLayout("PAYMENT_INFORMATION");

    const ACCOUNT__DASHBOARD_MENU = {
      Href: "/manage-account",
      IsDefault: true,
      IsSelected: true,
      Level: 2,
      Name: "DASHBOARD",
      ParentName: "ACCOUNT",
      ShowWhenLoggedIn: true,
      ShowWhenLoggedOut: false,
      DisableWhenLoggedIn: false,
      DisableWhenLoggedOut: false,
      Target: "_NEW",
      Text: "Dashboard",
      Title: "Dashboard",
      Icon: "DASHBOARD",
    } as IMenuItem;
    const ACCOUNT__MANAGE_INFO = {
      Href: "/manage-account/manage-information",
      IsDefault: true,
      IsSelected: false,
      Level: 2,
      Name: "MANAGE_INFO",
      ParentName: "ACCOUNT",
      ShowWhenLoggedIn: true,
      ShowWhenLoggedOut: false,
      DisableWhenLoggedIn: false,
      DisableWhenLoggedOut: false,
      Target: "_NEW",
      Text: "Manage Information",
      Title: "Manage Information",
      Icon: "MANAGE_INFO",
    } as IMenuItem;
    const ACCOUNT__TRANSACTION_HISTORY = {
      Href: "/manage-account/transaction-history",
      IsDefault: true,
      IsSelected: false,
      Level: 2,
      Name: "TRANSACTION_HISTORY",
      ParentName: "ACCOUNT",
      ShowWhenLoggedIn: true,
      ShowWhenLoggedOut: false,
      DisableWhenLoggedIn: false,
      DisableWhenLoggedOut: false,
      Target: "_NEW",
      Text: "Transaction History",
      Title: "Transaction History",
      Icon: "TRANSACTION_HISTORY",
    } as IMenuItem;

    const tnMenuItems: IMenuItem[] = [
      ACCOUNT__DASHBOARD_MENU,
      ACCOUNT__MANAGE_INFO,
      ACCOUNT__TRANSACTION_HISTORY,
    ];

    // addUpdateMenuState("ACCT_2ND_LEVEL", tnMenuItems);
    dispatch({
      type: "addUpdateMenuState",
      payload: { menuStateName: "ACCT_2ND_LEVEL", menuItems: tnMenuItems },
    });
  }, []);

  function removeAddress(indexToRemove: number) {
    const newAddresses = storedAddresses.filter((o, i) => i !== indexToRemove);
    setStoredAddresses(newAddresses);
  }

  function updateAddress(address: IAddressForm, indexToUpdate: number) {
    const newAddresses = storedAddresses.filter((o, i) => i !== indexToUpdate);
    setStoredAddresses([...newAddresses, address]);
  }

  function addAddress(address: IAddressForm) {
    const newAddrs: IAddressForm[] = storedAddresses
      ? JSON.parse(JSON.stringify(storedAddresses))
      : [];
    newAddrs.push(address);
    setStoredAddresses(newAddrs);
  }

  const getButtonVariant = (layoutName: string) => {
    return layout === layoutName ? "primary" : "outline-primary";
  };

  return (
    <Container fluid className="full-width">
      <Container fluid className="page-gutter ">
        <Row>
          <Col xs={12} sm={3} md={3} xl={2}>
            <ButtonGroup aria-label="Basic example" vertical>
              <Button
                variant={getButtonVariant("PAYMENT_INFORMATION")}
                onClick={() => updateLayout("PAYMENT_INFORMATION")}
              >
                PAYMENT INFORMATION
              </Button>
              <Button
                variant={getButtonVariant("PASSWORD")}
                onClick={() => updateLayout("PASSWORD")}
              >
                CHANGE PASSWORD
              </Button>
              <Button
                variant={getButtonVariant("ADDRESSES")}
                onClick={() => updateLayout("ADDRESSES")}
              >
                ADDRESSES
              </Button>
              <Button
                variant={getButtonVariant("DONATIONS")}
                onClick={() => updateLayout("DONATIONS")}
              >
                DONATIONS
              </Button>
              <Button
                variant={getButtonVariant("SUBSCRIPTIONS")}
                onClick={() => updateLayout("SUBSCRIPTIONS")}
              >
                SUBSCRIPTIONS
              </Button>
              <Button
                variant={getButtonVariant("TRANSACTION_HISTORY")}
                onClick={() => updateLayout("TRANSACTION_HISTORY")}
              >
                TRANSACTION HISTORY
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={12} sm={9} lg={9} xl={10}>
            <Container fluid className="full-width ">
              {/* {layout === "TRANSACTION_HISTORY" && (
                <TransactionHistoryPageLayout />
              )} */}
              {layout === "PAYMENT_INFORMATION" && <PaymentInfo />}
              {layout === "ADDRESSES" && (
                <>
                  <PhoneNumbers />
                  <DisplayEmails />
                  <StoredAddresses
                    // addresses={storedAddresses}
                    onRemoveAddress={removeAddress}
                    onEditAddress={updateAddress}
                    onAddAddress={addAddress}
                  />
                </>
              )}
              {layout === "DONATIONS" && <ManageDonations />}
              {layout === "SUBSCRIPTIONS" && <ManageSubscriptions />}
              {layout === "PASSWORD" && (
                <ChangePasswordWithFormSupport
                  defaultForm={
                    {
                      currentPassword: undefined,
                      newPassword: undefined,
                      confirmPassword: undefined,
                    } as IBankAccountForm
                  }
                  formConfiguration={{ formFields: CHANGE_PASSWORD_FORM }}
                />
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
