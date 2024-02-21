import { Metadata } from "next";
import {
  EDIT_CHURCH_FORM,
  EditChurchWithFormSupport,
} from "./components/EditChurchForm";

export const metadata: Metadata = {
  title: "Church Info - General Information",
};
export default function ChurchInfoGeneralInformationPage() {
  return (
    <div>
      <EditChurchWithFormSupport
        formConfiguration={{ formFields: EDIT_CHURCH_FORM }}
        defaultForm={{ ChurchName: "" }}
      />
    </div>
  );
}
