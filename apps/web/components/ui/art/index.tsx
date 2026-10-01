import type { ArtProps } from "./types";
import { AccessoryArt } from "./AccessoryArt";
import { BoxArt } from "./BoxArt";
import { BubbleArt } from "./BubbleArt";
import { FilmArt } from "./FilmArt";
import { FoamArt } from "./FoamArt";
import {
  AutomotiveArt,
  ElectronicsArt,
  EngineeringArt,
  FoodArt,
  LogisticsArt,
  PharmaArt,
} from "./IndustryArt";
import { FactoryArt, TruckArt, WarehouseArt, QualityArt, CustomDesignArt } from "./SceneArt";

export type { ArtProps } from "./types";
export { BoxArt, FoamArt, BubbleArt, FilmArt, AccessoryArt, AutomotiveArt, ElectronicsArt, EngineeringArt, FoodArt, LogisticsArt, PharmaArt, FactoryArt, TruckArt, WarehouseArt, QualityArt, CustomDesignArt };

/** Picks the illustration for a product category icon key. */
export function ProductArt({ iconKey, ...props }: ArtProps & { iconKey: string }): JSX.Element {
  switch (iconKey) {
    case "foam":
      return <FoamArt {...props} />;
    case "bubble":
      return <BubbleArt {...props} />;
    case "film":
      return <FilmArt {...props} />;
    case "accessories":
      return <AccessoryArt {...props} />;
    case "box":
    default:
      return <BoxArt {...props} />;
  }
}

/** Picks the illustration for an industry icon key. */
export function IndustryArtwork({ iconKey, ...props }: ArtProps & { iconKey: string }): JSX.Element {
  switch (iconKey) {
    case "car":
      return <AutomotiveArt {...props} />;
    case "engineering":
      return <EngineeringArt {...props} />;
    case "electronics":
      return <ElectronicsArt {...props} />;
    case "pharma":
      return <PharmaArt {...props} />;
    case "food":
      return <FoodArt {...props} />;
    case "logistics":
    default:
      return <LogisticsArt {...props} />;
  }
}
