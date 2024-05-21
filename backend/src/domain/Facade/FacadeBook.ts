import Book from "../Book";
import Facade from "./Facade";

export default class FacadeBook extends Facade {
    constructor(book: Book){
        super(book);
    }
    find(book: Book): Object {

    }
}
