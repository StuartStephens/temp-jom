"use client";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AvatarDisplay } from "./AvatarDisplay";
import { useAuth } from "../../contexts/Auth/Context";
import Banner from "../../../app/components/shared/Banner/Banner";

export interface IAccountBannerProps {}

export function AccountBanner(props: IAccountBannerProps) {
  const { logout, contactInfo } = useAuth();
  return (
    <Banner
      className="account-banner"
      backgroundImgUrl="https://int.joelosteen.com/contentassets/21f264054ee240a7a007df0f23d95b69/largedisplay.png"
    >
      <Container fluid className="px-5 d-flex justify-content-end ">
        <Button
          variant="none"
          onClick={() => {
            logout();
          }}
        >
          {`Not ${contactInfo?.FirstName}? `}
        </Button>
        <Button
          variant="link"
          onClick={() => {
            logout();
          }}
        >
          LOGOUT
        </Button>
      </Container>
      <AvatarDisplay />
    </Banner>
  );
}
