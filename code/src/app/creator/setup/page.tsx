import RotatingBackground from "~/components/RotatingBackground";
import { getBackground } from "~/server/queries";

export default async function creatorSetup() {
  const backgroundImages = await getBackground();

  return (
    <>
      <div>
        {/* Main content */}
        <div className="flex min-h-[calc(100vh)] pt-24">
          {/* Left Column with Gradient */}
          <div className="relative w-full md:w-2/3">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_30%_40%,#3e3e3e,transparent)] opacity-80"></div>
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center p-8">
              <div className="max-w-md w-full border-3 border-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold mb-6">Create a name for your page</h1>
                <p>you can always change this later</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-1/3 bg-white hidden md:block">
            <RotatingBackground images={backgroundImages} interval={4500} />
          </div>
        </div>
      </div>
    </>
  )
}