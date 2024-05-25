import { TodoItem } from "src/app/interfaces/todo-item/todo-item";
import { TodoItemState } from "src/app/interfaces/todo-item/todo-item-state"; 
import { TodoItemOwner } from "src/app/interfaces/todo-item/todo-item-owner"; 
import { v4 as uuidv4 } from "uuid";

const owner : TodoItemOwner = {
    name: "Helmut Handela",
    email: "helmut.handela@gmx.at"
}

export const TODOS: TodoItem[] = [...Array(15).keys()].map((i) => {
    let item : TodoItem = {
        id: uuidv4(),
        name: `Todo ${i}`,
        description: `Description of Todo ${i}`,
        created: new Date().toUTCString(),
        state: TodoItemState.Open,
        owner: owner,
    }
    
    return item;
})