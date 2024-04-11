import Book from "./Book";
import User from "./User";

export interface LogsChangeProps{
    logs: [
        change:{
            productAltered: Book;
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
