import { ChangeEvent, FocusEvent, ReactNode, useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form } from "react-bootstrap";
import { IChurch } from "../../../../../components/FindChurchesContainer/SearchForChurch";
import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
import { useAccountInfoContext } from "../../../../../contexts/AccountInformationContext/AccountInformationContext";
import { useAuth } from "../../../../../contexts/Auth/Context";
import { useChurchInfoContext } from "../../../../../contexts/ChurchInfoContext/ChurchInfoContext";

export interface IChurchSelectorProps {
  // onChurchChanged: (church: IChurch) => void;
  children: ReactNode;
}

export function ChurchSelector(props: IChurchSelectorProps) {
  const [churches, setChurches] = useState<IChurch[] | undefined>();
  const [isChurchListLoading, setIsChurchListLoading] = useState(false);
  const { contactInfo, fetchAPI } = useAuth();
  const { selectedChurch, setSelectedChurch } = useChurchInfoContext();

  function updateCurrentChurch(churchId: string) {
    if (!churchId) return;
    async function fetchChurch(churchId: string) {
      setIsChurchListLoading(true);

      const url = `Church/${churchId}`;
      try {
        const response = await fetchAPI(url, undefined, "GET");
        if (response.ok) {
          const data = await response.json();
          setSelectedChurch(data);
          // props.onChurchChanged(data);
        } else {
          console.error("updateCurrentChurch failed response", response);
          //updateErrorMessage(churchesNotFound);
          throw new Error("CHURCH NOT FOUND");
        }
      } catch (e) {
        throw new Error(
          "UNEXPECTED ERROR WHILE GETTING CHURCH INFORMATION: " + e
        );
        // error({ code: "CANTFIND", message: "Could not find any position" });
      } finally {
        setIsChurchListLoading(false);
      }
    }
    fetchChurch(churchId);
  }

  function initChurchData() {
    contactInfo?.AdminChurches && setChurches(contactInfo?.AdminChurches);
  }
  useEffect(() => {
    // alert("aa");
    //initChurchData();
  }, []);

  useEffect(() => {
    initChurchData();
    if (!selectedChurch) {
      contactInfo?.AdminChurches &&
        updateCurrentChurch(contactInfo?.AdminChurches[0].Id);
    } else {
      updateCurrentChurch(selectedChurch?.Id);
    }
  }, [contactInfo?.AdminChurches]);

  function onSelectChurch(e: ChangeEvent<HTMLSelectElement>, form?: any) {
    updateCurrentChurch(e.target.value);
  }

  function onBlurChurch(e: FocusEvent<HTMLSelectElement>, form?: any) {
    updateCurrentChurch(e.target.value);
  }

  return isChurchListLoading || !churches ? (
    <LoadingSpinner />
  ) : (
    <Container fluid className="full-width">
      <Container fluid className="full-width">
        <Form.Group as={Col} className="col-12 col-md-12  mt-4">
          <FloatingLabel controlId="churchSelector" label="My Churches">
            <Form.Select
              id="myChurches"
              aria-label="My Churches"
              value={selectedChurch?.Id || (churches && churches[0].Id) || ""}
              name="myChurches"
              onChange={onSelectChurch}
              onBlur={onBlurChurch}
            >
              {churches &&
                churches.map((church: IChurch) => {
                  return (
                    <option key={church.Id} value={church.Id}>
                      {church.Name}
                    </option>
                  );
                })}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
      </Container>
      {props.children}
    </Container>
  );
}
