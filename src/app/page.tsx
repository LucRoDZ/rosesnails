import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Reviews } from "@/components/sections/Reviews";
import { Booking } from "@/components/sections/Booking";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyBookingCta } from "@/components/ui/StickyBookingCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Reviews />
        <Booking />
        <Faq />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <StickyBookingCta />
    </>
  );
}
