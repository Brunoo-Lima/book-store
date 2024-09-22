
export interface IFacade {
    create(): Promise<unknown>
    update(): Promise<unknown>
    delete(): Promise<unknown>
    find(): Promise<unknown>
    findMany(): Promise<unknown>
}
