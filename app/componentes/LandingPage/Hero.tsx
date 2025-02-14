import ProjectCard from "../Common/ProjectCard"
import TotalVisits from "../Common/TotalVisits"
import UserCard from "../Common/UserCard/UserCard"
import CreateNow from "../ui/CreateNow"

export default function Hero() {
  return (
    <div className="flex h-screen">
    <div className="mt-[35vh] flex w-full flex-col gap-2">
      <h1 className="text-5xl font-bold leading-[64px] text-white">
        Seus projetos e redes sociais em um único link
      </h1>
      <h2 className="text-xl leading-6">
        Crie sua própria página de projetos e compartilhe eles com o mundo.
          <br />
          Acompanhe o engajamento com Analytics de cliques
        </h2>
        <CreateNow />
      </div>
      <div className="flex w-full items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB,transparent_55%)]">
        <div className="relative -bottom-[6%] -right-[5%]">
          <UserCard />
          <div className="absolute -bottom-[2%] -right-[45%]">
            <TotalVisits totalVisits={123}/>
          </div>
          <div className="absolute -left-[45%] top-[20%] -z-10">
            <ProjectCard project={{ projectName: "Projeto 2", projectDescription: "Descrição do projeto 2", id: '0', userId: '0', projectUrl: "https://example.com", imagePath: "/project1.jpg", createdAt: new Date().toISOString() }} img="/project2.jpg"/>
          </div>
          <div className="absolute -left-[55%] -top-[5%] -z-10">
            <ProjectCard project={{ projectName: "Projeto 2", projectDescription: "Descrição do projeto 2", id: '0', userId: '0', projectUrl: "https://example.com", imagePath: "/project1.jpg", createdAt: new Date().toISOString() }} img="/project1.jpg"/>
          </div>
        </div>
      </div>
    </div>
  )
}
