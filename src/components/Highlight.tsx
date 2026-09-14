import * as React from "react";

const MARKUP = /<hl>(.*?)<\/hl>/;

interface HighlightProps {
  /** Translation string with the emphasized words wrapped in `<hl>…</hl>`. */
  text: string;
  /** Classes for the emphasized words. */
  className: string;
}

/**
 * Two-tone headings: each locale marks which words stand out, so the accent
 * lands on the right phrase regardless of word order.
 */
const Highlight: React.FC<HighlightProps> = ({ text, className }) => (
  <>
    {text.split(MARKUP).map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className={className}>
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    )}
  </>
);

/** The same string without highlight markup — for `title` and ARIA labels. */
export const plainText = (text: string) => text.replace(/<\/?hl>/g, "");

export default Highlight;
