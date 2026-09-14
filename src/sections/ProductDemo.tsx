import * as React from "react";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import VideoPlayer from "../components/VideoPlayer";
import Highlight, { plainText } from "../components/Highlight";
import { productTourByLanguage, resolveVideo } from "../data/videos";

const ProductDemo: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const slot = productTourByLanguage[language] ?? productTourByLanguage.ru;
  const media = resolveVideo(slot, { autoplay: "1" });
  const title = plainText(t("productDemo.title"));

  return (
    <section id="demo-video" className="section overflow-hidden bg-white">
      <h2 className="sr-only">{title}</h2>
      <div className="container" data-reveal>
        <VideoPlayer
          key={language}
          {...(media ?? {})}
          title={title}
          caption={t("productDemo.caption")}
          playLabel={t("productDemo.play")}
          overlay={
            <>
              <span className="block max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                <Highlight text={t("productDemo.title")} className="hl-marker" />
              </span>
              <span className="hidden max-w-xl text-base text-white/80 sm:block">
                {t("productDemo.body")}
              </span>
            </>
          }
        />
      </div>
    </section>
  );
};

export default ProductDemo;
