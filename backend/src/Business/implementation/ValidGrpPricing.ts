import { IStrategy } from "../../interfaces/IStrategy";
import Book from "../../domain/Book";
import { FactoryDao } from "../../DAO/FactoryDao";
import { Books, Group_Pricing } from "@prisma/client";

export class ValidGrpPricing implements IStrategy{
    private messageError: string | undefined;

    async process( book: Book ): Promise<void | string> {
        const { boo_group_pricing } = book;
        const { name } = book.constructor;

        const daoBook = FactoryDao.createDao(name);

        const bookExist = await daoBook.find(book.boo_group_pricing) as Books | null
        if(!bookExist) {
            this.messageError = "Book do not exist in database !"
            return this.messageError
        };
        const daoGroupPricing = FactoryDao.createDao(boo_group_pricing.constructor.name);
        const groupPricing = await daoGroupPricing.find(boo_group_pricing) as Group_Pricing;

        const price = book.boo_price_acquisition;
        const priceNew = (price * groupPricing.grp_percent);
        const priceOld = (bookExist.boo_price_acquisition * groupPricing.grp_percent);

        if(priceNew > priceOld) {
            this.messageError = 'Wrong, the price is actually higher than the price of this group'
            return this.messageError;
        }
    }
}
