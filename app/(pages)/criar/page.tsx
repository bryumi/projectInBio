
import Header from "@/app/componentes/LandingPage/Header";
import { Rocket } from "lucide-react";
import CreateLinkForm from "./create-link-form";
import { trackServerEvent } from "@/app/lib/mixpanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProjectInBio - Criar",
  description: "ProjectInBio - Criar",
};

export default function CriarPage() {
  trackServerEvent("page_view", {
    page: "home",
  });
  return (
    <div>
      <Header />
      <div className="mx-auto flex h-screen max-w-xl flex-col items-center justify-center gap-10">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>
        <CreateLinkForm />
      </div>
    </div>
  );
}
