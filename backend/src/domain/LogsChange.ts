import Book from "./Book";
import User from "./User";

export interface LogsChangeProps {
    change:
    {
        productAltered: Book;
        user: User;
    }

}
export default class LogsChange {
    private logChangeProps: Array<LogsChangeProps> = []

    constructor(log: LogsChangeProps) {
        this.logChangeProps.push(log);
    }

    public get allLogs(){
        return this.logChangeProps;
    }

    public addLogChange(logChange: LogsChangeProps): void {
        this.logChangeProps.push(logChange)
    }
}
