"use client";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Table } from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../contexts/Auth/Context";
import { IDonation } from "../../contexts/Auth/DonationsTypes";
import {
  ChurchInfoContextData,
  useChurchInfoContext,
} from "../../contexts/ChurchInfoContext/ChurchInfoContext";
import {
  formatDayOfMonth,
  formatPrice,
} from "../../contexts/utilities/FormatUtils";
import { RowActionButton } from "../../layouts/AccountLayout/RowActionButton";
import { LoginRequired } from "../LoginRequired";
import { getPaymentMethodDetailsHelper } from "./DonationUtils";
import {
  EDIT_DONATION_FORM,
  EditDonationWithFormSupport,
  IEditDonationForm,
} from "./EditDonationForm";

export interface IManageDonationsForm {
  donationId: string;
  paymentMethod: string;
  dayOfTheMonth: string;
  becomeMonthlyPartner: boolean;
}

export interface IRecurringDonationDisplay {
  donationId: string;
  paymentMethod: string;
  donationDate: string;
  donationAmount: string;
}
export interface IManageDonationsProps {
  churchId?: string;
}

export function ManageDonations(props: IManageDonationsProps) {
  const [recurringDonations, setRecurringDonations] = useState<IDonation[]>();

  const { churchId } = props;

  const { checkIsLoggedIn, refreshContactInformation, contactInfo, fetchAPI } =
    useAuth();
  const {
    donations,
    setPaymentMethods,
    paymentMethods,
    confirmRemoveBankAccount,
    confirmRemoveCreditCard,
    paymentInfoBeingUpdated,
    donationBeingCancelled,
    setDonationBeingCancelled,
  } = useAccountInfoContext();
  let _ChurchInfoContext: ChurchInfoContextData | undefined;

  //check if we are in the context or not as the behavior will be different depending upon whether we are int a churchinfocontext or not (e.g. the use owns church admin rights)
  try {
    _ChurchInfoContext = useChurchInfoContext();
  } catch (e) {
    //not in a church info context
  }

  const churchDonations = _ChurchInfoContext
    ? _ChurchInfoContext.churchDonations
    : undefined;
  const selectedChurch = _ChurchInfoContext
    ? _ChurchInfoContext.selectedChurch
    : undefined;
  // eslint-disable-next-line
  const [isEditDonation, setIsEditDonation] = useState<IDonation>();

  useEffect(() => {
    if (!!churchId && !!_ChurchInfoContext) {
      setRecurringDonations(churchDonations);
    } else {
      setRecurringDonations(donations);
    }
  }, [donations, churchDonations]);

  function handleCancelDonation(donation: IDonation, index: number) {
    //TODO: to cancel set the isActive to false
    // show a confirmation dialog and then delete on confirmation
    setDonationBeingCancelled({ donation: donation, church: selectedChurch });
    //alert("to cancel set the isActive to false");
  }

  function handleCancelEditDonation() {
    // resetEditDonationForm();
    setIsEditDonation(undefined);
  }
  function handleSaveEditDonation(donation: IDonation) {
    // resetEditDonationForm();
    setIsEditDonation(undefined);
    refreshContactInformation();
  }

  function handleEditMode(donation: IDonation, index: number) {
    setIsEditDonation(donation);
    //alert("Open the manage donation dialog, or edit inline?");
  }

  return !checkIsLoggedIn() ? (
    <LoginRequired />
  ) : (
    <Container>
      <Container>
        <Row>
          <Col>
            <h3>Manage Donations</h3>
            <p>
              "With your help, we will continue to tell the world about God's
              unconditional +love and unending hope found in a relationship with
              Jesus Christ. With God's help, you can Discover the Champion in
              You!" <strong>- Joel Osteen</strong>
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="col-12 pt-3">
            <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-end">
              <Button
                variant="primary"
                onClick={() => {
                  alert("open donation dialog");
                }}
              >
                New Recurring Donation
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Table>
        <thead>
          <tr className="pb-2">
            <th>Payment Method</th>
            <th>Donation Date</th>
            <th>Donation Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        {recurringDonations && recurringDonations.length ? (
          <tbody>
            {recurringDonations.map((donation: IDonation, index) => {
              const donationDetailsHelper = getPaymentMethodDetailsHelper(
                donation?.PaymentMethod
              );
              const isCreditCard = donationDetailsHelper.isCreditCard;
              const isPaypal = donationDetailsHelper.isPaypal;
              const creditCardType = donationDetailsHelper.creditCardType;
              return isEditDonation?.PaymentMethod?.Id !==
                donation?.PaymentMethod.Id ? (
                <tr className="pb-2" key={"donation" + donation.Id}>
                  <td>
                    <span>
                      {(isCreditCard || isPaypal) && creditCardType && (
                        <Image
                          className="text-small"
                          src={creditCardType?.imageUrl}
                          alt={creditCardType.name}
                          width="60"
                        />
                      )}
                      <small>{donationDetailsHelper.summary}</small>
                    </span>
                  </td>

                  <td>
                    <small>{`${formatDayOfMonth(donation.DayOfCharge)}`}</small>
                  </td>

                  <td>
                    <small>{`${formatPrice(donation?.Amount)}`}</small>
                  </td>

                  {/* TODO: is is possible to edit or remove a donation? */}
                  <td className=" ">
                    <div className=" d-flex flex-column gap-1">
                      <RowActionButton
                        onClick={() => {
                          handleEditMode(donation, index);
                        }}
                      >
                        EDIT
                      </RowActionButton>
                      <RowActionButton
                        onClick={() => {
                          handleCancelDonation(donation, index);
                        }}
                      >
                        CANCEL
                      </RowActionButton>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr className="pb-2" key={"donation" + donation.Id}>
                  <td colSpan={5}>
                    <EditDonationWithFormSupport
                      churchId={churchId}
                      formConfiguration={{ formFields: EDIT_DONATION_FORM }}
                      defaultForm={
                        {
                          PaymentMethodId: donation?.PaymentMethod?.Id || "",
                          DayOfCharge: donation?.DayOfCharge || "",
                          Amount: donation?.Amount || "",
                        } as IEditDonationForm
                      }
                      donation={donation}
                      onSave={handleSaveEditDonation}
                      onCancel={handleCancelEditDonation}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={5}>
                <h4 className="p-3">There are currently no active donations</h4>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </Container>
  );
}
