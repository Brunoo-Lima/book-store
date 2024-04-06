export interface DimensionsProps{
    width: number;
    height: number;
    weight: number;
    depth: number;
}

export default class Dimensions{
    constructor(private dimensionsProps: DimensionsProps){}

    public get width() : number {
        return this.dimensionsProps.width;
    }
    public get height() : number {
        return this.dimensionsProps.height;
    }
    public get weight() : number {
        return this.dimensionsProps.weight;
    }
    public get depth() : number {
        return this.dimensionsProps.depth;
    }
}
