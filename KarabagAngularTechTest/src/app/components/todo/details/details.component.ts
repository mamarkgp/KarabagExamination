import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { ModeEnum } from 'src/app/enums/mode.enum';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  _todo!: Todo;
  get todo(): Todo {
    return this._todo;
  }
  @Input() set todo(value: Todo) {
    this._todo = value;

    // TODO: can create a class where form building happens
    this.todoFormGroup = this._formBuilder.group(
      {
        id: new FormControl({ value: null, disabled: true }, [Validators.required]),
        label: new FormControl({ value: null, disabled: false }, [Validators.required]),
        description: new FormControl({ value: null, disabled: false }, [Validators.required]),
        category: new FormControl({ value: null, disabled: false }),
        endDate: new FormControl({ value: null, disabled: false })
      });

    this.todoFormGroup.patchValue(value)
  }
  @Output() updatedTodoList = new EventEmitter<Todo>();

  destroy$ = new Subject();

  modes = ModeEnum;
  mode = ModeEnum.Details;

  todoFormGroup!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  OnUpdatedTodoList($event: Todo): void {
    this.updatedTodoList.emit($event);
  }
}
