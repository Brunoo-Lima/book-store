import { Response } from "express";
import LogsChangeDao from "../dao/logs/LogsChangeDAO";
import { CustomRequest } from "../controllers/book/CreateBookController";

export const addLogsChange = async (req: CustomRequest, res: Response) => {
    const { logsChange } = req;
    if(!logsChange) return res.status(400).json('Error logs does not sent !');

    const {boo_id, userId, description} = logsChange;
    const log = await LogsChangeDao.createLogs({
        change: {
            product_id: boo_id,
            user_id: userId,
            description: description
        }
    });
    return res.json(log);
}
