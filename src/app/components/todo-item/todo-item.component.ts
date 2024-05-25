import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TodoItem } from '../../interfaces/todo-item/todo-item';
import { TodoItemState } from 'src/app/interfaces/todo-item/todo-item-state'; 
import { TodoService } from 'src/app/services/todo/todo.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})

export class TodoItemComponent {

  @Input() item!: TodoItem;
  @ViewChild("itemContainer") todoItemContainer!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}

  openEditDialog (): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        newItem: false,
        item: {...this.item} // make copy to avoid immediate data updates
    }});

    // subscribe to observable of dialog to update item in case the user hits save
    dialogRef.afterClosed().subscribe(item => {
      if (item) {
        this.showSnackBar("Updating Item...");
        this.todoService.createOrPutItem(item).subscribe({
          next: data => {
            this.showSnackBar("Item updated successfully. Please update the data using F5");
          },
          error: error => {
            this.showSnackBar("There was an error updating the item...");     
          }
      });
    }
  });
}

  openDeleteDialog (): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.item
    });

    // subscribe to observable of dialog to update item in case the user hits delete
    dialogRef.afterClosed().subscribe(deleteItem => {
      if (deleteItem) {
        this.showSnackBar("Deleting Item...");
        this.todoService.deleteItem(this.item).subscribe({
          next: data => {
            this.showSnackBar("Item delete successfully. Please update the data using F5");
          },
          error: error => {
            this.showSnackBar("There was an error deleting the item...");     
          }
      });
      }
    });
  }

  showSnackBar(message: string, panelClass: string = "info") {
    this.snackBar.open(message, undefined, { duration: 5000, panelClass: [panelClass] });
  }

  getStateText(): string {
    return TodoItemState[this.item.state];
  }
}
