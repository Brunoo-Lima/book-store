import { EntityDomain } from "../../EntityDomain";

export interface PublisherProps {
    name: string
}

export class Publisher extends EntityDomain {
    constructor(private publisherProps: PublisherProps){
        super()
    }

    public set name(name : string) {
        this.publisherProps.name = name;
    }

    public get name(): string {
       return this.publisherProps.name
    }

}
