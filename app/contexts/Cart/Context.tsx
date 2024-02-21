import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { EcommerceItem } from "../../components/navbar/DynamicParts/Cart/EcommerceItemCard";
import { useAuth } from "../Auth/Context";

interface CartContentContextData {
  cart: Cart;
  addToCart: (item: EcommerceItem) => void;
  removeFromCart: (Id: string) => void;
  adjustQuantity: (Id: string, quantity: number) => void;
  isCartVisible: boolean;
  openCart: () => void;
  closeCart: () => void;
  isLoading: boolean;
  fetchCart: () => void;
  countries: Country[];
  states: State[];
  fetchCountries: () => void;
  fetchStates: (Country: Country) => void;
}

export type Country = {
  Name: string;
  Iso2Code: string;
  Iso3Code: string;
  IsSelected: boolean;
  Id: string;
};

export type State = {
  Name: string;
  Iso2Code: string;
  Iso3Code: string;
  Country: string | null;
  IsSelected: boolean;
};

const CartContentContext = createContext<CartContentContextData>(
  {} as CartContentContextData
);

interface CartProviderProps {
  children: ReactNode;
}

type ShippingInfoListDetails = {
  Method: {
    Name: string;
    FOB: string;
    EstimatedDelivery: string;
    Id: string;
    Classification: string;
  };
  Amount: number;
  Warehouse: {
    Id: string;
    Name: string;
    Country: {
      Name: string;
      Iso2Code: string;
      Iso3Code: string;
      IsSelected: boolean;
      CurrencyId: string;
      Id: string;
    };
    Priorities: {
      Priority: number;
      CurrencyISO3: string;
    }[];
  };
  IsDefault: boolean;
  PackDate: null | string;
  ShipDate: null | string;
  TrackingNumber: null | string;
}

interface Currency {
  Id: string;
  Name: string;
  Symbol: string;
  Iso3Code: string;
  IsSelected: boolean;
}

interface Method {
  Id: string;
  Alias: string;
  NameOnAccount: string;
  IsSelected: boolean;
  CardType: string;
  CardExpMMYY: string;
  CardToken: string;
  MaskedCardNumber: string;
  BankAccountNumber: string;
  Type: number;
  BankRoutingNumber: string;
  BankAccountId: string;
  Code: string;
  Company: string;
  CustomerId: string;
  HasRequiredDetails: boolean;
}

interface Payment {
  Id: string;
  Method: Method;
  AuthorizationToken: string;
  ConfirmationToken: string;
  Amount: number;
  Currency: Currency;
  DigitalWalletName: string;
  HasRequiredDetailsForRecurringDonationOnly: boolean;
  HasRequiredDetails: boolean;
}

interface StateDetail {
  Name: string;
  Iso2Code: string;
  Country: Country;
  IsSelected: boolean;
}

interface BillToAddress {
  Id?: string;
  FirstName: string;
  LastName: string;
  IsPrimary?: boolean;
  IsDefaultBilling?: boolean;
  IsDefaultShipping?: boolean;
  IsSelected?: boolean;
  City: string;
  StateDetail: StateDetail;
  DoNotMail?: boolean;
  State: string;
  CountryDetail: Country;
  Country: string;
  Latitude?: number;
  Longitude?: number;
  Line1: string;
  Line2: string;
  Person?: string;
  Name: string;
  PostalCode: string;
  HasBasicData?: boolean;
}

export type Cart = {
  ItemList?: ItemListDetails[];
  BillToAddress?: BillToAddress;
  Payment?: Payment;
  ShippingInfoList?: ShippingInfoListDetails[];
  BillToEmail?: string;
  ShipToAddress?: ShipToAddress;
  Subtotal?: number;
  Tax?: number;
  Total?: number;
  Discount?: number;
  Shipping?: number;
  ProductTotal?: number;
  ShippingMethod?: ShippingMethod;
  Currency?: Currency;
}

interface Currency {
  Id: string;
  Name: string;
  Symbol: string;
  Iso3Code: string;
  IsSelected: boolean;
}

interface ShippingMethod {
  Name: string;
  FOB: string;
  EstimatedDelivery: string;
  Id: string;
  Classification: string;
}

type ItemListDetails = {
  Product: EcommerceItem;
  Quantity: number;
}

export type ShipToAddress = BillToAddress;

export function CartProvider({ children }: CartProviderProps) {
  console.log('CartProvider rendered');
  const [cart, setCart] = useState<Cart | {}>({});
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const { fetchAPI } = useAuth();

  const fetchCountries = async () => {
    try {
      const response = await fetchAPI("Metadata/Countries", {});
      const data = await response.json();

      setCountries(data);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    }
  };

  const fetchStates = async (country: Country) => {
    if (!country) {
      setStates([]);
      return;
    }
    try {
      const endpoint = `Metadata/States/${country.Iso2Code}`;
      const response = await fetchAPI(endpoint, {});
      const data: State[] = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Failed to fetch states", error);
    }
  };

  async function addToCart(item: EcommerceItem) {
    console.log("adding item to cart", item);

    const endpoint = "Cart/Product";
    const data = {
      ProductRef: item.SKU,
      Quantity: 1,
      Amount: 1,
    };

    try {
      setIsLoading(true);
      const response = await fetchAPI(endpoint, data, "POST");

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // Log or update state with the result

      fetchCart();
    } catch (error) {
      setIsLoading(false);
      console.error("There was a problem with your fetch operation: ", error);
    }
  }

  function removeFromCart(Id: string) {
    console.log("removing item from cart", Id);
  }

  function adjustQuantity(Id: string, quantity: number) {
    console.log("adjusting quantity of item", Id, quantity);
  }

  function openCart() {
    console.debug("opening cart");
    setIsCartVisible(true);
  }

  function closeCart() {
    console.debug("closing cart");
    setIsCartVisible(false);
  }

  useEffect(() => {
    console.log("cart updated", cart);
  }, [cart]);

  async function fetchCart() {
    try {
      setIsLoading(true);

      const response = await fetchAPI("Cart", null, "GET")

      const cart = await response.json();
      setCart(cart);
      setIsLoading(false);
    } catch (e) {
      console.log("There was a problem with your fetch operation: ", e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const DEBUG = process.env.NODE_ENV !== "production";
    if (DEBUG) {
      console.debug("rendering CartProvider Component (Fetching Cart)");
    }
    fetchCart();
  }, []);

  return (
    <CartContentContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        adjustQuantity,
        isCartVisible,
        openCart,
        closeCart,
        isLoading,
        fetchCart,
        countries,
        states,
        fetchCountries,
        fetchStates,
      }}
    >
      {children}
    </CartContentContext.Provider>
  );
}
export interface CartResponseItemListObject {
  Product: EcommerceItem;
}
export function useCart(): CartContentContextData {
  const context = useContext(CartContentContext);

  if (!context) {
    throw new Error(
      "useCart must be used within an CartContentContext.Provider"
    );
  }

  return context;
}
