import Page from "../../../../pages";
import {
  IDailyDevotional,
  ITodaysWordForm,
  TodaysWordForm,
} from "../../../TodaysWordForm";
import { IBannerProps } from "../../../shared/Banner/Banner";
import { IXHTMLRendererProps } from "../../../shared/XHTMLRenderer";
import { IImage, IXHTMLString } from "../../types/core/CoreTypes";

export interface IDailyDevotionalPageBlock {
  //   DisplayOption: string;
  //   Tag: string;
  ContentType: string;
  Title: string;
  Prayer: IXHTMLString;
  Date: string;
  DevotionalDescription: IXHTMLString;
  Content: IXHTMLString;
  Name: string;
  Scripture: IXHTMLString;
  ScriptureSource: string;
}

export interface ITodaysWordFormBlock {
  DailyDevotionalPage?: IDailyDevotionalPageBlock;
  Name: string;
  ContentType: string;
  LargeImage?: IImage;
  FirstName: string;
  FirstNameRequired: boolean;
  EmailAddressField: string;
  EmailAddressRequired: boolean;
  FailureMessage: string;
  LastName: string;
  LastNameRequired: boolean;
  MobileImage?: IImage;
  TabletImage?: IImage;
  Status: string;
  StartPublish: string;
  StopPublish: string;
  SuccessMessage: string;
  Description: IXHTMLString;
  BackgroundImage?: IImage;
}

export interface ITodaysWordFormBlockProps extends ITodaysWordFormBlock {}

export function TodaysWordFormBlock(props: ITodaysWordFormBlockProps) {
  const { DailyDevotionalPage: page } = props;
  const bannerProps = {
    ariaTitle: props.Name,
    backgroundImgUrl: props?.BackgroundImage?.Url,
  } as IBannerProps;

  const dailyDevotional =
    page &&
    ({
      content: page?.Content,
      date: page?.Date,
      description: page?.DevotionalDescription,
      name: page?.Name,
      prayer: page?.Prayer,
      scripture: page?.Scripture,
      scriptureSource: page?.ScriptureSource,
      title: page?.Title,
    } as IDailyDevotional);

  const todaysWordFormProps = {
    emailAddressFieldLabel: props?.EmailAddressField,
    emailAddressFieldRequired: props?.EmailAddressRequired,
    endPublishDate: props?.StopPublish,
    firstNameFieldLabel: props?.FirstName,
    firstNameFieldRequired: props?.FirstNameRequired,
    formSubmissionFailureMessage: props?.FailureMessage,
    formSubmissionSuccessMessage: props?.SuccessMessage,
    lastNameFieldLabel: props?.LastName,
    lastNameFieldRequired: props?.LastNameRequired,
    name: props?.Name,
    startPublishDate: props?.StartPublish,
    status: props?.Status,
    description: props?.Description,
  } as ITodaysWordForm;

  return (
    <TodaysWordForm
      bannerProps={bannerProps}
      dailyDevotional={dailyDevotional}
      todaysWordFormProps={todaysWordFormProps}
    />
  );
}
