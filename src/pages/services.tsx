import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import RedirectPage, {
  RedirectHead,
  type I18nPageContext,
} from "../components/RedirectPage";

const ServicesPage: React.FC = () => <RedirectPage hash="services" />;

export default ServicesPage;

export const Head: HeadFC<object, I18nPageContext> = ({ pageContext }) => (
  <RedirectHead hash="services" pageContext={pageContext} />
);

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
