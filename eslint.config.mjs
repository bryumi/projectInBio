import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Aplica as regras em arquivos JS/TS/JSX/TSX
    plugins: {
      tailwindcss, // Ativa o plugin do Tailwind
    },
    rules: {
      "tailwindcss/no-custom-classname": "off", // Permite classes customizadas junto com Tailwind
      "tailwindcss/classnames-order": "warn", // Sugere organização de classes
    },
    settings: {
      tailwindcss: {
        callees: ["classnames", "clsx"], // Funções de agrupamento de classes, se usadas
        config: "./tailwind.config.js",  // Caminho do arquivo de configuração do Tailwind
      },
    },
  },
];

export default eslintConfig;
