import Footer from "~/components/AppFooter";
import FeaturesInfo from "~/components/landingPage/FeaturesInfo";
import GeneralInformation from "~/components/landingPage/GeneralInformation";
import Hero from "~/components/landingPage/Hero";
import Pricing from "~/components/landingPage/Pricing";
import ServiceGuide from "~/components/landingPage/ServiceGuide";
import ServiceIntro from "~/components/landingPage/ServiceIntro";
import Navbar from "~/components/Navbar";

export const metadata = {
  title: "Ekstra — Memberships for Creators",
  description:
    "Build your creator page, post exclusive content, and earn from memberships. Ekstra makes it simple for creators and fun for fans.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh)] pt-24">
        <main className="bg-slate-300 text-black">
          {/* Hero */}
          <Hero />

          {/* Service Intro*/}
          <ServiceIntro />

          {/* Features Info */}
          <FeaturesInfo />

          {/* Service Guide */}
          <ServiceGuide />

          {/* Pricing */}
          <Pricing />

          {/* GeneralInformation */}
          <GeneralInformation />
        </main>
      </div>
      <Footer />
    </div>
  );
}
