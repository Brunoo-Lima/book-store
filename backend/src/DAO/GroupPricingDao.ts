import EntityDomain from "../domain/EntityDomain";
import { GroupPricing } from "../domain/GroupPricing";
import { IDao } from "../interfaces/IDao";
import { prisma } from "../prisma/prismaClient";

export class GroupPricingDao implements IDao {
    async create(groupPricing: GroupPricing): Promise<Object | null> {
        return await prisma.group_Pricing.create({
            data: {
                grp_type: groupPricing.getTypePricing(),
                grp_percent: groupPricing.getPercentPrice(),
                created_at: new Date(groupPricing.dateCreate),
                updated_at: new Date(groupPricing.dateUpdate),
            }
        })
    }
    update(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }
    async find(groupPricing: GroupPricing): Promise<Object | null> {
        return await prisma.group_Pricing.findFirst({
            where: {
                grp_type: groupPricing.getTypePricing(),
            }
        })
    }
    inactivate(entity: EntityDomain): Promise<Object | null> {
        throw new Error("Method not implemented.");
    }

}
