import Image from "next/image";
import { useCart } from "../../../../contexts/Cart/Context";
import { EcommerceItem } from "./EcommerceItemCard";
import defaultStorePic from "../../../../../public/static/images/joelosteen-default-store.png";
import { Button, Row, Col } from "react-bootstrap";

interface CartItemProps {
  item: EcommerceItem;
  quantity: number;
  isInCheckout?: boolean;
}

export default function CartItem({ item, quantity, isInCheckout }: CartItemProps) {
  const { cart, removeFromCart, adjustQuantity } = useCart();

  function handleSubtractQuantity() {
    adjustQuantity(item.Id, quantity - 1);
  }

  function handleAddQuantity() {
    adjustQuantity(item.Id, quantity + 1);
  }

  function handleRemoveFromCart() {
    removeFromCart(item.Id);
  }

  if (!item || !item.Images) {
    return null; // Or some fallback UI
  }

  return (
    <Row className="border-black border-bottom align-items-center p-4 mb-4">
      <Col className="col d-none d-md-flex bg-light justify-content-center">
        <Image
          src={
            item.Images?.[0]?.Id
              ? `https://lwcrmapi-mig2.lakewoodchurch.com/api/Product/ImageSrc/${item.Images[0].Id}`
              : defaultStorePic
          }
          alt={item.Name}
          className="object-cover"
          width={100}
          height={100}
        />
      </Col>
      <Col className="col-12 col-lg-4">
        <h4 className="">{item.Name}</h4>
        <h6>by {item.AuthorOrProducer}</h6>
        <p>{item.Detail1}</p>
        <p>Quantity: {quantity}</p>
      </Col>
      <Col className="col d-flex flex-column justify-content-md-start justify-content-lg-center">
        <h6>{cart?.Currency?.Symbol}{item.Price?.toFixed(2)}</h6>
        {isInCheckout && item?.IsOnSale &&
          <>
            <p>List Price: {cart?.Currency?.Symbol}{item.MSRP?.toFixed(2)}</p>
            <p>Save: {cart?.Currency?.Symbol}{(item.MSRP - item.Price).toFixed(2)} ({(((item.MSRP - item.Price) / item.MSRP) * 100).toFixed(2)}%)</p>
          </>
        }
      </Col>
      <Col className="col d-flex flex-column ">
        <div className="d-flex flex-row justify-content-center">
          <Button
            variant="transparentlight"
            onClick={handleSubtractQuantity}
            className="p-0 m-0 text-jombutton"
          >
            <i className="bi bi-dash-circle fs-sm " />
          </Button>
          <div className="m-2 px-4 py-2 text-center">{quantity}</div>
          <Button
            variant="transparentlight"
            onClick={handleAddQuantity}
            className="p-0 m-0  text-jombutton"
          >
            <i className="bi bi-plus-circle fs-sm c-black" />
          </Button>
        </div>
        <Button
          variant="transparentlight"
          onClick={handleRemoveFromCart}
          className="text-jombutton"
        >
          Remove
        </Button>
      </Col>
    </Row>
  );
}
