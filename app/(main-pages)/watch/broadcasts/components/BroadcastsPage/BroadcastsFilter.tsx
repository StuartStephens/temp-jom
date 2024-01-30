"use client";
import { Button, Col, Container, FloatingLabel, Form } from "react-bootstrap";

export interface IBroadcastsFilterProps {}

export function BroadcastsFilter(props: IBroadcastsFilterProps) {
  return (
    <Form>
      <Container
        fluid
        className="full-width d-flex flex-row align-items-center gap-2 py-3"
      >
        <Col xs={12} md={3} lg={3}>
          <Button
            variant="primary"
            href="#MAP"
            className="w-100"
            // onClick={searchByCurrentLocation}
            type="button"
          >
            Use My Location
          </Button>
        </Col>
        <Form.Group as={Col} xs={12} md={3} lg={3} className=" ">
          <FloatingLabel controlId="accountType" label="Account Type">
            <Form.Select
              id="accountType"
              aria-label="Account Type"
              //   value={form?.accountType || ""}
              name="accountType"
              //   onChange={handleSelectChange}
              //   onBlur={handleSelectBlur}
            >
              <option value="25">25 Miles</option>
              <option value="50">50 Miles</option>
              <option value="100">100 Miles</option>
              <option value="250">250 Miles</option>
              <option value="500">500 Miles</option>
            </Form.Select>
            {/* <Form.Control.Feedback type="invalid">
              {errors?.accountType?.message}
            </Form.Control.Feedback> */}
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} xs={12} md={6} lg={6} className=" ">
          <FloatingLabel label="Search by Location">
            <Form.Control
              id="searchByLocation"
              type="text"
              size="sm"
              placeholder="Search by Location"
              name="searchByLocation"
              // onChange={handleInputChange}
              //   value={searchByLocation || ""}
              //   isInvalid={!!errorMessage && errorMessage !== ""}
            />
            {/* <Form.Control.Feedback type="invalid">
              {errorMessage}
            </Form.Control.Feedback> */}
          </FloatingLabel>
        </Form.Group>
      </Container>
    </Form>
  );
}
