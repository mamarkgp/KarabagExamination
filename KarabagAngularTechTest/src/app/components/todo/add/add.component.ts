import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { ModeEnum } from 'src/app/enums/mode.enum';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  @Input() id = 0;
  @Output() updatedTodoList = new EventEmitter<Todo>();

  destroy$ = new Subject();

  modes = ModeEnum;
  mode = ModeEnum.Add;

  todoFormGroup!: FormGroup;

  constructor(
    private readonly _todoService: TodoService,
    private readonly _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    // TODO: can create a class where form building happens
    this.todoFormGroup = this._formBuilder.group(
      {
        id: new FormControl({ value: this.id, disabled: true }, [Validators.required]),
        label: new FormControl({ value: '', disabled: false }, [Validators.required]),
        description: new FormControl({ value: '', disabled: false }, [Validators.required]),
        category: new FormControl({ value: 'house', disabled: false }),
        endDate: new FormControl({ value: '', disabled: false })
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  OnUpdatedTodoList($event: Todo): void {
    this.updatedTodoList.emit($event);
  }
}
