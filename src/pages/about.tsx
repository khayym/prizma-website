import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import RedirectPage, {
  RedirectHead,
  type I18nPageContext,
} from "../components/RedirectPage";

const AboutPage: React.FC = () => <RedirectPage hash="about" />;

export default AboutPage;

export const Head: HeadFC<object, I18nPageContext> = ({ pageContext }) => (
  <RedirectHead hash="about" pageContext={pageContext} />
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
