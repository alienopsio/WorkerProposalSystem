"use client";

import { useContext } from "react";
import { PlanetContext } from "../context/PlanetContext";

export const usePlanet = () => {
  const context = useContext(PlanetContext);
  const { planet, set } = context;
  const planetName = planet?.name ?? "eyeke";
  return { planet, planetName, set };
};
