import { ReactNode } from "react";

export enum BANNER_VARIANTS {
  LIGHT_TEXT = "LIGHT",
  DARK_TEXT = "DARK",
}
export interface IBannerProps {
  backgroundImgUrl?: string | undefined;
  backgroundVideoUrl?: string;
  variant?: BANNER_VARIANTS; //light or dark
  className?: string;
  children?: ReactNode;
  ariaTitle?: string;
  ariaRole?: string;
}

export default function Banner(props: IBannerProps) {
  const {
    backgroundImgUrl,
    variant,
    ariaTitle,
    className,
    backgroundVideoUrl,
    ariaRole,
  } = props;

  return (
    <div
      title={ariaTitle}
      className={`banner ${
        "" + BANNER_VARIANTS.DARK_TEXT == variant ? "banner-dark-text" : ""
      } full-width ${className}`}
    >
      {backgroundImgUrl && <div className="bg-gradiant"></div>}

      <div className="banner-image">
        {backgroundImgUrl && (
          <picture style={{ position: "relative" }}>
            <source
              srcSet={backgroundImgUrl}
              media="(min-width: 992px) and (max-width: 1199px)"
            />
            <source srcSet={backgroundImgUrl} media="(min-width: 1200px)" />
            <source srcSet={backgroundImgUrl} media="(max-width: 767px)" />
            <source
              srcSet={backgroundImgUrl}
              media="(min-width: 768px) and (max-width: 991px)"
            />
            <img
              role={ariaRole}
              srcSet={backgroundImgUrl}
              responsive-src="#"
              className="b-lazy"
            />
          </picture>
        )}
      </div>
      {backgroundVideoUrl && (
        <div className="banner-video">
          <video
            className=""
            autoPlay={true}
            playsInline={true}
            muted={true}
            loop={true}
            src={backgroundVideoUrl}
          ></video>
        </div>
      )}
      <div className="banner-content">
        {props.children && <BannerBody>{props.children}</BannerBody>}
      </div>
    </div>
  );
}

type BannerBodyProps = {
  children?: ReactNode;
};

function BannerBody(props: BannerBodyProps) {
  return <div className="banner-body ">{props.children}</div>;
}
