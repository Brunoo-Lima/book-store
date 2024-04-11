export default class ISBN{
    constructor(private value: string) {
        this.setValue(value);
    }
    private setValue(value: string){
        this.value = value;
        this.valid()
    }
}
