import { Metadata } from "next";
import FAQ from "../componentes/LandingPage/FAQ";
import Header from "../componentes/LandingPage/Header";
import Hero from "../componentes/LandingPage/Hero";
import Pricing from "../componentes/LandingPage/Pricing";
import VideoExplanation from "../componentes/LandingPage/VideoExplanation";
import { trackServerEvent } from "../lib/mixpanel";
import { getSEOTags } from "../lib/seo";

export const metadata: Metadata = getSEOTags({
  appName: "ProjectInBio",
  appDescription:
    "ProjectInBio - Seus projetos e redes sociais em um único link",
  keywords: ["ProjectInBio", "projetos", "redes sociais", "link"],
  appDomain: "https://project-in-bio-nu.vercel.app/",
  canonicalUrlRelative: "/",
});
export default function Home() {
  trackServerEvent("page_view", {
    page: "home",
  });

  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <Hero />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
