import * as yup from "yup";

export type ICreateProjectSchema = yup.InferType<typeof CreateProjectSchema>;

export const CreateProjectSchema = yup.object({
  projectName: yup.string().required("Nome do projeto é obrigatório"),
  projectDescription: yup.string().required("Descrição do projeto é obrigatória"),
  projectUrl: yup.string().required("URL do projeto é obrigatória"),
});
