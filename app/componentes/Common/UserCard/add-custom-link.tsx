"use client";
import { Plus, PlusCircle, Trash } from "lucide-react";
import Modal from "../../ui/Modal";
import { startTransition, useState } from "react";
import TextInput from "../../ui/TextInput";
import Button from "../../ui/Button";
import { useParams, useRouter } from "next/navigation";
import addCustomLinks from "@/app/actions/add-custom-links";
import { CustomLinkSchema, ICustomLinkSchema } from "@/app/validations/CustomLinkSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
export default function AddCustomLink() {
  const router = useRouter();
  const { profileId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingCustomLinks, setIsSavingCustomLinks] = useState(false);

  const { register, handleSubmit, control, formState: { errors } } = useForm<ICustomLinkSchema>({
    resolver: yupResolver(CustomLinkSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "link",
  });
  if (fields.length === 0) {
    append({ title: "", url: "" });
  }
  const handleSaveCustomLinks = async (formData: ICustomLinkSchema) => {
    setIsSavingCustomLinks(true);
    if (!profileId) return;
    await addCustomLinks({
      profileId: profileId as string,
      link1: formData.link ? formData.link[0] : { title: "", url: "" },
      link2: formData.link ? formData.link[1] : { title: "", url: "" },
      link3: formData.link ? formData.link[2] : { title: "", url: "" },
    });
    startTransition(() => {
      setIsModalOpen(false);
      setIsSavingCustomLinks(false);
      router.refresh();
    });
  };
  const onSubmit: SubmitHandler<ICustomLinkSchema> = (data) => {
    console.log(data);
    handleSaveCustomLinks(data);
  }
  return (
    <>
    <div className="align-center flex w-full justify-center">
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
        >
        <Plus />
      </button>
        </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-background-primary flex w-[514px] flex-col justify-between gap-10 rounded-[20px] p-8">
          <p className="text-xl font-bold text-white">
            Adicionar links personalizados
          </p>
          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="flex w-full gap-2">
                  <TextInput
                    type="text"
                    placeholder="Digite o título"
                    {...register(`link.${index}.title`)}
                  />
                  <TextInput
                    type="text"
                    placeholder="Inserir URL"
                    {...register(`link.${index}.url`)}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {fields.length < 3 && (<button type="button" onClick={() => append({ title: "", url: "" })}>
            <PlusCircle />
          </button>)}
          {errors.link && (<span className="text-xs text-red-500">{errors.link?.message}</span>)}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button
              type="submit"
              disabled={isSavingCustomLinks}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
