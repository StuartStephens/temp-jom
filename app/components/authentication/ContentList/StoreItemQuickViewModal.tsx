import {
  Container,
  Image,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "react-bootstrap";
import { EcommerceItem, IKeyValuePair } from "./EcommerceItemCard";
import { SocialMediaLinks } from "../shared/SocialMediaLinks";
import { AddRemoveFromCart } from "./AddRemoveFromCart";
import { useCMColorModeProviderContext } from "../../../app/contexts/ColorModeContext/CMColorModeContext";

interface StoreItemQuickViewModalProps extends ModalProps {
  item: EcommerceItem | null;
  // onClose: () => void;
}

export default function StoreItemQuickViewModal(
  props: StoreItemQuickViewModalProps
) {
  const { currentColorMode } = useCMColorModeProviderContext();

  function handleItemAddedToCart(item: EcommerceItem, quantity: number) {
    alert("adding " + quantity + " of item id: " + item.Id);
  }

  const { item } = props;
  if (!item) {
    return null;
  }
  return (
    <Modal {...props} data-bs-theme={currentColorMode}>
      <ModalHeader closeButton>Product Details</ModalHeader>
      <ModalBody>
        <Container fluid className="d-flex flex-column flex-md-row">
          <Image src={item.Image.Url} alt={item.Image.Title} width={240} />
          <Container fluid className="d-flex flex-column ">
            <h3>{item.title}</h3>
            <small>{item.AuthorOrProducer}</small>
            {item.IsOnSale ? (
              <div>
                <div className="regular-price text-uppercase ff-gothic text-muted ">
                  <s className="fs-6">{`Regular Price: ${item.MSRP}`}</s>
                </div>
                <div className="sale-price ff-gothic">
                  <strong className="fs-4 text-uppercase">
                    {`Sale Price: ${item.Price}`}{" "}
                  </strong>
                </div>
              </div>
            ) : (
              <div className="regular-price text-uppercase ff-gothic text-muted ">
                <span className="fs-6">{`Price: ${item.Price}`}</span>
              </div>
            )}
            {item.Variants &&
              item.Variants.map((variant: IKeyValuePair) => {
                return <span key={variant.Key}>{variant.Value}, </span>;
              })}

            <div>
              <AddRemoveFromCart
                onAddToCart={(quantity: number) => {
                  handleItemAddedToCart(item, quantity);
                }}
              />
            </div>
          </Container>
        </Container>
        <Container fluid className="d-flex flex-column">
          <h4 className="ff-gothic text-uppercase">Description</h4>
          <small>{item.Description}</small>
        </Container>
      </ModalBody>
      <ModalFooter>
        <SocialMediaLinks
          variant="primary"
          includeEmail={true}
          includeFacebook={true}
          includePinterest={true}
          includeTwitter={true}
          data={{
            email: { Href: "", Title: "Email" },
            twitter: { Href: "", Title: "Twitter" },
            pinterest: { Href: "", Title: "Pinterest" },
            facebook: { Href: "", Title: "Facebook" },
          }}
        ></SocialMediaLinks>
      </ModalFooter>
    </Modal>
  );
}
