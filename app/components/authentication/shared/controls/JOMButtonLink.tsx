import Link from "next/link";
import React, { MouseEvent, MouseEventHandler, PropsWithChildren } from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";

export interface IJOMButtonLinkProps {
  href: string;
  buttonProps?: ButtonProps;
  onClick?: Function;
}

export function JOMButtonLink(props: PropsWithChildren<IJOMButtonLinkProps>) {
  const { onClick, href, buttonProps } = props;
  let buttonClassName = buttonProps?.className
    ? buttonProps?.className
    : "text-primary";

  function clickCatcher(event: MouseEvent<HTMLAnchorElement>) {
    onClick && onClick();
  }

  return (
    <Link
      href={props.href}
      passHref
      onClick={clickCatcher}
      className="d-inline-flex"
    >
      <Button
        variant={buttonProps?.variant || "jombutton"}
        className={buttonClassName}
        {...buttonProps}
      >
        {props.children}
      </Button>
    </Link>
  );
}
