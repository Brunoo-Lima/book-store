import PublisherDAO from "./../../dao/publisher/publisherDAO";

interface PublisherData {
    name: string;
}

class CreatePublisherService {
    async execute({ name }: PublisherData) {
        const publisherDao = new PublisherDAO();

        const publisherAlreadyExists = await publisherDao.findFirstPublisher({
            name,
        });

        if (publisherAlreadyExists)
            throw new Error("Publisher already exists!");

        const publisher = await publisherDao.createPublisher({ name });

        return { publisher };
    }
}

export { CreatePublisherService };
