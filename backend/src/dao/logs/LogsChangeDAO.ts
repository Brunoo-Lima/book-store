import { prisma } from "../../prisma/prismaClient";

interface LogsChange {
    change: {
        user_id: string,
        product_id: string,
        description: string,
    }
}
export default class LogsChangeDao {
    public static async createLogs (logs: LogsChange) {
        const { product_id, user_id, description } = logs.change
        return await prisma.logsChange.create({
            data: {
                fk_log_boo_code: product_id,
                fk_log_use_id: user_id,
                log_description: description,
            },
            select: {
                log_id: true,
                log_description: true,
                log_boo_code: true,
                log_use_id: true,
                created_at: true,
                updated_at: true,
            }
        })
    }
    public static async findFirstLog(log: LogsChange){
        return await prisma.logsChange.findFirst({
            where: {
                fk_log_boo_code: log.change.product_id,
                fk_log_use_id: log.change.user_id
            }
        })
    }
}
