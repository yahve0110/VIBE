import Sidebar from "@/components/Sidebar/Sidebar";
import Offer from "@/components/Offer/Offer";

export default function Home() {
  return (
    <div className="mt-24 flex justify-center w-full">
      {/* Sidebar on the left with fixed width */}

      {/* Main Content Container */}
      <div className="flex-1 max-w-[1200px] mx-auto grid grid-cols-1 gap-4 p-4 overflow-y-auto max-h-[600px]">
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
      </div>
    </div>
  );
}
