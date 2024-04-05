export interface DimensionsProps{
    width: number;
    height: number;
    weight: number;
    depth: number;
}

export default class Dimensions{
    constructor(private dimensionsProps: DimensionsProps){}

    public get allDimensions() : Object {
        return { ...this.dimensionsProps }
    }

}
