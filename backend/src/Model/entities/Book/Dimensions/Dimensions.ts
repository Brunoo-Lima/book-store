import { EntityDomain } from "../../EntityDomain";

export interface DimensionProps {
  height: number;
  width: number;
  weight: number;
  depth: number;
}

export class Dimensions extends EntityDomain {
  constructor(private dimensionsProps: DimensionProps) {
    super();
  }

  // Getters
  get height(): number {
    return this.dimensionsProps.height;
  }

  get width(): number {
    return this.dimensionsProps.width;
  }

  get weight(): number {
    return this.dimensionsProps.weight;
  }

  get depth(): number {
    return this.dimensionsProps.depth;
  }

  // Setters
  set height(value: number) {
    this.dimensionsProps.height = value;
  }

  set width(value: number) {
    this.dimensionsProps.width = value;
  }

  set weight(value: number) {
    this.dimensionsProps.weight = value;
  }

  set depth(value: number) {
    this.dimensionsProps.depth = value;
  }
}
