import ProjectCard from "@/app/componentes/Common/ProjectCard";
import TotalVisits from "@/app/componentes/Common/TotalVisits";
import UserCard from "@/app/componentes/Common/UserCard/UserCard";
import { auth } from "@/app/lib/auth";
import { getProfileData, getProfileProjects } from "@/app/server/get-profile-data";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import NewProject from "./new-project";
import { getDownloadURLFromPath } from "@/app/lib/firebase";
import { increaseProfileVisits } from "@/app/actions/increase-profile-visits";
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  const profileData = await getProfileData(profileId);
  if (!profileData) return notFound();
  // TODO: get projects
  const projects = await getProfileProjects(profileId);

  const session = await auth();
  const isOwner = profileData.userId === session?.user?.id;

  if (!isOwner) {
    await increaseProfileVisits(profileId);
  }
  // Se o usuario não estiver mais no trial, nao deixar ver o projeto. Redirecionar para upgrade
  if (isOwner && !session?.user?.isSubscribed && !session?.user.isTrial) {
    redirect(`/${profileId}/upgrade`);
  }

  return (
    <div className="relative flex h-screen overflow-hidden p-20">
      {session?.user.isTrial && !session.user.isSubscribed && (
        <div className="bg-background-tertiary fixed left-0 top-0 flex w-full items-center justify-center gap-1 py-2">
          <span>Você está usando a versão trial.</span>
          <Link href={`/${profileId}/upgrade`}>
            <button className="text-accent-green font-bold">
              Faça o upgrade agora!
            </button>
          </Link>
        </div>
      )}
      <div className="flex h-min w-1/2 justify-center">
        <UserCard profileData={profileData} isOwner={isOwner} />
      </div>
      <div className="flex w-full flex-wrap content-start justify-center gap-4 overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={await getDownloadURLFromPath(project.imagePath) || ""}
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      {isOwner && (
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
          <TotalVisits totalVisits={profileData.totalVisits} showBar />
        </div>
      )}
    </div>
  );
}
