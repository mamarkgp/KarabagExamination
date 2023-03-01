import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// components
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FormComponent } from './form/form.component';
import { TodoService } from 'src/app/services/todo.service';
import { TodoRoutingModule } from './todo-routing.module';

//3rd party lib
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    AddComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    TodoService
  ],
  exports: [
    TodoRoutingModule
  ]
})
export class TodoModule { }
