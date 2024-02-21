import { Container, Image } from "react-bootstrap";
import { CountPod } from "./CountPod";

export interface IWatchPageCountdownProps {}

export function WatchPageCountdown(props: IWatchPageCountdownProps) {
  return (
    <Container
      fluid
      className="watch-page-countdown bg-secondary d-flex flex-row justify-content-between text-white"
    >
      <div
        className="d-flex flex-column align-items-start p-3  w-30 "
        style={{ flexBasis: "fit-content" }}
      >
        <small className="m-1 p-0">
          Catch the next live Lakewood Service in :
        </small>
        <Container
          fluid
          className=" d-flex flex-row justify-content-between p-0"
        >
          <CountPod counter={4} unit="Days" />
          <CountPod counter={12} unit="Hours" />
          <CountPod counter={6} unit="Mins" />
          <CountPod counter={45} unit="Secs" />
        </Container>
      </div>

      <div
        className=" d-flex flex-column align-items-between p-3 w-30 "
        style={{ flexBasis: "fit-content" }}
      >
        <Container
          fluid
          className=" d-flex flex-row justify-content-end p-3 gap-3"
        >
          <div>
            <small>Listen live on Joel Osteen Radio</small>
          </div>
          <div>
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/how-to-watch/sirius.png"
              alt="siriusxm logo"
              height={21}
            />
          </div>
        </Container>
        <Container
          fluid
          className=" d-flex flex-row justify-content-end p-3 gap-3  border-top border-white"
        >
          <div>
            <small>Or catch us on:</small>
          </div>
          <div>
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/app-images/roku-icon-svg.svg"
              alt="roku logo"
              height={14}
            />
          </div>
          <div>
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/app-images/youtube-icon-svg.svg"
              alt="youtube logo"
              height={14}
            />
          </div>
          <div>
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/app-images/apple-tv-icon-svg.svg"
              alt="appletv logo"
              height={14}
            />
          </div>
          <div>
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/app-images/spotify_logo_with_text-icon-svg.svg"
              alt="spotify logo"
              height={14}
            />
          </div>
        </Container>
      </div>
    </Container>
  );
}
