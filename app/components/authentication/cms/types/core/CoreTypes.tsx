export interface IContentLink {
  Expanded: ILinkItemNode;
}

export interface ILinkItemNode {
  ContentLink?: IContentLink;
  Href: string;
  Title: string;
  Name?: string;
}
export interface IImage {
  Url?: string;
  Title?: string;
  Caption?: string;
}
export interface IVideo {
  // Href: string;
  Url: string;
}

export interface IXHTMLString {
  Data: string; //use string for now
}

export interface IIFrameEmbed {
  Height: number;
  Width: number;
  Src: string;
  Title: string;
  AutoPlay: boolean;
}
