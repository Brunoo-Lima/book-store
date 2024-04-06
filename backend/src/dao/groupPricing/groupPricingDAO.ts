import GroupPricingDomain from "../../domain/GroupPricing";
import { prisma } from "../../prisma/prismaClient";

class GroupPricingDAO {
    async createGroups(groupData: GroupPricingDomain) {
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

    async findFirstGroups() {
        return prisma.groupPricing.findFirst();
    }
}

export { GroupPricingDAO };
