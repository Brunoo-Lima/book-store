
export default class Publisher{
    constructor(private publisherName: string){}

    public get name() : string {
        return this.publisherName;
    }

}
