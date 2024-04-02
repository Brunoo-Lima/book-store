import PublisherDAO from "./../../dao/publisher/publisherDAO";

interface PublisherData {
    pub_name: string;
}

class CreatePublisherService {
    async execute({ pub_name }: PublisherData) {
        const publisherDao = new PublisherDAO();

        const publisherAlreadyExists = await publisherDao.findFirstPublisher({
            pub_name,
        });

        if (publisherAlreadyExists)
            throw new Error("Publisher already exists!");

        const publisher = await publisherDao.createPublisher({ pub_name });

        return { publisher };
    }
}

export { CreatePublisherService };
