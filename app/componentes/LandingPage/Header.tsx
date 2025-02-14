import { auth } from "@/app/lib/auth";
import Button from "../ui/Button";
import { manageAuth } from "@/app/actions/manage-auth";
import Link from "next/link";
import { getProfileId } from "@/app/server/get-profile-data";

export default async function Header() {
  const session = await auth();
  const profileId = await getProfileId(session?.user?.id as string);
  return (
    <div className="absolute left-0 right-0 top-0 mx-auto flex max-w-7xl items-center justify-between py-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="ProjectInBio Logo" />
        <h3 className="text-2xl font-bold text-white">ProjectInBio</h3>
      </div>
      <div className="flex items-center gap-4">
      {session && (
          <Link href={`/${profileId}`}>
            <Button>Minha Página</Button>
          </Link>
        )}
        <form action={manageAuth}>
          <Button>{session ? "Sair" : "Login"}</Button>
        </form>
      </div>
    </div>
  );
}
