import * as React from 'react';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import VideoPlayer from '../components/VideoPlayer';
import Highlight, { plainText } from '../components/Highlight';
import { productTourByLanguage, resolveVideo } from '../data/videos';

/** Feature spotlight in the zoom.com pattern: heading left, media block below. */
const ProductDemo: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const slot = productTourByLanguage[language] ?? productTourByLanguage.ru;
  const media = resolveVideo(slot, { autoplay: '1' });
  const title = plainText(t('productDemo.title'));

  return (
    <section id="demo-video" className="section overflow-hidden bg-white">
      <div className="container">
        <div className="max-w-3xl" data-reveal>
          <h2 className="section-title">
            <Highlight
              text={t('productDemo.title')}
              className="text-brand-600"
            />
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">
            {t('productDemo.body')}
          </p>
        </div>
        <div className="mt-10" data-reveal>
          <VideoPlayer
            key={language}
            {...(media ?? {})}
            title={title}
            playLabel={t('productDemo.play')}
            overlay={
              <span className="block max-w-3xl font-display text-2xl leading-tight text-white sm:text-4xl lg:text-5xl">
                <Highlight
                  text={t('productDemo.title')}
                  className="text-brand-300"
                />
              </span>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
