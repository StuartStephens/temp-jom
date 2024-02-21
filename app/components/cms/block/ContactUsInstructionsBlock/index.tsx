import { ContactUsInstruction } from "../../../../(main-pages)/contact-us/components/ContactUsInstruction";
import { ILinkItemNode, IXHTMLString } from "../../types/core/CoreTypes";

export interface IContactUsInstructionsBlockProps {
  Instructions: IXHTMLString;
  Links: ILinkItemNode[];
}

export function ContactUsInstructionsBlock(
  props: IContactUsInstructionsBlockProps
) {
  return (
    <ContactUsInstruction
      instructions={props.Instructions}
      links={props.Links}
    />
  );
}
