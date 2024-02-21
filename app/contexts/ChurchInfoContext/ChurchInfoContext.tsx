"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { IChurch } from "../../components/FindChurchesContainer/SearchForChurch";
import { useAuth } from "../Auth/Context";
import { IDonation } from "../Auth/DonationsTypes";
import { IPaymentMethod } from "../Auth/PaymentMethodTypes";
import { AddEditChurchServiceDialog } from "./AddEditChurchServiceDialog";
import { FORM_MODE, IChurchService } from "./ChurchInfoTypes";

export interface ChurchInfoContextData {
  selectedChurch?: IChurch;
  setSelectedChurch: (church?: IChurch) => void;
  saveChurch: (
    church: IChurch,
    successCallback: Function,
    failureCallback: Function
  ) => void;
  isAddingChurchService: boolean;
  setIsAddingChurchService: (isAddServiceMode: boolean) => void;
  editingChurchService: IChurchService | undefined;
  setEditingChurchService: (churchService: IChurchService | undefined) => void;
  churchPaymentMethods: IPaymentMethod[] | undefined;
  churchDonations: IDonation[] | undefined;
  getOwnedChurchById: (churchId: string | undefined) => IChurch | undefined;
}

const ChurchInfoContext = createContext<ChurchInfoContextData>(
  {} as ChurchInfoContextData
);

interface ChurchInfoProviderProps {
  children: ReactNode;
}

export function ChurchInfoProvider({ children }: ChurchInfoProviderProps) {
  const { fetchAPI, checkIsLoggedIn, contactInfo, refreshContactInformation } =
    useAuth();

  const [churchPaymentMethods, setChurchPaymentMethods] = useState<
    IPaymentMethod[] | undefined
  >([]);

  const [churchDonations, setChurchDonations] = useState<
    IDonation[] | undefined
  >();

  const [ownedChurches, setOwnedChurches] = useState<IChurch[] | undefined>();
  const [selectedChurch, setSelectedChurch] = useState<IChurch | undefined>();

  const [isLoading, setIsLoading] = useState(false);

  const [isAddingChurchService, setIsAddingChurchService] = useState(false);
  const [editingChurchService, setEditingChurchService] = useState<
    IChurchService | undefined
  >();

  // Call getToken when the component mounts
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [contactInfo]);

  useEffect(() => {
    updateChurchDonations();
    updateChurchPaymentMethods();
    // eslint-disable-next-line
  }, [selectedChurch]);

  async function fetchOwnedChurches() {
    if (checkIsLoggedIn()) {
      try {
        setIsLoading(true);
        const promise = await fetchAPI(`Contact/Churches`, undefined, "GET")
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              setOwnedChurches(data);
            } else {
              setOwnedChurches(undefined);
            }
          });
      } catch (e) {
        setOwnedChurches(undefined);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function saveChurch(
    church: IChurch,
    successCallback: Function,
    failureCallback: Function
  ) {
    if (checkIsLoggedIn()) {
      try {
        setIsLoading(true);
        console.log("SAVING ", church);
        const promise = await fetchAPI(`Church`, church, "POST")
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              // setOwnedChurches(data);
              setSelectedChurch(data);
              fetchOwnedChurches();
            } else {
              // setOwnedChurches(undefined);
              //failureCallback(church);
              throw new Error("Error saving church", {
                cause: "No data returned",
              });
            }
          })
          .catch((e) => {
            throw new Error("Error saving church", { cause: e });
          });
      } catch (e) {
        // setOwnedChurches(undefined);
        failureCallback(church);
        throw e;
      } finally {
        setIsLoading(false);
      }
    }
  }

  function getOwnedChurchById(
    churchId: string | undefined
  ): IChurch | undefined {
    return ownedChurches?.find((church: IChurch) => church.Id == churchId);
  }

  async function fetchChurchDonations(churchId: string) {
    if (checkIsLoggedIn()) {
      try {
        setIsLoading(true);
        const promise = await fetchAPI(
          `Church/RecurringGifts/${churchId}`,
          undefined,
          "GET"
        )
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              setChurchDonations(data);
            } else {
              setChurchDonations(undefined);
            }
          });
      } catch (e) {
        setChurchDonations(undefined);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function updateChurchDonations() {
    if (!!selectedChurch) {
      fetchChurchDonations(selectedChurch.Id);
    } else {
      setChurchDonations(undefined);
    }
  }

  async function fetchChurchPaymentMethods(churchId: string) {
    setIsLoading(true);
    const promise = await fetchAPI(
      `Contact/PaymentMethods`, //there is no api for church-specific payment methods
      undefined,
      "GET"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setChurchPaymentMethods(data);
        } else {
          setChurchPaymentMethods([]);
        }
      })
      .catch(() => {
        setChurchPaymentMethods([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateChurchPaymentMethods() {
    if (!!selectedChurch) {
      fetchChurchPaymentMethods(selectedChurch.Id);
    } else {
      setChurchPaymentMethods(undefined);
    }
  }

  function getData() {
    if (!checkIsLoggedIn() || !contactInfo || !contactInfo.IsLoggedIn) {
      return;
    } else {
      fetchOwnedChurches();
    }
  }

  return (
    <ChurchInfoContext.Provider
      value={{
        churchDonations,
        churchPaymentMethods,
        saveChurch,
        selectedChurch,
        setSelectedChurch,
        getOwnedChurchById,
        isAddingChurchService,
        setIsAddingChurchService,
        editingChurchService,
        setEditingChurchService,
      }}
    >
      {/* {`SELECTED CHURCH IN ACCTCONTEXT${JSON.stringify(ownedChurches)}`} */}
      {/* {isLoading ? <LoadingSpinner /> : children} */}
      <AddEditChurchServiceDialog
        mode={FORM_MODE.ADD}
        show={!!isAddingChurchService}
        onHide={() => {
          setIsAddingChurchService(false);
          alert("on hide add service dialog");
        }}
        title="Add Church Service"
      />
      <AddEditChurchServiceDialog
        mode={FORM_MODE.EDIT}
        show={!!editingChurchService}
        onHide={() => {
          setEditingChurchService(undefined);
          alert("on hide edit service dialog");
        }}
        title="Edit Church Service"
      />
      {children}
    </ChurchInfoContext.Provider>
  );
}

export function useChurchInfoContext(): ChurchInfoContextData {
  const context = useContext(ChurchInfoContext);

  if (!context) {
    throw new Error(
      "useChurchInfoContext must be used within an ChurchInfoContextProvider"
    );
  }

  return context;
}
