import { PastBlogs } from "../../../../components/PastBlogs";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../components/shared/layouts/PageGutterLayout";
import { PAST_CONTENT_DISPLAY_FORMATS } from "../../../../types";

export interface IBlogsProps {}

async function getBlogs() {
  try {
    const res = await fetch("http://localhost:4000/jomapi/blog", {
      next: {
        revalidate: 0, // millis frequency of cache
      },
    });
    const blogs = await res.json();
    return blogs;
  } catch (e) {
    console.error(e);
  } finally {
    //DONE
  }
  return;
}
export async function Blogs(props: IBlogsProps) {
  const blogs = await getBlogs();
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <PastBlogs
        content={blogs}
        displayMethod={PAST_CONTENT_DISPLAY_FORMATS.FILTERED}
      />
    </PageGutterLayout>
  );
}
