import { Image } from "react-bootstrap";
import { EcommerceItem } from "./EcommerceItemCard";

interface StoreItemQuickViewModalProps {
  item: EcommerceItem | null;
  onClose: () => void;
}

export default function StoreItemQuickViewModal({
  item,
  onClose,
}: StoreItemQuickViewModalProps) {
  if (!item) {
    return null;
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
      style={{ zIndex: 1050 }} // adjust this if you have a different z-index strategy
    >
      <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-4xl w-full">
        <button
          className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex p-4">
          {/* Product Image */}
          <div className="w-1/3 relative">
            <Image
              src={item?.Image?.Url || ""}
              alt={item?.Image?.Title || "product image"}
              // layout="responsive"
              width={235}
              height={295}
            />
          </div>

          {/* Product Details */}
          <div className="w-2/3 pl-4">
            <h2>{item.Name}</h2>
            <p>{item.AuthorOrProducer}</p>
            <p className="text-sm sm:text-lg">
              {item.IsOnSale && (
                <>
                  <span className="line-through text-gray-400">
                    ${item.MSRP}
                  </span>
                  <span> </span>
                </>
              )}
              ${item.Price}
            </p>
            {/* Quantity Selector and Add to Cart Button */}
            <p className="text-sm">{item.Description}</p>
          </div>
        </div>
        {/* Social Share Buttons */}
        <div className="flex justify-around pb-4">
          {/* TODO: Implement these */}
          <button>Facebook</button>
          <button>Twitter</button>
          <button>Pinterest</button>
          <button>Email</button>
        </div>
      </div>
    </div>
  );
}
