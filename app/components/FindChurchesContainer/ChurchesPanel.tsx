import { Button, Col, Container, Image, Offcanvas, Row } from "react-bootstrap";
import { IChurch } from "./SearchForChurch";
import { StringLiteral } from "typescript";
import Link from "next/link";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";

export interface IChurchesPanelProps {
  churches: IChurch[] | undefined;
  selectedChurch: IChurch | undefined;
  onHide: () => void;
  show: boolean;
  onChurchSelected: (church: IChurch | undefined) => void;
  searchAddress?: string;
}

const createGoogleMapsUrl = (church: IChurch) => {
  let url = "http://maps.google.com/?q=";
  url += church?.Address?.Line1 ? church?.Address?.Line1 + ", " : "";
  url += church?.Address?.Line2 ? church?.Address?.Line2 + ", " : "";
  url += church?.Address?.City ? church?.Address?.City + ", " : "";
  url += church?.Address?.State ? church?.Address?.State + ", " : "";
  url += church?.Address?.PostalCode ? church?.Address?.PostalCode + ", " : "";
  return url;
};

export function ChurchesPanel(props: IChurchesPanelProps) {
  const { selectedChurch, churches, onChurchSelected, searchAddress } = props;
  return (
    <Offcanvas
      className={`churches-panel ${selectedChurch ? "has-selection" : ""}`}
      {...props}
    >
      <Offcanvas.Header closeButton className="pt-1 pb-1">
        <Offcanvas.Title>
          <h3
            className={`fs-5 ${
              selectedChurch ? "d-none d-md-inline-block" : "d-inline-block"
            }`}
          >{`${churches?.length} Churches near ${searchAddress}`}</h3>
          <Button
            role="link"
            className={selectedChurch ? "d-inline-block d-md-none" : "d-none"}
            onClick={() => {
              onChurchSelected(undefined);
            }}
          >
            Return to list
          </Button>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0 px-0">
        <Container>
          <Row>
            <Col
              className={` ${
                selectedChurch ? "d-none d-md-block " : "d-block"
              }`}
              xs={selectedChurch ? 12 : 12}
              md={selectedChurch ? 6 : 12}
            >
              <Container className="p-0  pt-3">
                <ul className="list-group ">
                  {churches &&
                    churches.map((church: IChurch) => {
                      return (
                        <li
                          key={church.Id}
                          className={`list-group-item px-1 py-2 border-0 ${
                            church.Id == selectedChurch?.Id
                              ? "active bg-body-tertiary"
                              : ""
                          }`}
                          aria-description={`View Details for ${church.Name}`}
                        >
                          <Container className="d-flex flex-row justify-content-between align-items-center p-0">
                            <Button
                              className="p-0 w-100 text-start"
                              variant="transparent"
                              onClick={() => {
                                onChurchSelected(church);
                              }}
                            >
                              {church?.Name}
                            </Button>
                            <i className="bi bi-chevron-right" />
                          </Container>
                        </li>
                      );
                    })}
                </ul>
              </Container>
            </Col>
            {selectedChurch && (
              <Col
                xs={12}
                md={6}
                className="border-start border-1 bg-body-tertiary  pt-3"
              >
                <Container className="d-flex flex-column align-items-left gap-2">
                  <h4 className="mb-0">{selectedChurch.Name}</h4>

                  {selectedChurch?.PastorName && (
                    <span className="mb-0">{selectedChurch?.PastorName}</span>
                  )}

                  {selectedChurch?.Website && (
                    <Link
                      className="ls-sm"
                      href={selectedChurch?.Website}
                      target="_NEW"
                    >
                      <small>{selectedChurch?.Website}</small>
                    </Link>
                  )}

                  {selectedChurch?.Email && (
                    <a
                      href={`mailto:${selectedChurch?.Email}`}
                      className="strong ls-sm"
                    >
                      <small>{selectedChurch?.Email}</small>
                    </a>
                  )}

                  {selectedChurch?.Phone && (
                    <a
                      href={`tel:${selectedChurch?.Phone}`}
                      className="strong ls-sm"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontWeight: "bolder",
                      }}
                    >
                      <small>{selectedChurch?.Phone}</small>
                    </a>
                  )}

                  {selectedChurch?.Address?.Line1 && (
                    <p className="my-0 py-0 lh-sm">
                      {selectedChurch?.Address?.Line1}{" "}
                    </p>
                  )}

                  {selectedChurch?.Address?.Line2 && (
                    <p className="my-0 py-0 lh-sm">
                      {selectedChurch?.Address?.Line2}{" "}
                    </p>
                  )}
                  <p className="my-0 py-0 lh-sm">
                    {`${selectedChurch?.Address?.City}, ${selectedChurch?.Address?.State} ${selectedChurch?.Address?.PostalCode}`}
                  </p>

                  {selectedChurch?.Address && (
                    <Button
                      role="link"
                      variant="primary"
                      className="text-white mt-3 mb-1"
                      href={createGoogleMapsUrl(selectedChurch)}
                    >
                      Get Directions
                    </Button>
                  )}

                  {selectedChurch?.PastorImage?.Id && (
                    <Image
                      className="align-self-left  my-3"
                      roundedCircle
                      src={`/api/v2/Church/ImageSrc/${selectedChurch?.PastorImage?.Id}`}
                      width={140}
                      height={140}
                    />
                  )}

                  {selectedChurch?.MemberCount && (
                    <div>
                      <strong>
                        <small>
                          {`Member Count: ${selectedChurch?.MemberCount}`}
                        </small>
                      </strong>
                    </div>
                  )}

                  {selectedChurch?.Founded && (
                    <div>
                      <strong>
                        <small>{`Founded: ${
                          selectedChurch?.Founded
                            ? new Date(selectedChurch?.Founded).getFullYear()
                            : ""
                        }`}</small>
                      </strong>
                    </div>
                  )}

                  <h6>{`About ${selectedChurch?.Name}`}</h6>
                  <p>{selectedChurch?.Description}</p>
                  <div className="button-row  d-flex flex-column flex-md-row gap-2 ">
                    <Button variant="primary">Set as My Church</Button>
                    <Button variant="outline-primary">Give Feedback</Button>
                  </div>
                </Container>
              </Col>
            )}
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
