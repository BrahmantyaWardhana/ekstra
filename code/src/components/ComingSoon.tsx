"use client";

type ComingSoonProps = {
  title?: string;
  message?: string;
};

export default function ComingSoon({
  title = "Coming Soon 🚧",
  message = "This feature is currently under development. Stay tuned for updates!",
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4 p-8 rounded-xl bg-neutral-800 text-white">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-400 max-w-md">{message}</p>
      <div className="px-4 py-2 text-sm bg-white text-black rounded-lg cursor-not-allowed opacity-70">
        Coming Soon
      </div>
    </div>
  );
}
