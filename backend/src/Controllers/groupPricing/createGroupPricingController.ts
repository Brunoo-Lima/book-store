import { Request, Response } from "express";
import { CreateGroupPricingService } from "../../services/groupPricing/createGroupPricingService";

class CreateGroupPricingController {
    async handle(req: Request, res: Response) {
        const { grp_type_pricing, grp_max_pricing, grp_min_pricing } = req.body;

        const groupsService = new CreateGroupPricingService();

        const createGroups = await groupsService.execute({
            grp_type_pricing,
            grp_max_pricing,
            grp_min_pricing,
        });

        return res.json(createGroups);
    }
}

export { CreateGroupPricingController };
