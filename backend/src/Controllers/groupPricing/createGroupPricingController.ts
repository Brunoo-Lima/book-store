import { Request, Response } from "express";
import { CreateGroupPricingService } from "../../services/groupPricing/createGroupPricingService";

class CreateGroupPricingController {
    async handle(req: Request, res: Response) {
        const { marginProfit } = req.body

        const groupsService = new CreateGroupPricingService();

        const createGroups = await groupsService.execute(marginProfit)

        return res.json(createGroups);
    }
}

export { CreateGroupPricingController };
