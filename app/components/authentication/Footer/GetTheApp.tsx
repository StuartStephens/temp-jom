import Link from "next/link";
import { Container, Image } from "react-bootstrap";

export interface IGetTheAppProps {}

export function GetTheApp(props: IGetTheAppProps) {
  return (
    <Container
      fluid
      className="d-flex flex-column flex-md-row justify-content-center justify-content-md-start align-items-center align-items-md-start mt-3 mt-md-0"
    >
      <Image
        src="https://www.joelosteen.com/globalassets/images/jom/app-images/group-24-png.png"
        alt="Joel Osteen App"
        height={180}
      />
      <Container
        fluid
        className="d-flex flex-column justify-content-center justify-content-md-between  align-items-center align-items-md-start h-100"
      >
        <div>
          <div className="text-center text-md-start fs-5 my-3 my-md-0">
            Get the Joel Osteen App Today!
          </div>
        </div>
        <Container className="d-flex flex-row full-width flex-wrap-nowrap justify-content-center justify-content-md-between  align-items-center align-items-md-start gap-2">
          <Link href="https://apps.apple.com/us/app/joel-osteen-for-iphone/id652174679?_ga=2.153567549.408647008.1704769489-544843836.1704081946">
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/footer/applestore-png.png"
              width={90}
            />
          </Link>
          <Link href="https://play.google.com/store/apps/details?id=com.joelosteen.jom.sla&_ga=2.196585769.408647008.1704769489-544843836.1704081946">
            <Image
              src="https://www.joelosteen.com/globalassets/images/jom/footer/googleplay_png.png"
              width={90}
            />
          </Link>
        </Container>
      </Container>
    </Container>
  );
}
