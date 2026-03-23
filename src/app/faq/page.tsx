import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Retrouvez les réponses aux questions fréquentes RosesNails.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <Faq />
      </main>
      <Footer />
    </>
  );
}
