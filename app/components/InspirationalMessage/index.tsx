import { Container } from "react-bootstrap";
import {
  IDailyDevotional,
  ITodaysWordFormProps,
  TodaysWordForm,
} from "../TodaysWordForm";
import { InspirationalMessageContents } from "./InspirationalMessageContents";

export interface IInspirationalMessageProps extends ITodaysWordFormProps {}

//THIS CORRESPONDS TO INSPIRATIONALMESSAGE in the CMS, but we now haqve Todays Word Form as well.  we need to match this up with the CMS an break it up accordingly
export function InspirationalMessage(props: IInspirationalMessageProps) {
  const { dailyDevotional, bannerProps, todaysWordFormProps } = props;
  return (
    <Container fluid className="inspirational-message full-width  ">
      <TodaysWordForm
        bannerProps={bannerProps}
        todaysWordFormProps={todaysWordFormProps}
        dailyDevotional={undefined}
      />
      {dailyDevotional && (
        <InspirationalMessageContents devotion={dailyDevotional} />
      )}
    </Container>
  );
}
