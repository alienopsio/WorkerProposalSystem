"use client";
import { planets } from "@/app/common/constants/planets.constant";
import { useAuth } from "@/app/hook/useAuth";
import { usePlanet } from "@/app/hook/usePlanet";
import { useEffect } from "react";

export interface SelectPlanetOptions {
  type?: string;
}

export const SelectPlanets = ({ type }: SelectPlanetOptions) => {
  const { planet, set } = usePlanet();
  const { activeUserData } = useAuth();

  const planetValue = planet?.key || "eyeke";
  const isButton = type === "button";

  useEffect(() => {
    const savedPlanet = localStorage.getItem("planet");
    if (activeUserData?.actor && planet && !savedPlanet) {
      localStorage.setItem("planet", planet.key);
    }
  }, [planet, activeUserData]);

  return (
    <select
      value={planetValue}
      className={`border-[1.75px] uppercase text-2xs font-bold mt-1 border-solid align-middle border-white px-5 w-full ${
        isButton ? "h-[50px] w-[188px]" : "h-8"
      }  bg-transparent text-center`}
      onChange={(e) => set(e.target.value)}
    >
      {planets.map((planet) => (
        <option key={planet.key} value={planet.key} className="bg-black">
          {planet.key === "nerix" ? "neri" : planet.name}
        </option>
      ))}
    </select>
  );
};
