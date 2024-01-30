import { IMessage, ISpeaker } from "../../../../types";
import { LastMessages } from "../../../LastMessages";
import { ILinkItemNode } from "../../types/core/CoreTypes";

export interface ILastMessagesBlockProps { }

export function LastMessagesBlock(props: ILastMessagesBlockProps) {
  function getDummyData() {
    const MESSAGE_ONE: IMessage = {
      primaryLink: {
        Href: "#MESSAGE_ONE primaryLink",
        Title: "Watch Now",
      } as ILinkItemNode,
      secondaryLink: {
        Href: "/inspiration/watch/how-to-watch",
        Title: "View All Messages",
      } as ILinkItemNode,
      speaker: { firstName: "Joel", lastName: "Osteen" } as ISpeaker,
      messageNumber: 711,
      title: "Living Unoffended",
      displayDate: "September 17, 2023",
      copy: {
        Data: "How you handle offenses can broaden or limit your potential. When you release the offense and trust God to be your vindicator, there is no limit to where He can take you. ",
      },
      thumbnailURL:
        "http://www.joelosteen.com/contentassets/ddb0eb5bb0f048439eae44cb946ac9ec/jo004-1920x1080.png",
    };
    const MESSAGE_TWO = {
      primaryLink: {
        Href: "#MESSAGE_ONE primaryLink",
        Title: "Watch Now",
      } as ILinkItemNode,
      secondaryLink: {
        Href: "/inspiration/watch/how-to-watch",
        Title: "View All Messages",
      } as ILinkItemNode,
      speaker: { firstName: "Victoria", lastName: "Osteen" } as ISpeaker,
      messageNumber: 717,
      title: "Keep Health Family Connections",
      displayDate: "September 15, 2023",
      copy: {
        Data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis nesciunt reiciendis officiis. Dolor dignissimos quas, similique aspernatur laudantium quo consequuntur dolores nemo at expedita iure optio! Aliquam placeat neque aut?",
      },
      thumbnailURL:
        "http://www.joelosteen.com/contentassets/ddb0eb5bb0f048439eae44cb946ac9ec/jo004-1920x1080.png",
    };
    const MESSAGE_THREE = {
      primaryLink: {
        Href: "#MESSAGE_ONE primaryLink",
        Title: "Watch Now",
      } as ILinkItemNode,
      secondaryLink: {
        Href: "/inspiration/watch/how-to-watch",
        Title: "View All Messages",
      } as ILinkItemNode,
      speaker: { firstName: "Victoria", lastName: "Osteen" } as ISpeaker,
      messageNumber: 969,
      title: "Your Time to Shine",
      displayDate: "September 10, 2023",
      copy: {
        Data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis nesciunt reiciendis officiis. Dolor dignissimos quas, similique aspernatur laudantium quo consequuntur dolores nemo at expedita iure optio! Aliquam placeat neque aut?",
      },
      thumbnailURL:
        "http://www.joelosteen.com/contentassets/ddb0eb5bb0f048439eae44cb946ac9ec/jo004-1920x1080.png",
    };
    const MESSAGE_FOUR = {
      primaryLink: {
        Href: "#MESSAGE_ONE primaryLink",
        Title: "Watch Now",
      } as ILinkItemNode,
      secondaryLink: {
        Href: "/inspiration/watch/how-to-watch",
        Title: "View All Messages",
      } as ILinkItemNode,
      speaker: { firstName: "Victoria", lastName: "Osteen" } as ISpeaker,
      messageNumber: 969,
      title: "Your Time to Shine",
      displayDate: "September 10, 2023",
      copy: {
        Data: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis nesciunt reiciendis officiis. Dolor dignissimos quas, similique aspernatur laudantium quo consequuntur dolores nemo at expedita iure optio! Aliquam placeat neque aut?",
      },
      thumbnailURL:
        "http://www.joelosteen.com/contentassets/ddb0eb5bb0f048439eae44cb946ac9ec/jo004-1920x1080.png",
    };
    return [MESSAGE_ONE, MESSAGE_TWO, MESSAGE_THREE, MESSAGE_FOUR];
  }

  return <LastMessages messages={getDummyData()} />;
}
