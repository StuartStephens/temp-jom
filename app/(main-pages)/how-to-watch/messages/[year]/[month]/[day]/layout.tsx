import { MessageLayout } from "../../../../components/MessageLayout";

export default async function CommunityPageLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <MessageLayout>{children}</MessageLayout>;
}

