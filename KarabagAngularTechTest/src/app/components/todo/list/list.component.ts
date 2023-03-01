import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, takeUntil } from 'rxjs';
import { ModeEnum } from 'src/app/enums/mode.enum';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  columns: string[] = ['id', 'label', 'description', 'category', 'endDate', 'actions'];
  todoList!: Todo[];
  destroy$ = new Subject();
  loading$ = new BehaviorSubject<boolean>(true);
  loadList$ = new Subject();

  modes = ModeEnum;
  mode = ModeEnum.Add;

  selectedTodo!: Todo;
  nextId = 0;

  constructor(private readonly _todoService: TodoService) {
  }

  ngOnInit(): void {
    this.loadList$.subscribe(() => {
      this._todoService.getTodoList()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (todoList: Todo[]) => {
            this.todoList = todoList;

            if (!this.todoList) return;

            const ids: number[] = this.todoList.map((todo: Todo) => todo.id);
            this.nextId = Math.max(...ids) + 1;

            let notExistingOnDB = false;
            while (!notExistingOnDB) {
              if (ids.includes(this.nextId)) {
                this.nextId += 1;
              } else {
                notExistingOnDB = true;
              }
            }
          },
          (error) => {
            //TODO: can display error on NG-MAT snackbar
            console.log(error);
          },
          () => {
            this.loading$.next(false);
          }
        );
    });

    this.loadList$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  showDetails(todo: Todo) {
    this.mode = ModeEnum.Details;
    this.selectedTodo = todo;
  }

  deleteTodo(todo: Todo): void {
    this._todoService.deleteTodo(todo)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loadList$.next(true);
        },
        error => {
          console.error(error);
        }
      )
  }

  OnUpdatedTodoList(): void {
    this.loadList$.next(true);
    this.mode = ModeEnum.Add;
  }
}
