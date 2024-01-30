import { Container } from "react-bootstrap";

export interface IGenericPageBannerTitleProps {}

export function GenericPageBannerTitle(props: {
  iconClassName?: string;
  title: string;
}) {
  const { iconClassName, title } = props;
  return (
    <Container fluid className={`generic-page-banner-title full-width`}>
      <h1 className={`${iconClassName || ""} `}>{title}</h1>
    </Container>
  );
}
