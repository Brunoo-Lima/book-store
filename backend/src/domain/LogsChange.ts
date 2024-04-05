import Product from "./Product";
import User from "./User";

export interface LogsChangeProps{
    logs: [
        change:{
            productAltered: Product;
            user:User;
        }
    ]
}
export default class LogsChange {

    constructor(private logChangeProps: LogsChangeProps){}

    public get logsChange() : Array<Object> {
        return { ...this.logChangeProps.logs }
    }

}
