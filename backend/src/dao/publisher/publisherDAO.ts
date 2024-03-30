import { prisma } from "../../prisma/prismaClient";

interface PublisherData {
    name: string;
}

class PublisherDAO {
    async createPublisher({ name }: PublisherData) {
        return prisma.publisher.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true,
            },
        });
    }

    async findFirstPublisher({ name }: PublisherData) {
        return prisma.publisher.findFirst({
            where: {
                name: name,
            },
        });
    }
}

export default PublisherDAO;
