import FAQ from "@/app/componentes/LandingPage/FAQ";
import Header from "@/app/componentes/LandingPage/Header";
import Hero from "@/app/componentes/LandingPage/Hero";
import Pricing from "@/app/componentes/LandingPage/Pricing";
import VideoExplanation from "@/app/componentes/LandingPage/VideoExplanation";
import { getTextBySlug } from "@/app/server/get-texts-by-slugs";

import { notFound } from "next/navigation";


export default async function LinkInBio({
  params,
}: {
  params: Promise<{ socialMediaSlug: string }>;
}) {
  const { socialMediaSlug } = await params;
  const texts = await getTextBySlug(socialMediaSlug);
  if (!texts) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Hero texts={texts} />
      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
