export default class User{
    constructor(private userName: string){}

    public get name() : string {
        return this.userName;
    }

}
