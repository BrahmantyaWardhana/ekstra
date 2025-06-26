import Navbar from "~/components/Navbar";
import RotatingBackground from "~/components/RotatingBackground";
import SearchBar from "~/components/SearchBar";
import background1 from "~/assets/background1.jpg";
import background2 from "~/assets/background2.jpg";
import background3 from "~/assets/background3.jpg";


function HomePage() {
  const backgroundImages = [
    background1,
    background2,
    background3,
  ];

  return (
    <>
      <div className="bg-slate-950">
        <Navbar />
        
        {/* Main content area */}
        <div className="flex min-h-[calc(100vh)] pt-24">
          {/* Left Column with Gradient */}
          <div className="relative w-2/3">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_30%_40%,#3e3e3e,transparent)] opacity-80"></div>
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-white">
              <h1 className="text-4xl font-bold mb-6">Left Column</h1>
              <SearchBar />
            </div>
          </div>

          {/* Right Column*/}
          <div className="w-1/3 bg-white">
            <RotatingBackground images={backgroundImages} interval={4500} />
          </div>
        </div>
        {/*Footer goes here*/}
      </div>
    </>
  );
}

export default HomePage;