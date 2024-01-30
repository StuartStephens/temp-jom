import { PropsWithChildren, ReactNode } from "react";
import { Container } from "react-bootstrap";

export enum PAGE_GUTTER {
    NONE = "page-gutter-none",
    SMALL = "page-gutter-small",
    MEDIUM = "page-gutter-medium",
    LARGE = "page-gutter-large",
}

export interface IPageGutterLayoutProps {
    variant?: PAGE_GUTTER;
    className?: string;
    children: ReactNode;
}

export function PageGutterLayout(props: IPageGutterLayoutProps) {
    const { variant } = props;
    return (
        <Container
            fluid
            className={`page-gutter ${props.className || ""} ${variant || PAGE_GUTTER.MEDIUM
                }`}
        >
            {props.children}
        </Container>
    );
}

