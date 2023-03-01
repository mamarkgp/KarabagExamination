import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject, takeUntil, pipe } from 'rxjs';

import { ModeEnum } from '../../../enums/mode.enum';
import { FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() mode: number = 1;
  @Input() todoFormGroup!: FormGroup;
  @Output() updatedTodoList = new EventEmitter<Todo>();

  destroy$ = new Subject();
  modes = ModeEnum;

  today = new Date();

  categories = ['house', 'bureaucracy'];

  constructor(private readonly _todoService: TodoService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  OnSubmit(): void {
    const todoRawVal = this.todoFormGroup.getRawValue();
    if (this.mode === ModeEnum.Add) {
      this._todoService.addTodo(todoRawVal)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.updatedTodoList.emit(todoRawVal);
          },
          err => {
            console.error(err);
          },
          () => {
            let newTodoVal = todoRawVal;
            newTodoVal.id += 1;
            newTodoVal.label = '';
            newTodoVal.description = '';
            newTodoVal.category = 'house';
            newTodoVal.endDate = this.today;

            this.todoFormGroup.patchValue(newTodoVal);
          }
        )
    } else {
      this._todoService.editTodo(todoRawVal)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.updatedTodoList.emit(todoRawVal);
          },
          err => {
            console.error(err);
          },
          () => {
            this.todoFormGroup.reset();
          }
        )
    }
  }
}
