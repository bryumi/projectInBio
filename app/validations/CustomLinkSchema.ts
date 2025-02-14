import * as yup from "yup";

export type ICustomLinkSchema = yup.InferType<typeof CustomLinkSchema>;

export const CustomLinkSchema = yup.object({
  link: yup.array().of(
    yup.object({
      title: yup.string().required("Título é obrigatório"),
      url: yup.string().required("URL é obrigatória"),
    })
  ).max(3, "Máximo de 3 links"),
});
