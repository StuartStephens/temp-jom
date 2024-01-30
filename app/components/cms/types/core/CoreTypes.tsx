export interface ILinkItemNode {
    Name: string;
    Link: string;
}
export interface IContentLink {
    Expanded: ILinkItemNode;
}

export interface ILinkItemNode {
    ContentLink?: IContentLink;
    Href: string;
    Title: string;
}
export interface IImage {
    Url?: string;
    Title?: string;
}
export interface IVideo {
    Href: string;
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

