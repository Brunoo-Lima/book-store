import GroupPricingDomain from "../../domain/GroupPricing";
import { prisma } from "../../prisma/prismaClient";

class GroupPricingDAO {
    public async createGroups(groupData: GroupPricingDomain) {
        const groupExist = await this.findFirstGroup(groupData)
        if(groupExist) return groupExist;
        return prisma.groupPricing.create({
            data: {
                grp_type_pricing: groupData.typeGroupPricing
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
                grp_type_pricing: groupData.typeGroupPricing,
            }
        });
    }
    public static async findGroupPricingId(groupData: GroupPricingDomain) {
        const groupPricing = await prisma.groupPricing.findFirst({
            where: {
                grp_type_pricing: groupData.typeGroupPricing,
            }
        })
        if(!groupPricing) throw new Error('Group Pricing do not exist !')
        return groupPricing.grp_id
    }
}

export { GroupPricingDAO };
