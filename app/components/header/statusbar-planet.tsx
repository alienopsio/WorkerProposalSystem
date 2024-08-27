/* eslint-disable @next/next/no-img-element */
"use client";

import { usePlanet } from "@/app/hook/usePlanet";
import { SelectPlanets } from "../content/select-planets";

export default function StatusBarPlanet() {
  const { planet } = usePlanet();
  const planetImage = planet?.image || "kavian.png";

  return (
    <div className="flex items-center w-full text-white mt-2">
      <div className="flex w-[70%] gap-5 items-center">
        <h2 className="font-extralight text-2xl">WORKER PROPOSALS</h2>
        <span className="text-3xl font-normal">|</span>
        <div
          className={`flex uppercase gap-3 text-2xl justify-center items-center font-semibold`}
        >
          <figure className={`relative w-8 h-8 `}>
            <img
              alt="planet-image"
              src={`/images/alien_worlds-planet-8bit-${planetImage}`}
              className="object-cover w-full h-full"
            />
          </figure>
          {!planet ? "eyeke" : planet.name}
        </div>
      </div>
      <div className="flex w-[30%]">
        <SelectPlanets />
      </div>
    </div>
  );
}
