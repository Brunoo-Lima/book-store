import { GroupPricingDomain } from "../../domain/GroupPricingDomain";
import { prisma } from "../../prisma/prismaClient";

class GroupPricingDAO {
    async createGroups(groupData: GroupPricingDomain) {
        return prisma.groupPricing.create({
            data: {
                grp_type_pricing: groupData.grp_type_pricing,
                grp_max_pricing: groupData.grp_max_pricing,
                grp_min_pricing: groupData.grp_min_pricing,
            },
            select: {
                grp_id: true,
                grp_type_pricing: true,
                grp_max_pricing: true,
                grp_min_pricing: true,
            },
        });
    }

    async findFirstGroups() {
        return prisma.groupPricing.findFirst();
    }
}

export { GroupPricingDAO };
