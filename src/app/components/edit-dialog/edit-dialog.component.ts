import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TodoItem } from 'src/app/interfaces/todo-item/todo-item';
import { TodoItemState } from 'src/app/interfaces/todo-item/todo-item-state';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  itemState = TodoItemState;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
}
