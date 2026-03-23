import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "Prestations",
  description: "Découvrez toutes les prestations RosesNails.",
};

export default function PrestationsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-24">
        <Services />
      </main>
      <Footer />
    </>
  );
}
