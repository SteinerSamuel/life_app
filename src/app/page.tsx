import Image from "next/image";
import Timer from "../components/timer"

export default function Home() {
  return (
    <div className=""> 
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Timer />
      </div>
    </div>
  );
}
