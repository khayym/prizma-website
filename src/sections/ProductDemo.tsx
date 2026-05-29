import * as React from "react";
import { withPrefix } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import VideoPlayer from "../components/VideoPlayer";

const ProductDemo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="demo-video" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("productDemo.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            {t("productDemo.title")}
          </h2>
          <p className="mt-4 text-ink-600">{t("productDemo.body")}</p>
        </div>

        <div className="mt-14">
          <VideoPlayer
            src={withPrefix("/videos/product-demo.mp4")}
            title={t("productDemo.overlayTitle")}
            caption={t("productDemo.caption")}
            playLabel={t("productDemo.play")}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
