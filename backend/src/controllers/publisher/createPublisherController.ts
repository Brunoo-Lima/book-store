import { Request, Response } from "express";
import { CreatePublisherService } from "../../services/publisher/createPublisherService";

class CreatePublisherController {
    async handle(req: Request, res: Response) {
        const { name } = req.body;

        const createPublisherService = new CreatePublisherService();

        const createPublisher = await createPublisherService.execute({ name });

        return res.json(createPublisher);
    }
}

export { CreatePublisherController };
