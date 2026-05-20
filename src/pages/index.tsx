import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Hero from "../sections/Hero";
import LogoCloud from "../sections/LogoCloud";
import Stats from "../sections/Stats";
import ValueProp from "../sections/ValueProp";
import Features from "../sections/Features";
import MobileApp from "../sections/MobileApp";
import Modules from "../sections/Modules";
import HowItWorks from "../sections/HowItWorks";
import Demo from "../sections/Demo";
import Faq from "../sections/Faq";
import CtaBanner from "../sections/CtaBanner";

const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <LogoCloud />
    <Stats />
    <ValueProp />
    <Features />
    <Modules />
    <MobileApp />
    <HowItWorks />
    <Demo />
    <Faq />
    <CtaBanner />
  </Layout>
);

export default IndexPage;

export const Head: HeadFC = () => <Seo />;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
