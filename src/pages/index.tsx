import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import About from "../sections/About";
import Features from "../sections/Features";
import Services from "../sections/Services";
import ProductDemo from "../sections/ProductDemo";
import MobileApp from "../sections/MobileApp";
import Demo from "../sections/Demo";
import Blog from "../sections/Blog";
import Faq from "../sections/Faq";
import CtaBanner from "../sections/CtaBanner";

/** Single-page site: everything a visitor needs is on the home page. */
const IndexPage: React.FC = () => (
  <Layout>
    <Hero />
    <Stats />
    <ProductDemo />
    <About />
    <Features />
    <Services />
    <MobileApp />
    <Demo />
    <Blog />
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
