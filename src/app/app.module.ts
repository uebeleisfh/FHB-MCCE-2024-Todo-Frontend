import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    SettingsComponent,
    EditDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,  
    MatSnackBarModule,
    ScrollingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: TodoListComponent },
      { path: 'todos', component: TodoListComponent },
      { path: 'settings', component: SettingsComponent },
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
