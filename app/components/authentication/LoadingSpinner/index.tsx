import * as React from "react";
import { Container, Spinner } from "react-bootstrap";

export interface ILoadingSpinnerProps {
  isFullViewport?: boolean;
  variant?: string;
  animation?: string;
}

export function LoadingSpinner({
  isFullViewport = false,
  variant = "primary",
  animation = "border",
}: ILoadingSpinnerProps) {
  return (
    <Container
      fluid
      className={`full-width d-flex flex-column justify-content-center align-items-center ${
        isFullViewport ? "spinner-container-full-height" : "spinner-container"
      }`}
    >
      <Spinner animation="border" variant="primary" />
    </Container>
  );
}
