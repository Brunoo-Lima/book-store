import GroupPricingDomain from "../../domain/GroupPricing";
import { prisma } from "../../prisma/prismaClient";

class GroupPricingDAO {
    public async createGroups(groupData: GroupPricingDomain) {
        const groupExist = await this.findFirstGroup(groupData)
        if(groupExist) return groupExist;
        return prisma.groupPricing.create({
            data: {
                grp_type_pricing: groupData.typePricingIs
            },
            select: {
                grp_id: true,
                grp_type_pricing: true,
            },
        });
    }

    public async findFirstGroup(groupData: GroupPricingDomain) {
        return await prisma.groupPricing.findFirst({
            where: {
                grp_type_pricing: groupData.typePricingIs,
            }
        });
    }
    public static async createOrFindGroupPricingId(groupData: GroupPricingDomain) {
        const groupPricingExist = await prisma.groupPricing.findFirst({
            where: {
                grp_type_pricing: groupData.typePricingIs,
            }
        })
        if(groupPricingExist)return groupPricingExist.grp_id
        const newGroupPricing = await prisma.groupPricing.create({
            data: {
                grp_type_pricing: groupData.typePricingIs
            }
        })
        return newGroupPricing.grp_id;
    }
}

export { GroupPricingDAO };
