import { TodoItemOwner } from "./todo-item-owner";
import { TodoItemState } from "./todo-item-state";

export interface TodoItem {
    id: string;
    name: string;
    description: string;
    state: TodoItemState;
    owner?: TodoItemOwner;
    created: string;
    finished?: Date;
}
