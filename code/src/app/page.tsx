import { redirect } from "next/navigation";
import Footer from "~/components/AppFooter";
import FeaturesInfo from "~/components/landingPage/FeaturesInfo";
import GeneralInformation from "~/components/landingPage/GeneralInformation";
import Hero from "~/components/landingPage/Hero";
import Pricing from "~/components/landingPage/Pricing";
import ServiceGuide from "~/components/landingPage/ServiceGuide";
import ServiceIntro from "~/components/landingPage/ServiceIntro";
import Navbar from "~/components/Navbar";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();
  if (session) redirect(`/user/home`);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-[calc(100vh)] pt-24">
        <main className="bg-white/70 text-black">
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
