import { Injectable } from '@angular/core';
import { TodoItem } from "src/app/interfaces/todo-item/todo-item";
import { TodoItemState } from 'src/app/interfaces/todo-item/todo-item-state';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { v4 as uuidv4 } from "uuid";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  itemsObserver: BehaviorSubject<TodoItem[]> = new BehaviorSubject(<TodoItem[]>[]);

  private getAllUrl = 'https://fhb-todo-backend.fhbstudent.workers.dev/todo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private dataservice: DataService,  private http: HttpClient) {}


  getItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.getAllUrl)
  }
  
  createOrPutItem(updatedItem: TodoItem): Observable<any> {
    return this.http.put(this.getAllUrl, updatedItem, this.httpOptions);
}

  getNewItem() {
    let item: TodoItem = {
      id: uuidv4(),
      name: "New Todo",
      description: "Description of the Todo",
      created: new Date().toUTCString(),
      state: TodoItemState.Open,
    }

    return item;
  }

  deleteItem(deleteItem: TodoItem): Observable<any>{
      const url = `${this.getAllUrl}/${deleteItem.id}`;
      return this.http.delete(url, this.httpOptions);
  }
}
