"use client";
import {
  CONTENT_TYPES,
  PAST_CONTENT_DISPLAY_FORMATS,
} from "../../../app/types";
import { ContentList } from "../ContentList";
import { IContentListItem } from "../ContentList/ContentListItem";
import GrowingList from "../GrowingList";

export interface IPastBlogsProps {
  content?: IContentListItem[];
  displayMethod?: PAST_CONTENT_DISPLAY_FORMATS;
}

export function PastBlogs(props: IPastBlogsProps) {
  const { content, displayMethod } = props;

  return (
    <>
      {(!displayMethod ||
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.SIMPLE) && (
        <ContentList
          heading="Past Blogs"
          contentType={CONTENT_TYPES.BLOG}
          viewAllLinkText="View all Blogs"
          viewAllLink="/inspiration/blogs"
          content={props.content}
        />
      )}

      {displayMethod &&
        displayMethod === PAST_CONTENT_DISPLAY_FORMATS.FILTERED && (
          <>
            <GrowingList
              contentList={props.content || []}
              contentType={CONTENT_TYPES.BLOG}
            />
          </>
        )}
    </>
  );
}
