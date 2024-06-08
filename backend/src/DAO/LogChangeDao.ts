import EntityDomain from "../domain/EntityDomain";
import { LogChange } from "../domain/LogChange";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export class LogChangeDao implements IDao {
    async create(log: LogChange): Promise<Object | null> {
        return await prisma.logs_Change.create({
            data: {
                log_type: log.getLogs().description,
                fk_log_use_id: log.getLogs().user.idEntity!,
                fk_log_boo_id: log.getLogs().entity.idEntity!
            }
        })
    }
    update(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    async find(log: LogChange): Promise<Object | null> {
        return await prisma.logs_Change.findUnique({
            where: {
                log_id: log.idEntity,
            }
        });
    }
    inactivate(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }

}
