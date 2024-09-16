/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityDomain } from "../domain/EntityDomain";
import { IDao } from "../database/DAO/IDao";
import { IFacade } from "../interfaces/IFacade";
import { IStrategy } from "../interfaces/IStrategy";
import { FactoryDao } from "../database/DAO/FactoryDao";
import { EntityExistInDB } from "../Validations/EntityExistInDB";

export class Facade implements IFacade{
    private businessRolesClientSave:  Map<string, IStrategy[]>
    private businessRoles = new  Map<string, IStrategy[]>
    private daos: Map<string, IDao>

    constructor(
        private entity: EntityDomain
    ){
        this.businessRolesClientSave = new  Map<string, IStrategy[]>
        this.businessRoles = new  Map<string, IStrategy[]>
        this.daos = new Map<string, IDao>
        this.setStrategies()
    }
    async create(entity: EntityDomain): Promise<unknown> {
        const hasError = (await this.getStrategies()).map((strategy) => {
            if ("error" in strategy) return strategy.error
        })
        if(hasError.length > 0) return hasError
        
        const dao = this.fillDao(entity)
        try{
            const entityCreated = await dao.create(entity)
            return entityCreated
        } catch(e){
            return {
                "error": e
            }
        }
    }
    update(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    delete(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    find(entity: EntityDomain): Promise<unknown> {
        throw new Error("Method not implemented.");
    }
    private fillDao(entity: EntityDomain): IDao {
        const { name } = entity.constructor;
        const daoExist = this.daos.get(name.toUpperCase().trim());

        if (daoExist) return daoExist;

        const dao = FactoryDao.createDao(name.toUpperCase().trim());

        this.daos.set(name.toUpperCase(), dao);

        return dao;
    }
    private setStrategies(): void{
        this.businessRoles.set(
            this.entity.constructor.name,
            [
                new EntityExistInDB()
            ]
        )
    }
    private async getStrategies(): Promise<object[]> {
        const name = this.entity.constructor.name
        const strategies = this.businessRoles.get(name)
        const messages = strategies?.map((strategy) => {
            return strategy.process(this.entity)
        }) as object[] // Força a tipagem, pois todas os métodos process retorna um objeto

        return messages
    }
}
