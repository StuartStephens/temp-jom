"use client";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import {
  IPaymentMethod,
  PAYMENT_METHOD_TYPES,
} from "../../contexts/Auth/PaymentMethodTypes";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../contexts/Auth/Context";
import { RowActionButton } from "../../layouts/AccountLayout/RowActionButton";
import {
  CHANGE_PASSWORD_FORM,
  CHECKING_FORM,
} from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { LoadingSpinner } from "../LoadingSpinner";
import {
  BankAccountWithFormSupport,
  IBankAccountForm,
} from "./BankAccountForm";
import { CCWithFormSupport, ICreditCardForm } from "./CreditCardForm";
import { RemovePaymentMethodDialog } from "./RemovePaymentMethodDialog";

enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}

export interface IUpdatePaymentMethod {
  type: string;
  id: string;
}

const maskToLast4 = (value: string | undefined) => {
  //debugger;
  const retVal =
    value &&
    value.substring(0, value.length - 4).replaceAll(/./g, "*") +
    value.substring(value.length - 4, value.length);
  return retVal;
};

export function convertBankAccountFormToPaymentMethod(
  form: IBankAccountForm
): IPaymentMethod {
  const pm: IPaymentMethod = {
    //Id: form.acctID,
    // Alias: "EFT", //TODO: IS THIS CORRECT?
    // NameOnAccount: undefined,
    // IsSelected: true,
    // CardType: undefined,
    // CardExpMMYY: undefined,
    // CardToken: undefined, //form.acctID,
    // MaskedCardNumber: undefined,
    BankAccountNumber: form.accountNumber,
    Type: PAYMENT_METHOD_TYPES.CHECKING,
    BankRoutingNumber: form.routingNumber,
    BankAccountId: form.accountNumber,
    // Code: undefined,
    Company: form.bankName,
    // CustomerId: undefined,
    // DigitalWalletName: undefined,
    // Summary: form.accountType,
    // HasRequiredDetails: undefined,
  };
  return pm;
  // {
  //   "PaymentMethod": {
  //     "Type": "1",
  //     "BankRoutingNumber": "12345678",
  //     "BankAccountNumber": "1019991119999"
  //   },
  //   "FirstName": "Don",
  //   "LastName": "Test",
  //   "SuccessUrl": "https://int.joelosteen.com/store/cart/checkout/paypal-success",
  //   "CancelUrl": "https://int.joelosteen.com/store/cart",
  //   "BillingAddress": {
  //     "Id": null,
  //     "CustomerId": null,
  //     "FirstName": "Don",
  //     "LastName": "Test",
  //     "IsPrimary": false,
  //     "IsDefaultBilling": true,
  //     "IsDefaultShipping": false,
  //     "IsSelected": false,
  //     "City": "INDIAN TRAIL",
  //     "StateDetail": {
  //       "Name": "North Carolina",
  //       "Iso2Code": "NC",
  //       "Country": null,
  //       "IsSelected": false
  //     },
  //     "DoNotMail": false,
  //     "State": "North Carolina",
  //     "CountryDetail": {
  //       "Name": "UNITED STATES",
  //       "Iso2Code": "US",
  //       "Iso3Code": "USA",
  //       "IsSelected": false,
  //       "CurrencyId": "2910ccf8-ec75-e611-80ca-000d3a7075d4",
  //       "Id": "752029fe-6ea9-df11-9532-005056954cab"
  //     },
  //     "Country": "UNITED STATES",
  //     "Summary": "5507 FULTON RIDGE DR, Suite 4, INDIAN TRAIL, North Carolina, 28079, UNITED STATES",
  //     "Latitude": 0,
  //     "Longitude": 0,
  //     "Line1": "5507 FULTON RIDGE DR",
  //     "Line2": "Suite 4",
  //     "Person": null,
  //     "Name": null,
  //     "PostalCode": "28079",
  //     "HasBasicData": true
  //   }
  // }
}

export function convertCreditCardFormToPaymentMethod(
  form: ICreditCardForm
): IPaymentMethod {
  const pm: IPaymentMethod = {
    Id: form.cardId, //form.cardId || "",
    //Alias: "CreditCard",
    NameOnAccount: form.nameOnCard,
    //IsSelected: false,
    //CardType: form.cardType,
    CardExpMMYY: form.expirationDate?.replace("/", ""), ///"1033"
    //CardToken: undefined,
    MaskedCardNumber: form.cardNumber,
    //BankAccountNumber: undefined,
    Type: PAYMENT_METHOD_TYPES.CREDIT_CARD,
    //BankRoutingNumber: undefined,
    //BankAccountId: form.cardId,
    Code: form.securityCode,
    //Company: undefined,
    //CustomerId: undefined,
    //DigitalWalletName: undefined,
    // Summary: "Visa $***********4242 1033",
    //HasRequiredDetails: undefined,
  };
  return pm;
}
export function convertPaymentMethodToDisplayBankAccount(
  paymentMethod: IPaymentMethod
): IDisplayBankAccounts {
  const dbb: IDisplayBankAccounts = {
    acctID: paymentMethod.Id,
    bankName: paymentMethod.Company || "", //paymentMethod.Alias || "", // TODO: they do not show the bank name, API may not be returning it
    accountType:
      paymentMethod.Type === PAYMENT_METHOD_TYPES.CHECKING
        ? "Checking"
        : "Savings", //paymentMethod.Summary,
    routingNumber: paymentMethod.BankRoutingNumber,
    accountNumber: paymentMethod.BankAccountNumber,
  };
  return dbb;
}
export type IDisplayCreditCards = {
  cardId?: string;
  cardType?: string;
  last4Digits?: string;
  nameOnCard?: string;
  expirationDate?: string;
};
export type IDisplayBankAccounts = {
  acctID?: string;
  bankName?: string;
  accountType?: string;
  routingNumber?: string;
  accountNumber?: string;
};
export interface IPaymentInfoProps { }

export function PaymentInfo(props: IPaymentInfoProps) {
  const { fetchAPI } = useAuth();

  const { paymentMethods, setPaymentMethods, getCreditCardBrand } =
    useAccountInfoContext();
  const [creditCards, setCreditCards] = useState<IDisplayCreditCards[]>([]);
  const [bankAccounts, setBankAccounts] = useState<IDisplayBankAccounts[]>([]);
  const [isAddCCMode, setIsAddCCMode] = useState(false);
  const [isAddBankAcctMode, setIsAddBankAcctMode] = useState(false);
  const [paymentInfoBeingUpdated, setPaymentInfoBeingUpdated] = useState<
    IUpdatePaymentMethod | undefined
  >(undefined);

  function convertPaymentMethodToDisplayCreditCard(
    paymentMethod: IPaymentMethod
  ): IDisplayCreditCards {
    const dcc: IDisplayCreditCards = {
      cardId: paymentMethod.Id,
      cardType: paymentMethod.CardType,
      last4Digits: paymentMethod.MaskedCardNumber,
      nameOnCard: paymentMethod.NameOnAccount,
      expirationDate: paymentMethod.CardExpMMYY,
    };
    return dcc;
  }

  function onPaymentMethodsUpdated() {
    // TODO: set credit cards and bank accoutns]
    const bankAccounts: IDisplayBankAccounts[] = paymentMethods.reduce(
      (accum: IDisplayBankAccounts[], currVal: IPaymentMethod) => {
        if (
          currVal &&
          currVal.Type &&
          [
            PAYMENT_METHOD_TYPES.CHECKING,
            PAYMENT_METHOD_TYPES.SAVINGS,
          ].includes(currVal.Type)
        ) {
          const bankAccount: IDisplayBankAccounts =
            convertPaymentMethodToDisplayBankAccount(currVal);
          accum.push(bankAccount);
        }
        return accum;
      },
      []
    );
    setBankAccounts(bankAccounts);
    const creditCardsNew: IDisplayCreditCards[] = paymentMethods.reduce(
      (accum: IDisplayCreditCards[], currVal: IPaymentMethod) => {
        if (
          currVal &&
          currVal.Type &&
          [
            PAYMENT_METHOD_TYPES.CREDIT_CARD,
            PAYMENT_METHOD_TYPES.PAYPAL,
          ].includes(currVal.Type)
        ) {
          const creditCard: IDisplayCreditCards =
            convertPaymentMethodToDisplayCreditCard(currVal);
          accum.push(creditCard);
        }
        return accum;
      },
      []
    );
    setCreditCards(creditCardsNew);
  }

  useEffect(() => {
    onPaymentMethodsUpdated();
  }, [paymentMethods]);

  useEffect(() => {
    onPaymentMethodsUpdated();
  }, []);

  //TODO: this function should fetch the updated card data, and update the state of creditCards, but for now, we will spoof it
  function handleAddBankAccount(pm: IPaymentMethod) {
    const newPaymentMethods: IPaymentMethod[] = [...paymentMethods, pm];
    setPaymentMethods(newPaymentMethods);
  }

  function confirmRemoveBankAccount(id: string | undefined) {
    id &&
      setPaymentInfoBeingUpdated({
        type: "BankAccount",
        id: id,
      } as IUpdatePaymentMethod);
  }

  function confirmRemoveCreditCard(id: string | undefined) {
    id &&
      setPaymentInfoBeingUpdated({
        type: "CreditCard",
        id: id,
      } as IUpdatePaymentMethod);
  }

  async function handleRemovePaymentMethod(type: string, id: string) {
    if (id) {
      switch (type) {
        case "BankAccount":
          setPaymentInfoBeingUpdated({
            type: "BankAccount",
            id: id,
          } as IUpdatePaymentMethod);

          break;

        case "CreditCard":
          setPaymentInfoBeingUpdated({
            type: "CreditCard",
            id: id,
          } as IUpdatePaymentMethod);
          break;
      }
      const removePaymentMethod = (paymentMethodID: string) => {
        const url = `Contact/PaymentMethod/${paymentMethodID}`;
        return fetchAPI(url, null, "DELETE");
      };
      try {
        const response: Response = await removePaymentMethod(id);

        if (!response.ok) {
          const errorData = await response.json();
          console.debug("Error from removePaymentMethod:", errorData);
          throw new Error(
            "removePaymentMethod ERROR--",
            errorData.ExceptionMessage ||
            `HTTP error! status: ${response.status}`
          );
        } else {
          const newPaymentMethods = paymentMethods.filter(
            (o: IPaymentMethod) => {
              return o.Id != id;
            }
          );
          setPaymentMethods(newPaymentMethods);
        }
      } catch (e) {
        let result = "";
        if (typeof e === "string") {
          result = e.toUpperCase(); // works, `e` narrowed to string
        } else if (e instanceof Error) {
          result = e.message; // works, `e` narrowed to Error
        }
        // setPaymentInfoBeingUpdated("");
        console.error("ERROR OCURRED: while removing Payment Method", result);
      } finally {
        setPaymentInfoBeingUpdated(undefined);
      }
    }
  }

  function handleAddCreditCard(pm: IPaymentMethod) {
    const ccs: IPaymentMethod[] = [...paymentMethods, pm];
    setPaymentMethods(ccs);
  }

  return (
    <Container fluid className="full-width">
      {/* FIX THE DISPLAY AFTER ADDING */}
      {/* <h3>CC</h3>
      {JSON.stringify(creditCards)}
      <h3>BANKS</h3>
      {JSON.stringify(bankAccounts)} */}

      <h2 className="pt-3 pb-5">Payment Information</h2>

      {!isAddCCMode && (
        <>
          <Container fluid className="full-width">
            <Row className="pb-3">
              <Col xs={12} md={9}>
                <h3>Credit/Debit Cards on File</h3>
              </Col>
              <Col
                xs={12}
                md={3}
                className="d-flex flex-row justify-content-end align-items-center"
              >
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsAddCCMode(true);
                  }}
                >
                  Add New Card
                </Button>
              </Col>
            </Row>
          </Container>
          <RemovePaymentMethodDialog
            type={paymentInfoBeingUpdated?.type}
            idToDelete={paymentInfoBeingUpdated?.id}
            title="Remove Credit Card"
            message="Are you sure you want to remove this Credit Card?"
            show={
              !!paymentInfoBeingUpdated &&
              paymentInfoBeingUpdated.id !== "" &&
              !!paymentInfoBeingUpdated.type &&
              paymentInfoBeingUpdated.type === "CreditCard"
            }
            onCancel={() => {
              setPaymentInfoBeingUpdated(undefined);
            }}
            onConfirm={() => {
              paymentInfoBeingUpdated &&
                handleRemovePaymentMethod(
                  paymentInfoBeingUpdated?.type,
                  paymentInfoBeingUpdated?.id
                );
            }}
          />
          <Table className="full-width">
            <thead>
              <tr className="pb-2">
                <th>Card Type</th>
                <th>Card Number</th>
                <th>Name on Card</th>
                <th>Exp. Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {creditCards &&
                creditCards.map((card: IDisplayCreditCards, index: number) => {
                  return paymentInfoBeingUpdated?.id === card.cardId ? (
                    <tr className="pb-2 " key={`ccSpinner_${card.cardId}`}>
                      <td colSpan={5}>
                        <LoadingSpinner />
                      </td>
                    </tr>
                  ) : (
                    <tr className="pb-2" key={`card_${card.cardId}`}>
                      <td>
                        {card.cardType && getCreditCardBrand(card.cardType) ? (
                          // <Container style="heig">
                          <Image
                            className="text-small"
                            src={getCreditCardBrand(card.cardType)?.imageUrl}
                            alt={card.cardType}
                            width="60"
                          />
                        ) : (
                          // </div>
                          <></>
                        )}
                      </td>
                      <td>{card.last4Digits}</td>
                      <td>{card.nameOnCard}</td>
                      <td>{card.expirationDate}</td>
                      <td>
                        <div className=" d-flex flex-column gap-1">
                          <RowActionButton
                            onClick={() => {
                              confirmRemoveCreditCard(card.cardId);
                            }}
                          >
                            REMOVE
                          </RowActionButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
      {isAddCCMode && (
        // <FormSupportProvider
        // config={makeContextConfig(CREDIT_CARD_FORM, "TODO_FILL_LATER")}
        // >
        <CCWithFormSupport
          defaultForm={
            {
              cardNumber: "",
              nameOnCard: "",
              expirationDate: "01/23", //formatDateForPicker(), //new Date().toISOString().split("T")[0],
              securityCode: "",
              cardType: "",
            } as ICreditCardForm
          }
          formConfiguration={{ formFields: CHANGE_PASSWORD_FORM }}
          mode={FORM_MODE.ADD}
          onSaveSuccess={(returnedData: IPaymentMethod) => {
            handleAddCreditCard(returnedData);
            setIsAddCCMode(false);
            //alert("save not implement");
          }}
          onCancel={() => {
            setIsAddCCMode(false);
          }}
        />
        // </FormSupportProvider>
      )}
      <br />
      <br />
      <br />
      <br />
      {!isAddBankAcctMode && (
        <>
          <Container fluid className="full-width">
            <Row className="pb-3">
              <Col xs={12} md={9}>
                <h3>Bank Accounts on File</h3>
              </Col>
              <Col
                xs={12}
                md={3}
                className="d-flex flex-row justify-content-end align-items-center"
              >
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsAddBankAcctMode(true);
                  }}
                >
                  Add a New Bank Account
                </Button>
              </Col>
            </Row>
          </Container>
          <RemovePaymentMethodDialog
            type={paymentInfoBeingUpdated?.type}
            idToDelete={paymentInfoBeingUpdated?.id}
            title="Remove Bank Account"
            message="Are you sure you want to remove this bank account?"
            show={
              !!paymentInfoBeingUpdated &&
              paymentInfoBeingUpdated.id !== "" &&
              !!paymentInfoBeingUpdated.type &&
              paymentInfoBeingUpdated.type === "BankAccount"
            }
            onCancel={() => {
              setPaymentInfoBeingUpdated(undefined);
            }}
            onConfirm={() => {
              paymentInfoBeingUpdated &&
                handleRemovePaymentMethod(
                  paymentInfoBeingUpdated?.type,
                  paymentInfoBeingUpdated?.id
                );
            }}
          />
          <Table>
            <thead>
              <tr className="pb-2">
                <td>Bank</td>
                <td>Account Type</td>
                <td>Routing Number</td>
                <td>Account Number</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {bankAccounts &&
                bankAccounts.map((account: IDisplayBankAccounts) => {
                  return paymentInfoBeingUpdated?.id === account.acctID ? (
                    <tr className="pb-2 " key={`baSpinner_${account.acctID}`}>
                      <td colSpan={5}>
                        <LoadingSpinner />
                      </td>
                    </tr>
                  ) : (
                    <tr className="pb-2" key={`bankAccount_${account.acctID}`}>
                      <td>{account.bankName}</td>
                      <td>{account.accountType}</td>
                      <td>{account.routingNumber}</td>
                      <td>{maskToLast4(account.accountNumber)}</td>
                      <td>
                        <div className=" d-flex flex-column gap-1">
                          <RowActionButton
                            onClick={() => {
                              confirmRemoveBankAccount(account.acctID);
                            }}
                          >
                            REMOVE
                          </RowActionButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
      {isAddBankAcctMode && (
        // <FormSupportProvider
        // >
        <BankAccountWithFormSupport
          defaultForm={
            {
              acctID: "",
              bankName: "",
              accountType: "Checking",
              routingNumber: "",
            } as IBankAccountForm
          }
          formConfiguration={{ formFields: CHECKING_FORM }}
          mode={FORM_MODE.ADD}
          onSaveSuccess={(returnedData: IPaymentMethod) => {
            handleAddBankAccount(returnedData);
            setIsAddBankAcctMode(false);
            //alert("save not implement");
          }}
          onCancel={() => {
            setIsAddBankAcctMode(false);
          }}
        />
        // </FormSupportProvider>
      )}
    </Container>
  );
}
