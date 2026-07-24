import "./src/styles/global.css";

import type { ShouldUpdateScrollArgs } from "gatsby";

// Always start at the top when navigating to a new page (unless the target
// has a #hash anchor). Without this, navigating away from a long page (e.g.
// the home page footer) could keep the previous scroll position.
export const shouldUpdateScroll = ({
  routerProps: { location },
}: ShouldUpdateScrollArgs) => {
  if (location.hash) return true;
  window.scrollTo(0, 0);
  return false;
};
