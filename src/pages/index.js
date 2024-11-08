import { lazy } from "react";

export const Main = lazy(() => import("./Main.jsx").then((module) => ({ default: module.Main })));
export const Favorite = lazy(() => import("./Favorite.jsx").then((module) => ({ default: module.Favorite })));
export const Shop = lazy(() => import("./Shop.jsx").then((module) => ({ default: module.Shop })));
export const NotFound = lazy(() => import("./NotFound.jsx").then((module) => ({ default: module.NotFound })));
