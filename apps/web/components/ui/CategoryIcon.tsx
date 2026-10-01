import {
  BadgeCheck,
  Box,
  Boxes,
  Car,
  CircuitBoard,
  Factory,
  Film,
  Layers,
  Package,
  PackageOpen,
  Pill,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Warehouse,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Maps string keys from data files onto Lucide icons.
 * Note: the icon named `Infinity` is deliberately never imported anywhere in this project —
 * it shadows the global and breaks Framer Motion's `repeat: Number.POSITIVE_INFINITY`.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  // Product categories
  box: Box,
  foam: Layers,
  bubble: Waves,
  film: Film,
  accessories: PackageOpen,
  // Industries
  car: Car,
  engineering: Factory,
  electronics: CircuitBoard,
  pharma: Pill,
  food: ShoppingCart,
  logistics: Truck,
  // Capabilities & Why-us
  factory: Factory,
  badge: BadgeCheck,
  truck: Truck,
  ruler: Ruler,
  shield: ShieldCheck,
  tag: Package,
  package: Package,
  warehouse: Warehouse,
  boxes: Boxes,
};

export interface CategoryIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
  /** Lucide icons inherit colour, so an accent works through currentColor. */
  color?: string;
  label?: string;
}

export function CategoryIcon({
  name,
  className,
  strokeWidth = 1.8,
  color,
  label,
}: CategoryIconProps): JSX.Element {
  const Icon = ICON_MAP[name] ?? Box;
  return (
    <Icon
      className={cn("h-6 w-6", className)}
      strokeWidth={strokeWidth}
      style={color ? { color } : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}

export function hasIcon(name: string): boolean {
  return name in ICON_MAP;
}
