import { Button, Card, Container, Image } from "react-bootstrap";
import { ShareYourStoryComponentBlock } from "./ShareYourStoryComponentBlock";
import { FacebookShareBlock } from "./FacebookShareBlock";
import { SocialPostsContainerBlock } from "./SocialPostsContainerBlock";

export interface ICommunityBlockProps {}

export function Community(props: ICommunityBlockProps) {
  return (
    <Container fluid className="community-block full-width standard-content ">
      <FacebookShareBlock />

      <SocialPostsContainerBlock />
      {/* This goes in a content area in CommunityBlock called ShareYourStoryComponentBlock , so community needs to handle rendering this content area, assuming it has content in it*/}
      <ShareYourStoryComponentBlock />
    </Container>
  );
}
