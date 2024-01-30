import {
  ILinkItemNode,
  IXHTMLString,
} from "../../app/components/cms/types/core/CoreTypes";

export interface ISpeaker {
  firstName: string;
  lastName: string;
  imageUrl?: string;
}
export interface IBlog {
  id: string;
  author: ISpeaker;
  title: string;
  publishDate: string;
  overview: IXHTMLString;
  content: IXHTMLString;
  isFeatured: boolean;
}

export type PrayerProperties = {
  likeCount: number;
  likedByCurrentUser: boolean;
  repliedToByCurrentUser: boolean;
};

export enum CONTENT_TYPES {
  MESSAGE = "MESSAGE",
  BLOG = "BLOG",
  ARTICLE = "ARTICLE",
  WALLPAPER = "WALLPAPER",
  PRAISE = "PRAISE",
  PRAYER = "PRAYER",
  DEVOTIONAL = "DEVOTIONAL",
  BOOK = "BOOK",
  MUSIC = "MUSIC",
  SERIES = "SERIES",
  GIFT = "GIFT",
}

export interface IPastContentFilter {
  page?: number;
  recordCount?: number;
  contentType?: CONTENT_TYPES; // "MESSAGE" | "BLOG" | "ARTICLE";
  //   thumbnailUrl: string;
  title?: string;
  speaker?: string;
  messageID?: string;
  date?: string;
  //   bookmarkUrl?: string;
  //   launchUrl?: string;
  format?: string;
  //   price?: number;
  //   topics?: string[];
  //   availableFormats?: string[];
  //   prayerProperties?: PrayerProperties;
}

// export interface IContentListItem {
//   contentType: CONTENT_TYPES; // "MESSAGE" | "BLOG" | "ARTICLE";
//   thumbnailUrl: string;
//   title: string;
//   speaker: string;
//   messageID: string;
//   date: string;
//   bookmarkUrl?: string;
//   launchUrl?: string;
//   format?: string;
//   price?: number;
//   topics?: string[];
//   availableFormats?: string[];
//   prayerProperties?: PrayerProperties;
// }
export enum PAST_CONTENT_DISPLAY_FORMATS {
  SIMPLE = "SIMPLE",
  FILTERED = "FILTERED",
}

export interface IPastContentBlockProps {
  filterProps: IPastContentFilter;
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS.FILTERED;
}

export interface IMessage {
  primaryLink: ILinkItemNode;
  secondaryLink: ILinkItemNode;
  speaker: ISpeaker;
  messageNumber: number;
  title: string;
  displayDate: string;
  copy: IXHTMLString;
  thumbnailURL: string;
}
