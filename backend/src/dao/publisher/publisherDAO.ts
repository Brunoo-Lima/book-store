import { prisma } from "../../prisma/prismaClient";

export interface PublisherData {
    pub_name: string;
}

class PublisherDAO {
    async createPublisher({ pub_name }: PublisherData) {
        return prisma.publisher.create({
            data: {
                pub_name: pub_name,
            },
            select: {
                pub_id: true,
                pub_name: true,
            },
        });
    }

    async findFirstPublisher({ pub_name }: PublisherData) {
        return prisma.publisher.findFirst({
            where: {
                pub_name: pub_name,
            },
        });
    }
}

export default PublisherDAO;
