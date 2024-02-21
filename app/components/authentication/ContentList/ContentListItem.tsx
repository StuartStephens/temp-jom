import { Card, Container } from "react-bootstrap";
import { ShoutOfPraiseContentListItem } from "./ShoutOfPraiseContentListItem";
import { PrayerContentListItemItem } from "./PrayerContentListItem";
import { useAuth } from "../../../app/contexts/Auth/Context";
import { CONTENT_TYPES } from "../../../app/types";
import Link from "next/link";
import EcommerceItemCard, { EcommerceItem } from "./EcommerceItemCard";
import { useRouter } from "next/navigation";

export type PrayerProperties = {
  likeCount: number;
  likedByCurrentUser: boolean;
  repliedToByCurrentUser: boolean;
};

export interface IContentListItem {
  contentType: CONTENT_TYPES; // "MESSAGE" | "BLOG" | "ARTICLE";
  thumbnailUrl: string;
  title: string;
  speaker: string;
  messageID: string;
  date: string;
  bookmarkUrl?: string;
  launchUrl?: string;
  format?: string;
  price?: number;
  topics?: string[];
  availableFormats?: string[];
  prayerProperties?: PrayerProperties;
}

export interface IContentListItemProps {
  contentListItem: IContentListItem;
}

export function ContentListItem(props: IContentListItemProps) {
  const router = useRouter();
  const { isLibraryEnabled } = useAuth();
  const {
    contentType,
    thumbnailUrl,
    bookmarkUrl,
    title,
    speaker,
    messageID,
    date,
    launchUrl,
    availableFormats,
  } = props.contentListItem;

  return (
    <div
      key={messageID}
      className={` content-list-item-renderer content-list-item-renderer-${contentType} `}
    >
      {[
        CONTENT_TYPES.BOOK,
        CONTENT_TYPES.MUSIC,
        CONTENT_TYPES.SERIES,
        CONTENT_TYPES.GIFT,
      ].includes(contentType) && (
        <EcommerceItemCard
          contentListItem={
            props?.contentListItem && (props?.contentListItem as EcommerceItem)
          }
        />
      )}
      {contentType == CONTENT_TYPES.PRAISE && (
        <ShoutOfPraiseContentListItem contentListItem={props.contentListItem} />
      )}
      {contentType == CONTENT_TYPES.PRAYER && (
        <PrayerContentListItemItem contentListItem={props.contentListItem} />
      )}
      {[
        CONTENT_TYPES.MESSAGE,
        CONTENT_TYPES.ARTICLE,
        CONTENT_TYPES.BLOG,
        CONTENT_TYPES.WALLPAPER,
        CONTENT_TYPES.DEVOTIONAL,
      ].includes(contentType) && (
        <Card>
          <Link
            className="card-item-image-link"
            href={`${launchUrl}`}
            title={`Play: ${title}`}
          >
            <div
              className="card-item-image-wrapper"
              style={{
                backgroundImage: `url(
      '${thumbnailUrl}'
    )`,
              }}
            >
              {contentType == CONTENT_TYPES.MESSAGE && (
                <div className="card-item-play-overlay">
                  <div className="card-item-play-overlay-content-wrapper justify-content-center align-items-center">
                    <i className="bi bi-play-circle display-3  "></i>
                  </div>
                </div>
              )}
            </div>
          </Link>

          <Card.Body>
            <div
              tabIndex={0}
              className="card-item-body-wrapper d-flex flex-column"
              onClick={() => {
                router.push(`${launchUrl}`);
              }}
            >
              <div className="title-row">
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <div className="caption text-truncate pe-2" title={title}>
                    {/* <a href={`${launchUrl}`} className="text-black"> */}
                    <h4>{title}</h4>
                    {/* </a> */}
                  </div>
                  {isLibraryEnabled && (
                    <div className="bookmark pl-2 text-end ">
                      <Link href={`${bookmarkUrl}`}>
                        <i className="bi bi-bookmark"></i>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {contentType == CONTENT_TYPES.MESSAGE && (
                <div className="author">
                  <Link
                    href="#speakersPage"
                    className="pe-2 text-muted"
                  >{`${speaker}'s`}</Link>
                  <span>{messageID}</span>
                </div>
              )}
              {(contentType == CONTENT_TYPES.BLOG ||
                contentType == CONTENT_TYPES.ARTICLE) && (
                <div className="author">
                  <a
                    href="#speakersPage"
                    className="pe-2 text-muted"
                  >{`by ${speaker}`}</a>
                </div>
              )}

              {(contentType == CONTENT_TYPES.BLOG ||
                contentType == CONTENT_TYPES.ARTICLE) && (
                <div className="date text-muted">{date}</div>
              )}
              {contentType == CONTENT_TYPES.WALLPAPER &&
                availableFormats &&
                availableFormats.map((imageSize: string, index: number) => {
                  return (
                    <Container fluid key={imageSize} className="full-width">
                      <div className=" text-muted">{imageSize}</div>
                    </Container>
                  );
                })}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
