/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createProject } from "@/app/actions/create-project";
import Button from "@/app/componentes/ui/Button";
import Modal from "@/app/componentes/ui/Modal";
import TextArea from "@/app/componentes/ui/TextArea";
import TextInput from "@/app/componentes/ui/TextInput";
import { compressFiles } from "@/app/lib/utils";
import { CreateProjectSchema, ICreateProjectSchema } from "@/app/validations/CreateProjectSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowUpFromLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
export default function NewProject({ profileId }: { profileId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ICreateProjectSchema>({
    resolver: yupResolver(CreateProjectSchema),
  })
  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }
  function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageURL = URL.createObjectURL(file);
      return imageURL;
    }
    return null;
  }
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  async function handleCreateProject(data: ICreateProjectSchema) {
    setIsCreatingProject(true);
    const imagesInput = document.getElementById(
      "imageInput"
    ) as HTMLInputElement;
    if (!imagesInput.files?.length) return;
    const compressedFile = await compressFiles(Array.from(imagesInput.files));
    const formData = new FormData();
    formData.append("file", compressedFile[0]);
    formData.append("profileId", profileId);
    formData.append("projectName", data.projectName);
    formData.append("projectDescription", data.projectDescription);
    formData.append("projectUrl", data.projectUrl);
    await createProject(formData);
    startTransition(() => {
      setIsOpen(false);
      setIsCreatingProject(false);
      setProjectImage(null);
      router.refresh();
    });
  }
  const onSubmit:SubmitHandler<ICreateProjectSchema> = async (data) => {
    handleCreateProject(data)
  }
  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-background-secondary border-border-secondary flex h-[132px] w-[340px] items-center justify-center gap-2 rounded-[20px] hover:border hover:border-dashed"
      >
        <Plus className="text-accent-green size-10" />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-background-primary flex flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="text-xl font-bold text-white">Novo projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="bg-background-tertiary h-[100px] w-[100px] overflow-hidden rounded-xl">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Project Image"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    className="w-full h-full"
                    onClick={() => triggerImageInput("imageInput")}
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput("imageInput")}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProjectImage(handleImageInput(e))}
              />
            </div>
            <div className="flex w-[293px] flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="font-bold text-white">
                  Titulo do projeto
                </label>
                <TextInput
                  id="project-name"
                  placeholder="Digite o nome do projeto"
                  {...register("projectName")}
                />
                {errors.projectName && (
                  <span className="text-accent-red">
                    {errors.projectName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="font-bold text-white"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="Dê uma breve descrição do seu projeto"
                  className="h-36"
                  {...register("projectDescription")}
                />
                {errors.projectDescription && (
                  <span className="text-accent-red">
                    {errors.projectDescription.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="font-bold text-white">
                  URL do projeto
                </label>
                <TextInput
                  type="url"
                  id="project-description"
                  placeholder="Digite a URL do projeto"
                  {...register("projectUrl")}
                />
                {errors.projectUrl && (
                  <span className="text-accent-red">
                    {errors.projectUrl.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="font-bold text-white">Voltar</button>
            <Button type="submit" disabled={isCreatingProject}>Salvar</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
