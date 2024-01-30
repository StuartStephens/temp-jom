import { Metadata } from "next";
import { Container } from "react-bootstrap";
import { PastMessagesBlock } from "../../../components/cms/block/PastMessagesBlock";
import { PastMessages } from "../../../components/ContentList/PastMessages";
import {
  IPastContentFilter,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../types";

export const metadata: Metadata = {
  title: "Watch - Messages",
};
export default function Page() {
  return (
    <Container fluid className="full-width">
      <h1>Explore Messages</h1>
      <PastMessagesBlock
        filterProps={{ page: 0, recordCount: 10 } as IPastContentFilter}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      />
    </Container>
  );
}
