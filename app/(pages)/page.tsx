import FAQ from "../componentes/LandingPage/FAQ";
import Header from "../componentes/LandingPage/Header";
import Hero from "../componentes/LandingPage/Hero";
import Pricing from "../componentes/LandingPage/Pricing";
import VideoExplanation from "../componentes/LandingPage/VideoExplanation";

export default function Home() {
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
