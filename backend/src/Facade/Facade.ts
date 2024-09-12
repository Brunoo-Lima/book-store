/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityDomain } from "../domain/EntityDomain";
import { IDao } from "../database/DAO/IDao";
import { IFacade } from "../interfaces/IFacade";
import { IStrategy } from "../interfaces/IStrategy";
import { ValidCPF } from "../Validations/ValidCPF";

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
    create(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(entity: EntityDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    private setStrategies(): void{
        this.businessRolesClientSave.set(
            this.entity.constructor.name,
            [
                new ValidCPF()
            ]
        )
    }
}
