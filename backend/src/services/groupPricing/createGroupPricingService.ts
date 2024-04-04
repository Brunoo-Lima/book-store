import { GroupPricingDAO } from "../../dao/groupPricing/groupPricingDAO";
import { GroupPricingDomain } from "../../domain/GroupPricingDomain";

class CreateGroupPricingService {
    async execute(groupData: GroupPricingDomain) {
        const groupDAO = new GroupPricingDAO();

        const groupsAlreadyExists = await groupDAO.findFirstGroups();

        if (!groupsAlreadyExists) throw new Error("Name already exists!");

        const groups = await groupDAO.createGroups(groupData);

        return { groups };
    }
}

export { CreateGroupPricingService };
