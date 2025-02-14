import { TrendingUp } from "lucide-react";
import PortalButton from "./PortalButton";
import { auth } from "@/app/lib/auth";
import { manageAuth } from "@/app/actions/manage-auth";
export default async function TotalVisits({ totalVisits, showBar }: { totalVisits?: number; showBar?: boolean }) {
  const session = await auth();
  return (
    <div className="bg-background-secondary border-border-primary flex w-min items-center gap-5 whitespace-nowrap rounded-xl border px-8 py-3 shadow-lg">
      <span className="font-bold text-white">Total de visitas</span>
      <div className="text-accent-green flex items-center gap-2">
        <span className="text-3xl font-bold">{totalVisits}</span>
        <TrendingUp />
      </div>
      {showBar && (
        <div className="flex items-center gap-2">
          {session?.user.isSubscribed && <PortalButton />}
          <form action={manageAuth}>
            <button>Sair</button>
          </form>
        </div>
      )}
    </div>
  );
}
