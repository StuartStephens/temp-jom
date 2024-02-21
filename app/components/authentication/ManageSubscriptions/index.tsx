"use client";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../contexts/Auth/Context";
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";
import { IEmailSubscription } from "../../contexts/Auth/EmailSubscriptionsTypes";
import { LoadingSpinner } from "../LoadingSpinner";

export enum SUBSCRIPTION_STATUS {
  UNSUB = "UnSub",
  SUB = "Sub",
}

export interface IEmailSubscriptionStatus {
  EmailAddress: string;
  EmailListsToAdd?: string[];
  EmailListsToRemove?: string[];
  InterestsToAdd?: string[];
  InterestsToRemove?: string[];
}

export interface IManageSubscriptionsProps {}

export function ManageSubscriptions(props: IManageSubscriptionsProps) {
  const { emailAddresses } = useAccountInfoContext();
  const { fetchAPI } = useAuth();

  // eslint-disable-next-line
  const [columnWidth, setColumnWidth] = useState(4); //TODO: keeping this for now, in case we opt not to use tables here
  const [emailSubscriptions, setEmailSubscriptions] = useState<
    IEmailSubscription[]
  >([]);
  const [uniqueSubscriptions, setUniqueSubscriptions] = useState<
    IEmailSubscription[]
  >([]);
  const [originalData, setOriginalData] = useState<IEmailSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsUpdating, setRowsUpdating] = useState<string[]>([]); //when a row is being udpated , keep the email address here

  useEffect(() => {
    if (!emailSubscriptions || emailSubscriptions.length < 1) {
      initSubscriptions();
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initSubscriptions();
    // eslint-disable-next-line
  }, [emailAddresses]);

  async function initSubscriptions() {
    setIsLoading(true);
    const newEmails: IEmailAddress[] = JSON.parse(
      JSON.stringify(emailAddresses)
    );

    let emailSubscriptionsByEmail: IEmailSubscription[] = [];

    if (newEmails && newEmails.length > 0) {
      const responses = await Promise.all(
        newEmails.map(async (currentValue: IEmailAddress) => {
          // function getSubscriptionByEmail() {
          // async function updateEmailAddresses() {
          //if (checkIsLoggedIn()) {

          const emailsAPI = await fetchAPI(
            "Contact/EmailSubscriptions?" + "email=" + currentValue.Email,
            undefined,
            "GET"
          )
            .then((response) => response.json())
            .then((response) => {
              const displayValues: IEmailSubscription[] = response.filter(
                (val: IEmailSubscription) => {
                  return "Joel Osteen Ministries" === val.Organization;
                }
              );
              emailSubscriptionsByEmail = [
                ...emailSubscriptionsByEmail,
                ...displayValues,
              ];
            })
            .catch((e) => {
              console.error("ERROR");
            });
          //}
          // }
          // }
          // updateEmailAddresses();
        })
      ).then((values) => {
        setIsLoading(false);
        setEmailSubscriptions(emailSubscriptionsByEmail);
        // dispatch({ type: ORIGINAL_DATA_ACTIONS.SET_STATE, payload: newData });;
        setOriginalData(JSON.parse(JSON.stringify(emailSubscriptionsByEmail)));
        function reduceUniqueSubscriptions(
          accum: IEmailSubscription[],
          currVal: IEmailSubscription
        ): IEmailSubscription[] {
          const retVal: IEmailSubscription[] = accum.some(
            (o) => o.ListName === currVal.ListName
          )
            ? [...accum]
            : [...accum, currVal];

          return retVal;
        }

        const unique: IEmailSubscription[] = JSON.parse(
          JSON.stringify(emailSubscriptionsByEmail)
        ).reduce(reduceUniqueSubscriptions, []);

        if (unique && unique.length > 0) {
          setColumnWidth(Math.floor(11 / unique.length));
        } else {
          setColumnWidth(11);
        }
        setUniqueSubscriptions(unique);
      });
    } else {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setEmailSubscriptions(JSON.parse(JSON.stringify(originalData)));
  }

  function handleCancel() {
    resetForm();
  }

  function validateForm() {
    //no validation here
    postForm();
  }

  async function updateMultipleEmailSubscriptions(
    emailSubs: IEmailSubscriptionStatus[]
  ) {
    setIsLoading(true);
    const responses = await Promise.all(
      emailSubs.map(async (subStatus: IEmailSubscriptionStatus) => {
        const postSupscriptionAPI = await fetchAPI(
          "Contact/Subscriptions",
          subStatus,
          "POST"
        ).then((response) => {
          if (response.ok) {
            //
          }
        });
      })
    )
      .then((values) => {
        setIsLoading(false);
        initSubscriptions();
      })
      .catch((e) => {
        throw new Error("ONE OR MORE SUBSCRIPTIONS FAILED TO UPDATE");
      });
  }

  function convertFormToPostDataAndUpdate() {
    //TODO: we can probably do some comparisons with the original data to prevent all the calls to the backend, the existing site calls one for each email address
    let emailSubStatuses: IEmailSubscriptionStatus[] = [];
    emailAddresses.forEach((email: IEmailAddress) => {
      const emailAddress: string = email.Email;
      const emailListsToAdd: string[] = [];
      const emailListsToRemove: string[] = [];
      const forThisEmail: IEmailSubscription[] = emailSubscriptions.filter(
        (sub: IEmailSubscription) => sub.EmailAddress == email.Email
      );
      forThisEmail.forEach((sub: IEmailSubscription) => {
        if (sub.IsSubscribed) {
          emailListsToAdd.push(sub.ListName);
        } else if (!sub.IsSubscribed) {
          emailListsToRemove.push(sub.ListName);
        }
      });
      const update: IEmailSubscriptionStatus = {
        EmailAddress: emailAddress,
        EmailListsToAdd: emailListsToAdd,
        EmailListsToRemove: emailListsToRemove,
        // InterestsToAdd: ["string"],
        // InterestsToRemove: ["string"],
      };
      emailSubStatuses.push(update);
      // updateSubscriptionForEmail(update);
    });
    updateMultipleEmailSubscriptions(emailSubStatuses);
  }
  function postForm() {
    convertFormToPostDataAndUpdate();
    setOriginalData(JSON.parse(JSON.stringify([...emailSubscriptions])));
    return;
    let msg: string = "";
    for (var i = 0; i < emailSubscriptions.length; i++) {
      msg +=
        emailSubscriptions[i].EmailAddress +
        (emailSubscriptions[i].IsSubscribed
          ? " IS SUBSCRIBED TO: "
          : " IS NOT SUBSCRIBED TO ") +
        emailSubscriptions[i].ListTitle +
        "\n";
    }
    alert("TODO: implement the save API\n\n" + msg);
    //Need to do a deep copy here
    setOriginalData(JSON.parse(JSON.stringify(emailSubscriptions)));
  }

  function handleSubscriptionChecked(subscriptionList: IEmailSubscription) {
    let newSusbcriptions: IEmailSubscription[] = [...emailSubscriptions];
    const oldSub: IEmailSubscription | undefined = newSusbcriptions.find(
      (o: IEmailSubscription) => {
        return (
          o.ListName === subscriptionList.ListName &&
          o.EmailAddress === subscriptionList.EmailAddress
        );
      }
    );

    subscriptionList.Status === SUBSCRIPTION_STATUS.SUB
      ? (subscriptionList.Status = SUBSCRIPTION_STATUS.UNSUB)
      : (subscriptionList.Status = SUBSCRIPTION_STATUS.SUB);

    subscriptionList.IsSubscribed = !subscriptionList.IsSubscribed;
    if (oldSub) {
      Object.assign(oldSub, subscriptionList);
    }

    setEmailSubscriptions(newSusbcriptions);
  }

  return !isLoading ? (
    <Container fluid className="full-width">
      <h2>Manage Your Subscriptions</h2>

      <Form>
        <Table>
          <thead>
            <tr>
              <th
              // xs={
              //   uniqueSubscriptions
              //     ? 12 - uniqueSubscriptions.length * columnWidth
              //     : 12
              // }
              >
                Email Address
              </th>

              {uniqueSubscriptions &&
                uniqueSubscriptions.map((subscription: IEmailSubscription) => {
                  return (
                    <th
                      key={`listTitle_${subscription.EmailAddress} ${subscription.ListName}`}
                      // xs={columnWidth}
                    >
                      {subscription.ListTitle}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {emailAddresses &&
              emailAddresses.map((email: IEmailAddress, index: number) => {
                const rowStyle = rowsUpdating.includes(email.Email)
                  ? { backgroundColor: "red" }
                  : undefined;
                return !emailSubscriptions.some(
                  (p) => p.EmailAddress === email.Email
                ) ? null : (
                  <tr style={rowStyle} key={email.Email}>
                    <td

                    // xs={
                    //   uniqueSubscriptions
                    //     ? 12 - uniqueSubscriptions.length * columnWidth
                    //     : 12
                    // }
                    >
                      {email.Email}
                    </td>
                    {emailSubscriptions &&
                      emailSubscriptions
                        .filter(
                          (o: IEmailSubscription) =>
                            email.Email === o.EmailAddress
                        )
                        .map((subscriptionList: IEmailSubscription) => {
                          const fieldName: string =
                            "list_" +
                            subscriptionList.ListName +
                            "email_" +
                            subscriptionList.EmailAddress;
                          return (
                            <td
                              className="text-center"
                              key={`cell_${fieldName}`}
                              // xs={columnWidth}
                            >
                              <Form.Check
                                className="facet-checkbox"
                                inline
                                name={fieldName}
                                checked={subscriptionList.IsSubscribed}
                                type="checkbox"
                                onChange={(e) => {
                                  handleSubscriptionChecked(subscriptionList);
                                }}
                              />
                              {subscriptionList.IsSubscribed}
                            </td>
                          );
                        })}
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col className="col-12 pt-3">
              <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-end">
                <Button variant="outline-primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // if (validateFormLocally()) {
                    // }
                    postForm();
                  }}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  ) : (
    <LoadingSpinner />
  );
}
