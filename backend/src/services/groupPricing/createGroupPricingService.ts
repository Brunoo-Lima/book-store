import { GroupPricingDAO } from "../../dao/groupPricing/groupPricingDAO";
import GroupPricingDomain from "../../domain/GroupPricing";

class CreateGroupPricingService {
    async execute(marginProfit: number) {
        const groupDAO = new GroupPricingDAO();
        const groupProfit = new GroupPricingDomain(marginProfit);
        const groupsAlreadyExists = await groupDAO.findFirstGroups();

        if (!groupsAlreadyExists) throw new Error("Name already exists!");

        const groups = await groupDAO.createGroups(groupProfit);

        return { groups };
    }
}

export { CreateGroupPricingService };
