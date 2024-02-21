import { Container } from "react-bootstrap";

export interface IContactInfoProps {}

export function ContactInfo(props: IContactInfoProps) {
  return (
    <Container fluid className="contact-info page-gutter d-flex flex-row">
      <Container fluid className=" d-flex flex-column">
        <h2>United States</h2>
        <div>
          <h3>Main Contact</h3>
          <p>888-567-JOEL(5635)</p>
        </div>
        <div>
          <h3>Customer Service</h3>
          <p>1-800-278-0520</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>Joel Osteen Ministries</p>
          <p>P.O. Box 4600</p>
          <p>Houston, TX 77210</p>
        </div>
        <div>
          <h3>Legacy Giving</h3>
          <p>713-491-1200</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>Planned Giving Department</p>
          <p>P.O. Box 22540</p>
          <p>Houston, TX 77227</p>
        </div>
      </Container>
      <Container fluid className=" d-flex flex-column">
        <h2>Australia</h2>
        <div>
          <h3>Main Contact</h3>
          <p>1-800-829-180</p>
        </div>
        <div>
          <h3>Customer Service</h3>
          <p>1-800-762-576</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>Joel Osteen Ministries</p>
          <p>PO Box 886</p>
          <p>Buddina, QLD 4575</p>
        </div>
      </Container>
      <Container fluid className=" d-flex flex-column">
        <h2>Canada</h2>
        <div>
          <h3>Main Contact</h3>
          <p>1-800-811-1075</p>
        </div>
        <div>
          <h3>Customer Service</h3>
          <p>1-800-778-5089</p>
        </div>
        <div>
          <h3>Address</h3>
          <p>Joel Osteen Ministries Canada</p>
          <p>PO Box 111</p>
          <p>Winnipeg, Manitoba R3C 2G1</p>
        </div>
      </Container>
    </Container>
  );
}
