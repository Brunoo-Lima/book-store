/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityDomain } from "../domain/EntityDomain";
import { IDao } from "../database/DAO/IDao";
import { IFacade } from "../interfaces/IFacade";
import { IStrategy } from "../interfaces/IStrategy";
import { FactoryDao } from "../database/DAO/FactoryDao";
import { EntityExistInDB } from "./Business/EntityExistInDB";
import { ValidPassword } from "./Business/ValidPassword";
import { ValidAddresses } from "./Business/ValidAddresses";

export class Facade implements IFacade{
    private businessRolesClientSave:  Map<string, IStrategy[]>
    private daos: Map<string, IDao>

    constructor(
        private entity: EntityDomain
    ){
        this.businessRolesClientSave = new  Map<string, IStrategy[]>
        this.daos = new Map<string, IDao>
        this.setStrategies()
    }
    async create(): Promise<unknown> {
        try{
            const strategies = await this.getStrategies()

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
    update(): Promise<unknown> {
        throw new Error("Method not implemented.");
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
                "error": e
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
        this.businessRolesClientSave.set(
            this.entity.constructor.name,
            [
                new EntityExistInDB(),
                new ValidPassword(),
                new ValidAddresses()
            ]
        )
    }
    private async getStrategies() {
        const name = this.entity.constructor.name
        const strategies = this.businessRolesClientSave.get(name)
        if(strategies){
            const hasError = []
            for(const strategy of strategies){
               hasError.push(strategy.process(this.entity))
            }
            return hasError
        }
    }
}
