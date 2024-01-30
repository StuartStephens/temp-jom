"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { LastMessagesBannerRenderer } from "./LastMessagesBannerRenderer";

import { IMessage, ISpeaker } from "../../types";
import { ILinkItemNode, IXHTMLString } from "../cms/types/core/CoreTypes";
import { LastMessagesAdditionalMessagesRenderer } from "./LastMessagesAdditionalMessagesRenderer";
import { IBannerProps } from "../shared/Banner/Banner";

//TODO: fix import after updating content graph
export interface ILastMessagesProps {
  // contentBlock: LastMessagesBlockAlias;
  messages?: IMessage[]; //TODO: either fetch this from this component, or pass it in from parent, or get from a context/global scope
  className?: string;
}

export function LastMessages(props: ILastMessagesProps) {
  const DEBUG = process.env.NODE_ENV !== "production";
  // const { contentBlock } = props;
  const [recentMessages, setRecentMessages] = useState<
    IMessage[] | undefined
  >();
  const [linkProps, setLinkProps] = useState<ILinkItemNode[]>([]);

  useEffect(() => {
    setRecentMessages(props.messages);
  }, []);

  useEffect(() => {
    if (!recentMessages) return;
    let x: ILinkItemNode[] = [];
    recentMessages[0]?.primaryLink && x.push(recentMessages[0]?.primaryLink);
    recentMessages[0]?.secondaryLink &&
      x.push(recentMessages[0]?.secondaryLink);
    setLinkProps(x);
  }, []);

  return (
    <Container
      fluid
      className={`last-messages-block full-width ${props.className || ""}`}
    >
      {recentMessages && (
        <Container fluid className="content-list mb-2 full-width">
          <LastMessagesBannerRenderer
            message={recentMessages[0]}
            bannerProps={
              {
                backgroundImgUrl: recentMessages[0]?.thumbnailURL,
                // "https://int.joelosteen.com/globalassets/images/jom/how-to-watch/victoria-osteen-712-make-time-alone-with-god/desktop.jpg",
                ariaTitle: "Recent messages background image",
              } as IBannerProps
            }
            links={linkProps}
          />
          <LastMessagesAdditionalMessagesRenderer
            messages={recentMessages && recentMessages.slice(1)}
          />
        </Container>
      )}
      {/* TODO: need to determine correct behavior here if there are no recent messages */}
      {!recentMessages ||
        (!recentMessages.length && <div>There are no Recent Messages</div>)}
    </Container>
  );
}
