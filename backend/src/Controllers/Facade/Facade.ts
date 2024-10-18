/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityDomain } from "../../Model/domain/EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../Config/Database/DAO/FactoryDao";
import { EntityExistInDB } from "../../Model/Business/EntityExistInDB";
import { ValidPassword } from "../../Model/Business/ValidPassword";
import { ValidAddressesToCreate } from "../../Model/Business/ValidAddressesToCreate";
import { ValidDataClient } from "../../Model/Business/ValidDataClient";
import { ValidDataToUpdate } from "../../Model/Business/ValidDataToUpdate";
import { ValidCreditCard } from "../../Model/Business/ValidCreditCard";
import { ValidProductsInStock } from "../../Model/Business/ValidProductsInStock";
import { ValidCPF } from "../../Model/Business/ValidCPF";

export class Facade implements IFacade {
    private businessRoles: Map<string, IStrategy[]>;
    private daos: Map<string, IDao>;
    private entity: EntityDomain | undefined;

    constructor() {
        this.businessRoles = new Map<string, IStrategy[]>();
        this.daos = new Map<string, IDao>();
        this.setStrategies();
    }

    async create(entity: EntityDomain): Promise<unknown> {
        try {
            this.entity = entity
            const strategies = await this.getStrategies(
                this.entity.constructor.name
            );

            if (strategies) {
                for (const strategy of strategies) {
                    const hasErrors = await strategy;
                    if ("error" in hasErrors) {
                        return hasErrors;
                    }
                }
            }
            const dao = this.fillDao(this.entity.constructor.name);
            const entityCreated = await dao.create(this.entity);
            return entityCreated;
        } catch (e) {
            return {
                error: e,
            };
        }
    }
    async update(entity: EntityDomain): Promise<unknown> {
        try {
            this.entity = entity
            const strategies = await this.getStrategies(
                `U${this.entity.constructor.name}`
            );
            if (strategies) {
                for (const strategy of strategies) {
                    const hasErrors = await strategy;
                    if ("error" in hasErrors) {
                        return hasErrors;
                    }
                }
            }
            const dao = this.fillDao(this.entity.constructor.name);
            const entityResearched = await dao.update(this.entity);
            return entityResearched;
        } catch (e) {
            return {
                error: e,
            };
        }
    }
    delete(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    async find(entity: EntityDomain): Promise<unknown> {
        try {
            this.entity = entity
            const dao = this.fillDao(this.entity.constructor.name);
            const entityResearched = await dao.find(this.entity);
            return entityResearched;
        } catch (e) {
            return {
                error: e,
            };
        }
    }
    async findMany(entity: EntityDomain): Promise<unknown> {
        try {
            this.entity = entity
            const dao = this.fillDao(this.entity.constructor.name);
            const entities = await dao.findMany(this.entity);
            return entities;
        } catch (e) {
            return {
                error: e,
            };
        }
    }
    private fillDao(name: string): IDao {
        const daoExist = this.daos.get(name.toUpperCase().trim());

        if (daoExist) return daoExist;
        const dao = FactoryDao.createDao(name.toUpperCase().trim());

        this.daos.set(name.toUpperCase(), dao);

        return dao;
    }
    private setStrategies(): void {
        this.businessRoles.set("CLIENT", [
            new EntityExistInDB(),
            new ValidPassword(),
            new ValidCreditCard(),
            new ValidAddressesToCreate(),
            new ValidDataClient(),
            new ValidCPF()
        ]);
        this.businessRoles.set("UCLIENT", [new ValidDataToUpdate()]);
        this.businessRoles.set("USER", [
            new EntityExistInDB(),
            new ValidPassword(),
        ]);
        this.businessRoles.set("SALES", [
            new EntityExistInDB(),
            new ValidProductsInStock(),
        ]);
        this.businessRoles.set("PRODUCT", [new EntityExistInDB()]);
        this.businessRoles.set("ADDRESS", [
            new EntityExistInDB()
        ])
    }
    private async getStrategies(key: string) {
        const strategies = this.businessRoles.get(key.toUpperCase());
        if (strategies) {
            const hasError = [];
            for (const strategy of strategies) {
                hasError.push(strategy.process(this.entity as EntityDomain));
            }
            return hasError;
        }
        return null;
    }
}
