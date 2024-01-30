import { useState } from "react";
import { Button } from "react-bootstrap";

export interface IRowActionButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export function RowActionButton({ children, onClick }: IRowActionButtonProps) {
  return (
    <Button
      variant="outline-primary"
      size="sm"
      className="p-0"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
