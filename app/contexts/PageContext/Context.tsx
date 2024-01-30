"use client";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Container } from "react-bootstrap";
import { IPageData } from "../../../app/PageViews/PageViewUtils";
import { useUIStateContext } from "../../contexts/UIStateContext/Context";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface PageDataContextData {
  pageData: IPageData | undefined;
  setPageData: (menuItems: IPageData) => void;
}

const PageDataContext = createContext<PageDataContextData>(
  {} as PageDataContextData
);

interface PageDataProviderProps {
  children: ReactNode;
  defaultPageData: IPageData;
}

export function PageDataProvider({
  children,
  defaultPageData,
}: PageDataProviderProps) {
  const pathname = usePathname();

  const [pageData, setPageData] = useState<IPageData>(defaultPageData);
  const [isLoading, setIsLoading] = useState(false);

  const { getActiveKey } = useUIStateContext();
  const activeKey = getActiveKey("state-" + pageData.Name);

  useEffect(() => {
    setPageData(defaultPageData);
  }, []);

  return (
    <PageDataContext.Provider
      value={{
        pageData,
        setPageData,
      }}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container fluid className="full-width">
          {children}
        </Container>
      )}
    </PageDataContext.Provider>
  );
}

export function usePageDataContext(): PageDataContextData {
  const context = useContext(PageDataContext);
  if (!context) {
    throw new Error(
      "usePageDataContext must be used within an PageDataContextProvider"
    );
  }
  return context;
}
