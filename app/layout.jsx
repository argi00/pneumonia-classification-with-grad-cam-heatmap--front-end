import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "PneumoScan — Détecteur de pneumonie à partir de radiographies pulmonaires",
  description:
    "Analyse de radiographies thoraciques alimentée par l'IA avec une interprétation basée sur Grad-CAM. Téléchargez une radiographie et obtenez instantanément une classification de la pneumonie accompagnée d'explications visuelles.",
  keywords: [
    "pneumonie",
    "radiographie thoracique",
    "IA",
    "imagerie médicale",
    "Grad-CAM",
  ],
};  

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
