import { Container, Image, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import Link from "next/link";

export interface IFooterSocialGroupProps {
  title: string;
}

export function FooterSocialGroup(props: IFooterSocialGroupProps) {
  const { title } = props;
  return (
    <div className="footersocialgroup  mt-5 mt-md-0 mt-lg-3">
      <Navbar expand="md" className="bg-body-dark" variant="dark">
        <Container className="text-center text-md-start">
          <Navbar.Brand href="#home" className="d-block d-md-none w-100">
            {title}
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="bi bi-chevron-down"></i>
          </Navbar.Toggle> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column">
              <Nav.Item className="ps-2">{props.title}</Nav.Item>
              <Container
                fluid
                className="d-flex flex-row justify-content-fit py-3 gap-3 align-items-center "
              >
                <Link href="https://www.facebook.com/JoelOsteen">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/footer/facebook-white-svg.svg"
                    width={30}
                  />
                </Link>
                <Link href="https://twitter.com/joelosteen">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/footer/twitter-white-svg.svg"
                    width={30}
                  />
                </Link>
                <Link href="https://www.instagram.com/joelosteen/">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/footer/instagram-white-svg.svg"
                    width={30}
                  />
                </Link>
              </Container>
              <Container
                fluid
                className="border-top border-white d-flex flex-row justify-content-fit py-3 gap-3 align-items-center"
              >
                <Link href="#">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/app-images/roku-icon-svg.svg"
                    height={14}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/app-images/youtube-icon-svg.svg"
                    height={14}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/app-images/apple-tv-icon-svg.svg"
                    height={14}
                  />
                </Link>
                <Link href="#">
                  <Image
                    src="https://www.joelosteen.com/globalassets/images/jom/app-images/spotify_logo_with_text-icon-svg.svg"
                    height={14}
                  />
                </Link>
              </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
