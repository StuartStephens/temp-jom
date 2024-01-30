"use client";
import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { IDonation } from "../../contexts/Auth/DonationsTypes";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { RowActionButton } from "../../layouts/AccountLayout/RowActionButton";

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
  //   donations?: IRecurringDonationDisplay[];
  //   onRemove: (donationId: string, indexToUpdate: number) => void;
  //   onEdit: (donationId: string, indexToUpdate: number) => void;
}

export function ManageDonations(props: IManageDonationsProps) {
  // const [recurringDonations, setRecurringDonations] = useState<
  //   IRecurringDonationDisplay[]
  // >([]);
  const { donations } = useAccountInfoContext();

  // eslint-disable-next-line
  const [isEditMode, setIsEditMode] = useState(false);

  // useEffect(() => {
  //   // setRecurringDonations([dummyData1, dummyData2]);
  // }, []);

  function handleRemove(donation: IRecurringDonationDisplay, index: number) { }

  // function handleSave(donation: IManageDonationsForm, index: number) {
  //   setIsEditMode(false);
  // }

  // function handleCancel(donation: IRecurringDonationDisplay, index: number) {
  //   setIsEditMode(false);
  // }

  function handleEditMode(donation: IRecurringDonationDisplay, index: number) {
    //setIsEditMode(true);
    alert("Open the manage donation dialog, or edit inline?");
  }

  return (
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
        {donations && donations.length ? (
          <tbody>
            {donations.map((donation: IDonation, index) => {
              return !isEditMode ? (
                <tr className="pb-2" key={"donation" + index}>
                  <td>{`${donation.paymentMethod}`}</td>

                  <td>{`${donation.donationDate}`}</td>

                  <td>{`${donation.donationAmount}`}</td>

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
                          handleRemove(donation, index);
                        }}
                      >
                        REMOVE
                      </RowActionButton>
                    </div>
                  </td>
                </tr>
              ) : null;
            })}
          </tbody>
        ) : null}
      </Table>
    </Container>
  );
}
