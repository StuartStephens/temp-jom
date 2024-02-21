"use client";
import { Container } from "react-bootstrap";
import { ManageDonations } from "../../../../../components/ManageDonations";
import { useChurchInfoContext } from "../../../../../contexts/ChurchInfoContext/ChurchInfoContext";
import { ChurchSelector } from "../../general-information/components/ChurchSelector";
import { useAuth } from "../../../../../contexts/Auth/Context";
import { LoginRequired } from "../../../../../components/LoginRequired";

export interface IViewDonationsProps {}

export function ChurchInfoViewDonations(props: IViewDonationsProps) {
  const { selectedChurch } = useChurchInfoContext();
  const { checkIsLoggedIn } = useAuth();

  return !checkIsLoggedIn() ? (
    <LoginRequired />
  ) : (
    <ChurchSelector>
      <Container className="full-width mt-3">
        <ManageDonations churchId={selectedChurch?.Id} />
      </Container>
    </ChurchSelector>
  );
}
