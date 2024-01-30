"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export interface IBroadcast {
  city: string;
  state: string;
  stationHandle: string;
  dayOfWeek: string;
  time: string;
}
export interface IBroadcastListProps {}

export function BroadcastList(props: IBroadcastListProps) {
  const [broadcasts, setBroadcasts] = useState<IBroadcast[]>([]);
  const [byCity, setByCity] = useState<any>();

  useEffect(() => {
    const b1 = {
      city: "Birmingham",
      state: "Alabama",
      stationHandle: "WBRC FOX 6",
      dayOfWeek: "Monday",
      time: "10 AM",
    };
    const b2 = {
      city: "Phoenix",
      state: "Arizona",
      stationHandle: "KTVK TV-3.1",
      dayOfWeek: "Sunday",
      time: "10 AM",
    };
    const b3 = {
      city: "Little Rock",
      state: "Arkansas",
      stationHandle: "KVTN 24",
      dayOfWeek: "Sunday",
      time: "8 AM",
    };
    const b4 = {
      city: "Little Rock",
      state: "Arkansas",
      stationHandle: "KARK NBC 4",
      dayOfWeek: "Sunday",
      time: "10 AM",
    };
    const bcs = [b1, b2, b3, b4];
    setBroadcasts(bcs);
    const groupedByCity = bcs.reduce((accum: any, o: IBroadcast) => {
      if (!accum[o.city]) {
        accum[o.city] = [];
      }

      accum[o.city].push(o);
      return accum;
    }, Object.create(null));
    setByCity(groupedByCity);
  }, []);

  return (
    <Container fluid className="full-width">
      {byCity &&
        Object.entries(byCity).map(([key, value]: [string, any]) => {
          console.log("value", value);
          return (
            <Row
              key={key}
              className="py-5 px-4 border-top border-1 bg-body-tertiary"
            >
              <Col xs={5} md={5}>
                <h2 className="fs-5">
                  {key}, {value[0].state}
                </h2>
              </Col>
              <Col xs={3} md={3}>
                <Container fluid className="d-flex flex-column">
                  {value &&
                    value.map((b: IBroadcast) => {
                      return (
                        <span key={key + b.stationHandle} className="fw-bold">
                          {b.stationHandle}
                        </span>
                      );
                    })}
                </Container>
              </Col>
              <Col xs={2} md={2}>
                <Container fluid className="d-flex flex-column">
                  {value &&
                    value.map((b: IBroadcast) => {
                      return (
                        <span key={key + b.dayOfWeek} className="fw-bold">
                          {b.dayOfWeek}
                        </span>
                      );
                    })}
                </Container>
              </Col>
              <Col xs={2} md={2}>
                <Container fluid className="d-flex flex-column">
                  {value &&
                    value.map((b: IBroadcast) => {
                      return (
                        <span key={key + b.time} className="fw-bold">
                          {b.time}
                        </span>
                      );
                    })}
                </Container>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
}
