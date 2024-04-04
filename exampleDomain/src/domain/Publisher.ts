import { UUID } from "crypto";

export interface PublisherProps{
    pub_id: UUID;
    pub_name: string,
}
export default class Publisher{
    constructor(private publisherProps: PublisherProps){}
    
    public get id() : string {
        return this.publisherProps.pub_id;
    }
    
    public get name() : string {
        return this.publisherProps.pub_name;
    }
    
}