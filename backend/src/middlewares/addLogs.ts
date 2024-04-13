import { Request, Response } from "express";
import LogsChangeDao from "../dao/logs/LogsChangeDAO";

export const addLogsChange = async (req: Request, res: Response) => {
    const { logsChange } = req.body;
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
