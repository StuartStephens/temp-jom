import { useState } from "react";
import { Button, Container } from "react-bootstrap";

export interface IAddRemoveFromCartProps {
  onAddToCart: (quantity: number) => void;
}

export function AddRemoveFromCart(props: IAddRemoveFromCartProps) {
  const [quantity, setQuantity] = useState(1);
  function handleIncreaseClicked() {
    setQuantity(quantity + 1);
  }

  function handleDecreaseClicked() {
    quantity > 0 && setQuantity(quantity - 1);
  }
  return (
    <Container fluid className="d-flex flex-column">
      <div>
        <span className="ff-gothic text-uppercase">QTY:</span>
        <Button
          variant="transparent"
          className="text-primary fs-3"
          onClick={handleDecreaseClicked}
        >
          <i className="bi bi-dash-circle" />
        </Button>
        <span className="ff-gothic text-uppercase">{quantity}</span>
        <Button
          variant="transparent"
          className="text-primary fs-3"
          onClick={handleIncreaseClicked}
        >
          <i className="bi bi-plus-circle" />
        </Button>
      </div>
      <div className="button-row">
        <Button
          disabled={quantity < 1}
          variant="primary"
          onClick={() => {
            props.onAddToCart(quantity);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </Container>
  );
}
