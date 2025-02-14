import { TrendingUp } from "lucide-react";
export default function TotalVisits({ totalVisits }: { totalVisits?: number }) {

  return (
    <div className="bg-background-secondary border-border-primary flex w-min items-center gap-5 whitespace-nowrap rounded-xl border px-8 py-3 shadow-lg">
      <span className="font-bold text-white">Total de visitas</span>
      <div className="text-accent-green flex items-center gap-2">
        <span className="text-3xl font-bold">{totalVisits}</span>
        <TrendingUp />
      </div>
      {/* <div className="flex items-center gap-2">
        <button>Portal</button>
        <button>Sair</button>
      </div> */}
    </div>
  );
}
