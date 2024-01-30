import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../types";
import { ContentList } from "../ContentList";
import { IContentListItem } from "../ContentList/ContentListItem";
import GrowingList from "../GrowingList";

export interface IPastArticlesProps {
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function PastArticles(props: IPastArticlesProps) {
  const { displayMethod } = props;

  return (
    <>
      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
          <ContentList
            heading="Past Articles"
            contentType={CONTENT_TYPES.ARTICLE}
            viewAllLinkText="View all Articles"
            viewAllLink="/inspiration/articles"
            content={props.content}
          />
        )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={props.content || []}
              contentType={CONTENT_TYPES.ARTICLE}
            />
          </>
        )}
    </>
  );
}
