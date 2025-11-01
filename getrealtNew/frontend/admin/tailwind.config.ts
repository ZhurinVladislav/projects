import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, // Центрировать контейнер (margin: 0 auto)
      padding: {
        DEFAULT: "1rem", // Отступы по умолчанию
        sm: "2rem", // Отступы для малых экранов
        lg: "4rem", // Отступы для больших экранов
        xl: "5rem", // Отступы для очень больших экранов
      },
      screens: {
        sm: { max: "639px" }, // Мобильные
        md: { max: "767px" }, // Планшеты
        lg: "1024px", // Десктоп (min-width для контейнера)
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      // Дополнительные кастомные стили
      colors: {
        brand: {
          500: "#2563eb",
          600: "#1e40af",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
