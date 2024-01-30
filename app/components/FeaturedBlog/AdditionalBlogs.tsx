import { Button } from "react-bootstrap";
import { IBlog } from "../../types";

export interface IAdditionalBlogRendererProps {
  blog: IBlog;
}

export function AdditionalBlogRenderer(props: IAdditionalBlogRendererProps) {
  const { blog } = props;
  return (
    <div className="additional-blog-renderer gap-5 d-flex flex-column justify-content-center align-items-center">
      <div className="caption text-center ">
        <h2>{blog?.title}</h2>
        <div>
          by {blog?.author?.firstName} {blog?.author?.lastName}
        </div>
        <div>{blog?.publishDate}</div>
      </div>
      <div className="button-row ">
        <Button
          variant="outline-light"
          className=""
          onClick={() => {
            alert(blog?.id);
          }}
        >
          Read Blog Entry
        </Button>
      </div>
    </div>
  );
}
