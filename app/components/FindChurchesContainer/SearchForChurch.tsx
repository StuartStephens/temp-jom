"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";

import { useRouter } from "next/navigation";
import Script from "next/script";
import GoogleMap from "../../../public/GoogleMap";
import { IContactAddress } from "../../contexts/Auth/AccountTypes";
import { useAuth } from "../../contexts/Auth/Context";
import { LoadingSpinner } from "../LoadingSpinner";
import { ChurchesPanel } from "./ChurchesPanel";

type Coordinates = {
  formattedAddress?: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
};
export interface IChurchImage {
  Id: string;
  Type: number;
}

export interface IChurch {
  Id: string;
  Address?: IContactAddress;
  Name?: string;
  AccountId?: string;
  Image?: IChurchImage;
  SubdomainUrl?: string;
  YoutubeLink?: string;
  MemberCount?: number;
  Founded?: any;
  Description?: string;
  Email?: string;
  Invitation?: string;
  PastorImage?: IChurchImage;
  PastorName?: string;
  Phone?: string;
  Website?: string;
  ServiceTimes?: [];
  ChurchDistance?: 8.09566908389197;
  WorshipStyle?: any;
}

export interface IGoogleMap {
  getNewMap: Function;
  // map: any;
  centerMap: Function;
  addMarker: Function;
}
export interface ISearchForChurchProps {}

export function SearchForChurch(props: ISearchForChurchProps) {
  const { fetchAPI } = useAuth();
  const router = useRouter();
  const mapRef = useRef(null);
  const [searchByLocation, setSearchByLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [churches, setChurches] = useState<IChurch[] | undefined>();
  const [selectedChurch, setSelectedChurch] = useState<IChurch | undefined>();
  const [isShowChurchesPanel, setIsShowChurchesPanel] =
    useState<boolean>(false);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [googlemap, setGooglemap] = useState<IGoogleMap>();

  const locationNotFound =
    "No location could be found.  Please ensuenable location to use this feature";
  const addressNotFound =
    "Address was not found.  Please check the address or try providing a more complete address. ";
  const noChurchesAreFound = "No churches could be found near this location. ";

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.currentTarget.name) {
      case "searchByLocation":
        setSearchByLocation(e.currentTarget.value);
        break;
      default:
        //Do nothing
        break;
    }
  }

  function updateErrorMessage(message?: string) {
    setErrorMessage(message || "");
    router.push("#searchByLocation");
  }

  function getLocationByAddress(success: Function, error: Function) {
    // const url = encodeURIComponent(
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=5507 Fulton Ridge Drive, Indtian Trail, NC 28079&key=AIzaSyDKze0t2oEg_oE34BoRp6qZm5HI40n7Sl0"
    // );
    async function fetchLocation() {
      const APIKey = "AIzaSyDKze0t2oEg_oE34BoRp6qZm5HI40n7Sl0";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchByLocation
      )}&key=${APIKey}`;
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const firstResult = data?.results && data?.results[0];
          if (firstResult && firstResult.geometry.location) {
            const position = {
              coords: {
                latitude: firstResult.geometry.location.lat,
                longitude: firstResult.geometry.location.lng,
              },
            };
            success(position);
          } else {
            updateErrorMessage(addressNotFound);
            // throw new Error("NO LOCATION FOUND");
          }
        } else {
          updateErrorMessage(addressNotFound);
          // throw new Error("NO LOCATION FOUND");
        }
      } catch (e) {
        updateErrorMessage(addressNotFound);
        // error({ code: "CANTFIND", message: "Could not find any position" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchLocation();
  }
  function getAddressByCurrentLocation(
    data: any,
    success: Function,
    error: Function
  ) {
    // const url = encodeURIComponent(
    //   "https://maps.googleapis.com/maps/api/geocode/json?address=5507 Fulton Ridge Drive, Indtian Trail, NC 28079&key=AIzaSyDKze0t2oEg_oE34BoRp6qZm5HI40n7Sl0"
    // );
    // return;
    const lat = data?.coords?.latitude;
    const long = data?.coords?.longitude;
    async function fetchAddress() {
      setIsLoading(true);
      const APIKey = "AIzaSyDKze0t2oEg_oE34BoRp6qZm5HI40n7Sl0";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${APIKey}&latlng=${encodeURIComponent(
        lat + ", " + long
      )}`;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const firstResult = data?.results && data?.results[0];
          if (firstResult) {
            success(firstResult.formatted_address);
          } else {
            updateErrorMessage(addressNotFound);
            // throw new Error("NO LOCATION FOUND");
          }
        } else {
          updateErrorMessage(addressNotFound);
          // throw new Error("NO LOCATION FOUND");
        }
      } catch (e) {
        updateErrorMessage(addressNotFound);
        // error({ code: "CANTFIND", message: "Could not find any position" });
      } finally {
        setIsLoading(false);
      }
    }
    fetchAddress();
  }

  function generateMap() {
    if (mapRef?.current) {
      const newMap: any = new GoogleMap(mapRef.current);
      setGooglemap(newMap);
    }
  }

  function resetMap() {
    setFormattedAddress("");
    setSearchByLocation("");
    setChurches(undefined);
    setCoordinates(undefined);
    generateMap();
  }

  function updateMapData() {
    // https://www.joelosteen.com/api/location/findChurch?latitude=35.0342695&longitude=-80.6603064&radius=150
    async function fetchMapData() {
      const searchParams = new URLSearchParams();
      if (coordinates) {
        Object.entries(coordinates).forEach(([key, value]) => {
          searchParams.append(key, value.toString());
        });
      }

      const url = `/api/Church/Find`;
      try {
        setIsLoading(true);
        const params = {
          Longitude: coordinates?.longitude,
          Latitude: coordinates?.latitude,
          Distance: 150,
        };
        // const response = await fetchAPI(url, params, "POST");
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setChurches(data);
          googlemap &&
            data.map((church: IChurch) => {
              const lat = church?.Address?.Latitude;
              const long = church?.Address?.Longitude;
              const title = church.Name;
              lat && long && googlemap.addMarker(lat, long, church);
            });
          setIsLoading(false);
        } else {
          updateErrorMessage(noChurchesAreFound);
        }
      } catch (e) {
        updateErrorMessage(noChurchesAreFound);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMapData();
  }

  function fetchGeolocationData(type: string) {
    setCoordinates(undefined);
    setChurches(undefined);
    setSelectedChurch(undefined);
    function success(pos: any) {
      const crd = pos.coords;
      const newCoors = {
        latitude: crd.latitude,
        longitude: crd.longitude,
      } as Coordinates;
      setCoordinates(newCoors);
    }

    //async
    if ("location" !== type) {
      getLocationByAddress(success, () => {
        updateErrorMessage(locationNotFound);
      });
    } else {
      function successFindLocation(data: any) {
        const firstResult = data && data.coords;
        if (firstResult) {
          const position = {
            coords: {
              latitude: firstResult.latitude,
              longitude: firstResult.longitude,
            },
          };

          getAddressByCurrentLocation(
            position,
            (data: any) => {
              data && setFormattedAddress(data);
            },
            (e: any) => {
              updateErrorMessage(addressNotFound);
            }
          );
          setCoordinates(position.coords);
        } else {
          updateErrorMessage(addressNotFound);
          // throw new Error("NO LOCATION FOUND");
        }
      }
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const location = navigator.geolocation.getCurrentPosition(
        successFindLocation,
        (e) => {
          updateErrorMessage(locationNotFound);
        },
        options
      );
    }
  }

  function searchByCurrentLocation() {
    updateErrorMessage(undefined);
    setFormattedAddress("");
    setSearchByLocation("");
    setCoordinates(undefined);
    const geoData = fetchGeolocationData("location"); //wait for response
  }

  function searchByAddress() {
    updateErrorMessage(undefined);

    if (searchByLocation && searchByLocation !== "") {
      setCoordinates(undefined);
      const geoData = fetchGeolocationData("address"); //wait for response
    } else {
      setErrorMessage("Please enter a valid address before searching");
    }
  }

  function onFormSubmit(e: FormEvent) {
    e.stopPropagation();
    e.preventDefault();
    searchByAddress();
  }

  useEffect(() => {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      updateMapData();
      googlemap &&
        googlemap.centerMap(coordinates.latitude, coordinates.longitude);
      setIsMapReady(true);
    } else setIsMapReady(false);
  }, [coordinates]);

  useEffect(() => {
    //generateMap();
  }, []);
  useEffect(() => {
    const doClick = (ICONCLICKEDEVENT: CustomEvent) => {
      setIsShowChurchesPanel(true);
      setSelectedChurch(ICONCLICKEDEVENT.detail);
    };
    mapRef &&
      mapRef.current &&
      (mapRef.current as Node).removeEventListener(
        "ICONCLICKED",
        doClick as EventListener,
        false
      );
    mapRef &&
      mapRef.current &&
      (mapRef.current as Node).addEventListener(
        "ICONCLICKED",
        doClick as EventListener,
        false
      );
  }, [mapRef]);

  return (
    <Container fluid className="search-for-church full-width bg-subtle">
      <Script
        src="http://localhost:3000/google-api.js"
        strategy="lazyOnload"
        onLoad={() => {
          generateMap();
        }}
      />

      <Container
        id="searchByAddressButton"
        fluid
        className="search-for-church-form full-width pt-3 pb-3 bg-light page-gutter page-gutter-small"
      >
        <Row className="pb-2 pt-0">
          <Col xs={12} lg={12} className="px-5 text-center text-lg-start">
            <h3>Your Location</h3>
          </Col>
          <Col xs={12} lg={12}>
            <Form
              // as={Row}

              onSubmit={onFormSubmit}
            >
              <Row className="full-width px-5  ">
                {(!formattedAddress || formattedAddress == "") && (
                  <Col
                    xs={12}
                    lg={3}
                    className="button-row mt-2 pb-3 text-center "
                  >
                    <Button
                      variant="primary"
                      href="#MAP"
                      className="w-100"
                      onClick={searchByCurrentLocation}
                      type="button"
                    >
                      Use My Location
                    </Button>
                  </Col>
                )}
                {formattedAddress && formattedAddress != "" && (
                  <Col className="align-items-center d-inline-flex justify-content-end justify-content-lg-end gap-2  text-primary fs-5">
                    <strong className="small">{formattedAddress}</strong>
                    <i className="bi bi-cursor-fill  " />
                  </Col>
                )}

                {formattedAddress && (
                  <Col xs={12} md={4}>
                    <Button
                      onClick={() => {
                        resetMap();
                      }}
                    >
                      Reset
                    </Button>
                  </Col>
                )}
                {!formattedAddress && (
                  <Form.Group as={Col} xs={12} md={8} lg={7} className="pb-3  ">
                    <InputGroup className="mb-3">
                      <FloatingLabel
                        // controlId="searchByLocation"
                        label="Search by Location"
                      >
                        <Form.Control
                          id="searchByLocation"
                          type="text"
                          size="sm"
                          placeholder="Search by Location"
                          name="searchByLocation"
                          onChange={handleInputChange}
                          value={searchByLocation || ""}
                          isInvalid={!!errorMessage && errorMessage !== ""}
                        />
                      </FloatingLabel>
                      {searchByLocation && (
                        <Button
                          variant="outline-secondary"
                          className="text-black border-1"
                          id="button-reset-map"
                          title="Clear"
                          aria-label="Clear"
                          onClick={() => {
                            resetMap();
                          }}
                        >
                          X
                        </Button>
                      )}
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      {errorMessage}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                {!formattedAddress && (
                  <Col
                    xs={12}
                    md={4}
                    lg={2}
                    className="button-row mt-2 pb-3 text-right "
                  >
                    <Button
                      variant="primary"
                      // href={`${
                      //   searchByLocation && searchByLocation !== ""
                      //     ? "#MAP"
                      //     : "#searchByAddressButton"
                      // }`}
                      href="#MAP"
                      className="w-100"
                      onClick={searchByAddress}
                      type="button"
                    >
                      Search
                    </Button>
                  </Col>
                )}
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container
        id="MAP"
        fluid
        className="search-for-church-map full-width d-flex justify-content-center align-items-center flex-grow"
      >
        <div style={{ position: "relative" }} className="w-100 h-100">
          <span
            className={`flyout sticky-top ${churches ? "d-grid " : "d-none"}`}
          >
            <Button
              onClick={() => setIsShowChurchesPanel(!isShowChurchesPanel)}
              aria-controls="example-collapse-text"
              aria-expanded={isShowChurchesPanel}
            >
              SHOW LIST OF CHURCHES
            </Button>
          </span>

          <div
            style={{ height: "750px", width: "100%", margin: "auto" }}
            id="churchmap"
            ref={mapRef}
          ></div>

          {isShowChurchesPanel && (
            <>
              <ChurchesPanel
                churches={churches}
                selectedChurch={selectedChurch}
                show={isShowChurchesPanel}
                onHide={() => {
                  setIsShowChurchesPanel(false);
                }}
                onChurchSelected={(ch: IChurch | undefined) => {
                  setSelectedChurch(ch);
                }}
                searchAddress={formattedAddress}
              />
            </>
          )}

          <div
            style={{
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              background: "rgba(0, 56, 82, 0.8)",
              position: "absolute",
              margin: "auto",
              display: `${
                isLoading || !isMapReady || !!errorMessage ? "block" : "none"
              }`,
            }}
          >
            {isLoading && <LoadingSpinner />}
          </div>
          <div
            style={{
              zIndex: 100,
              //  height: "750px",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              position: "absolute",
              margin: "auto",
              color: "white",
              display: `${!isMapReady || !!errorMessage ? "block" : "none"}`,
            }}
          >
            <Container className="d-flex flex-column justify-content-center align-items-center bg-transparent h-100 w-100 ">
              {isLoading && <LoadingSpinner />}
              {!isLoading && (
                <>
                  <h2>
                    <i className="bi bi-geo-alt pe-4"></i>FIND A CHURCH NEAR YOU
                  </h2>
                  <strong className="text-danger">{errorMessage}</strong>
                </>
              )}
            </Container>
          </div>
        </div>
      </Container>
    </Container>
  );
}
