// Featured images per blog post. Kept separate from blogPosts.ts because that
// file is imported by gatsby-node (Node context), where importing JPGs fails.
import processImg from "../images/blog/process.jpg";
import erpImg from "../images/blog/erp.jpg";
import accountingImg from "../images/blog/accounting.jpg";
import reportsImg from "../images/blog/reports.jpg";
import hrmImg from "../images/blog/hrm.jpg";

export const blogImages: Record<string, string> = {
  process: processImg,
  erp: erpImg,
  accounting: accountingImg,
  reports: reportsImg,
  hrm: hrmImg,
};
