import { Image } from "react-bootstrap";

export type LogoProps = {
    // companyLogo?: ContentLink<IContent>;
    companyName: string;
    logoURL: string;
    logoHeight?: number;
    logoWidth?: number;
    className?: string;
};

export default function Logo(props: LogoProps) {
    const { companyName, logoURL, logoHeight, logoWidth, className } = props;
    const renderLogoWidth = logoWidth ?? (250 / 75) * (logoHeight ?? 75);
    const renderLogoHeight = logoHeight;
    return (
        <Image
            className={`bs-logo`}
            src={logoURL}
            alt={companyName}
            height={renderLogoHeight}
            width={renderLogoWidth}
        // priority
        />
    );
}

Logo.displayName = "Logo";

