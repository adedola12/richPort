import { Helmet } from "react-helmet-async";

const SITE = "Richard Enoch — Multidisciplinary Designer";
const DEFAULT_DESC =
  "Portfolio of Richard Enoch — brand identity, UI/UX, graphic design, and web design.";
const DEFAULT_IMG = "https://richardenoch.vercel.app/og-default.jpg";
const BASE_URL = "https://richardenoch.vercel.app";

const PageMeta = ({ title, description = DEFAULT_DESC, image = DEFAULT_IMG, url }) => {
  const fullTitle = title ? `${title} | Richard Enoch` : SITE;
  const canonical = url ? `${BASE_URL}${url}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default PageMeta;
