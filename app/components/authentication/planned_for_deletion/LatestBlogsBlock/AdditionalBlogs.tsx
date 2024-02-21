import { Button } from "react-bootstrap";

export interface IAdditionalBlogRendererProps {}

export function AdditionalBlogRenderer(props: IAdditionalBlogRendererProps) {
  return (
    <div className="additional-blog-renderer gap-5 d-flex flex-column justify-content-center align-items-center">
      <div className="caption text-center ">
        <h2>Strength at the Core</h2>
        <div>by Victoria Osteen</div>
        <div>September 19, 2023</div>
      </div>
      <div className="button-row ">
        <Button variant="outline-light" className="">
          Read Blog Entry
        </Button>
      </div>
    </div>
  );
}
