"use client";
import Image from "next/image";
import Cashout from "../img/Cashout.png";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          background:
            "linear-gradient(to bottom right, #60269E 0%, #435ABB 12%, #18AAE7 30%, #03CFFC 39%, #B977FF 77%, #6508C9 100%)",
        }}
      ></div>

      <div className="relative sm:grid sm:grid-cols-2 h-full z-10">
        <div className="flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
          <h1 className="text-4xl font-bold ">Payments made easy</h1>
          <h1 className="text-4xl font-bold mb-4">
            on{" "}
            <span
              style={{
                background:
                  "linear-gradient(to bottom right, #60269E 0%, #03CFFC 35%, #B977FF 77%, #6508C9 100%)",
                WebkitBackgroundClip: "text", // For Safari
                WebkitTextFillColor: "transparent", // For Safari
              }}
            >
              EASY PAY
            </span>
          </h1>
          <h2 className="text-lg mb-6">
            A platform for accepting and making payments
          </h2>
          <button
            className="border rounded-3xl w-32 h-10 text-white"
            style={{
              background:
                "linear-gradient(to bottom right, #B977FF 0%, #60269E 100%)",
            }}
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Get Started
          </button>
        </div>
        <div className="flex justify-center items-center p-8 md:p-16 lg:p-24">
          <Image
            className="w-[700px] h-[350px] object-contain"
            src={Cashout}
            alt="Cashout"
          />
        </div>
      </div>
    </div>
  );
}
