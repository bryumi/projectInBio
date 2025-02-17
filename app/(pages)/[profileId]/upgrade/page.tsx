import Header from "@/app/componentes/LandingPage/Header";
import PlanButtons from "./plan-buttons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProjectInBio - Upgrade",
  description: "ProjectInBio - Upgrade",
};

export default async function UpgradePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <Header />
      <h2 className="text-2xl font-bold">Escolha o plano</h2>
      <div className="flex gap-4">
      <PlanButtons />
      </div>
    </div>
  );
}
