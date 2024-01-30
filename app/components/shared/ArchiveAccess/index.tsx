"use client";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { JOMButtonLink } from "../controls/JOMButtonLink";
import { PAGE_GUTTER, PageGutterLayout } from "../layouts/PageGutterLayout";
import { useAuth } from "../../../contexts/Auth/Context";

export interface IArchiveAccessProps { }

export function ArchiveAccess(props: IArchiveAccessProps) {
  const { checkIsLoggedIn } = useAuth();
  return !checkIsLoggedIn() ? (
    <PageGutterLayout
      variant={PAGE_GUTTER.NONE}
      className="d-flex flex-column justify-content-center align-items-center pt-3 pb-4 bg-light border-top"
    >
      <JOMButtonLink href="/inspiration/todays-word?login=true">
        <span className="pe-3">
          <i className={`bi bi-plus-circle text-primary `} />
        </span>
        <span>Archive</span>
      </JOMButtonLink>

      <div>
        <p>
          Sign-in or create an account to browse our full Today's Word
          devotional archive!
        </p>
      </div>
      <div className="button-row   text-center">
        <Link href="/inspiration/todays-word?login=true" passHref>
          <Button variant="primary">Sign in</Button>
        </Link>
      </div>
    </PageGutterLayout>
  ) : null;
}
