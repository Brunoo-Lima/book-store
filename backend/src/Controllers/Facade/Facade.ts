
import { EntityDomain } from "../../Model/domain/EntityDomain";
import { IDao } from "../../interfaces/IDao";
import { IFacade } from "../../interfaces/IFacade";
import { IStrategy } from "../../interfaces/IStrategy";
import { FactoryDao } from "../../Config/Database/DAO/FactoryDao";
import { EntityExistInDB } from "../../Model/Business/EntityExistInDB";
import { ValidPassword } from "../../Model/Business/ValidPassword";
import { ValidAddresses } from "../../Model/Business/ValidAddresses";
import { ValidDataClient } from "../../Model/Business/ValidDataClient";
import { ValidDataToUpdate } from "../../Model/Business/ValidDataToUpdate";
import { ValidCreditCard } from "../../Model/Business/ValidCreditCard";

export class Facade implements IFacade{
    private businessRoles:  Map<string, IStrategy[]>
    private daos: Map<string, IDao>

    constructor(
        private entity: EntityDomain
    ){
        this.businessRoles = new  Map<string, IStrategy[]>
        this.daos = new Map<string, IDao>
        this.setStrategies()
    }

    async create(): Promise<unknown> {
        try{
            const strategies = await this.getStrategies(this.entity.constructor.name)

            if(strategies){
                for(const strategy of strategies){
                    const hasErrors = await strategy
                    if('error' in hasErrors) {
                        return hasErrors
                    }
                }
            }
            const dao = this.fillDao(this.entity.constructor.name)
            const entityCreated = await dao.create(this.entity)
            return entityCreated
        } catch(e){
            return {
                "error": e
            }
        }
    }
    async update(): Promise<unknown> {
        try{
            const strategies = await this.getStrategies(`U${this.entity.constructor.name}`)
            if(strategies){
                for(const strategy of strategies){
                    const hasErrors = await strategy
                    if('error' in hasErrors) {
                        return hasErrors
                    }
                }
            }
            const dao = this.fillDao(this.entity.constructor.name)
            const entityResearched = await dao.update(this.entity)
            return entityResearched
        } catch(e){
            return {
                error: e
            }
        }
    }
    delete(): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    async find(): Promise<unknown> {
        try{
            const dao = this.fillDao(this.entity.constructor.name)
            const entityResearched = await dao.find(this.entity)
            return entityResearched
        } catch(e){
            return {
                error: e
            }
        }
    }
    async findMany(): Promise<unknown> {
        try{
            const dao = this.fillDao(this.entity.constructor.name)
            const entities = await dao.findMany(this.entity)
            return entities
        } catch(e){
            return {
                error: e
            }
        }
    }
    private fillDao(name: string): IDao {
        const daoExist = this.daos.get(name.toUpperCase().trim());

        if (daoExist) return daoExist;
        const dao = FactoryDao.createDao(name.toUpperCase().trim());

        this.daos.set(name.toUpperCase(), dao);

        return dao;
    }
    private setStrategies(): void{
        this.businessRoles.set(
            "CLIENT",
            [
                new EntityExistInDB(),
                new ValidPassword(),
                new ValidCreditCard(),
                new ValidAddresses(),
                new ValidDataClient()
            ]
        )
        this.businessRoles.set(
            "UCLIENT",
            [
                new ValidDataToUpdate(),
            ]
        )
        this.businessRoles.set(
            "USER",
            [
                new EntityExistInDB(),
                new ValidPassword()
            ]
        )

    }
    private async getStrategies(key: string) {
        const strategies = this.businessRoles.get(key.toUpperCase())
        if(strategies){
            const hasError = []
            for(const strategy of strategies){
               hasError.push(strategy.process(this.entity))
            }
            return hasError
        }
        return null
    }
}
