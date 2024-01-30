import { Col, Container, Row } from "react-bootstrap";
import { IDailyDevotional } from "../TodaysWordForm";
import FullWidthImage from "../../components/shared/FullWidthImage";
import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";

export interface IInspirationalMessageContentsProps {
  devotion?: IDailyDevotional;
}

export function InspirationalMessageContents(
  props: IInspirationalMessageContentsProps
) {
  return (
    <Container
      fluid
      className="inspirational-message-contents standard-content full-width"
    >
      <Container fluid className="page-gutter pt-3 pb-2">
        <Row>
          <Col xs={12} md={6} className="social-share order-1 order-md-2">
            <SocialMediaLinks
              data={{
                email: { Href: "#", Title: "Email" } as ILinkItemNode,
                twitter: { Href: "#", Title: "Twitter" } as ILinkItemNode,
                pinterest: { Href: "#", Title: "Pinterest" } as ILinkItemNode,
                facebook: { Href: "#", Title: "Facebook" } as ILinkItemNode,
              }}
            />
          </Col>
          <Col xs={12} md={6} className="order-2 order-md-1">
            <Container fluid className="d-flex flex-column align-items-start">
              <h2 className="title">The Wilderness</h2>
              <div className="date">SEP 28, 2023</div>
            </Container>
          </Col>
        </Row>
      </Container>
      <FullWidthImage
        className="devotional-image"
        backgroundImgUrl="https://www.joelosteen.com/globalassets/images/jom/inspiration/blogs/faith010-jpg.jpg"
      />
      <Container fluid className="page-gutter py-3">
        <Container fluid className="full-width py-1">
          <h3 className=" mb-0  ">{`Today's Scripture`}</h3>
          <p className="mb-0">Deuteronomy 32:10, MSG</p>
          <p className="fst-italic">{`He found him out in the wilderness, in an empty, windswept wasteland. He threw his arms around him, lavished attention on him, guarding him as the apple of his eye. `}</p>
        </Container>
        <Container fluid className="full-width py-1">
          <h3 className=" mb-0 ">{`Today's Word`}</h3>
          <p className="">
            {`The “wilderness” represents barrenness, no growth, a wasteland in our lives. You’re doing the right thing, but your business is not increasing, your marriage is not getting better, your health is not improving, you were passed over for another promotion. You’re in the wilderness. You feel stuck, restricted by your environment. In those dry places, you could be discouraged, thinking it will never change. No, get ready. God knows where you are. He’s watching you in the lonely nights, the times you were betrayed, those days when you felt like giving up but you kept going. You were hurting, the pain was real, but you didn’t let it stop you. He’s about to come and throw His arms around you and lavish His grace upon you. You’re going to see increase that you can’t explain, favor that you didn’t deserve, healing that doesn’t make sense, freedom from things that have held you back. Now get in agreement with God. “Lord, I receive it into my spirit. Amaze me with Your goodness. Make me the apple of Your eye.” `}
          </p>
        </Container>
        <Container fluid className="full-width py-1">
          <h3 className=" mb-0 ">{`Prayer for Today`}</h3>
          <p>{`“Father, thank You for loving me so much that at times You take me
          into a wilderness place to show me who You are. Thank You that no
          matter where I go or what I go through, You find me, wrap Your arms
          around me, and lavish Your grace upon me. I believe I am the apple of
          Your eye. In Jesus’ Name, Amen.”`}</p>
        </Container>
      </Container>
    </Container>
  );
}
