"use client";
import { Card, CardBody, CardHeader, Container } from "react-bootstrap";
import { PodcastCard } from "./PodcastCard";
import { ILinkItemNode } from "../../../../../components/cms/types/core/CoreTypes";

export interface IPodcastsPageProps {}

export function PodcastsPage(props: IPodcastsPageProps) {
  return (
    <Container
      fluid
      className="page-gutter full-width d-flex flex-row gap-3 my-4"
    >
      <PodcastCard
        title="Sirius XM"
        details="If you use SiriusXM click the 'Subscribe' button below to visit the SiriusXM website and subscribe."
        icon={{
          Url: "https://www.joelosteen.com/globalassets/images/jom/how-to-watch/podcast/siriusxm_logo_2023.png",
          Title: "sirus xm logo",
        }}
        link={{ Href: "#", Title: "SIRUISXM" } as ILinkItemNode}
      />
      <PodcastCard
        title="iTunes"
        details="If you use iTunes click the 'Subscribe' button below to visit the iTunes website and subscribe."
        icon={{
          Url: "https://www.joelosteen.com/globalassets/images/jom/how-to-watch/podcast/itunes_logo_170.png",
          Title: "sirus xm logo",
        }}
        link={{ Href: "#", Title: "iTunes" } as ILinkItemNode}
      />
      <PodcastCard
        title="Spotify"
        details="If you use Spotify click the 'Subscribe' button below to visit the Spotify website and subscribe."
        icon={{
          Url: "https://www.joelosteen.com/globalassets/images/jom/how-to-watch/podcast/spotify_logo_170.png",
          Title: "sirus xm logo",
        }}
        link={{ Href: "#", Title: "Spotify" } as ILinkItemNode}
      />
    </Container>
  );
}
