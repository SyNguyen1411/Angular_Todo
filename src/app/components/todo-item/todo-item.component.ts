import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input()
  todo!: Todo;

  @Output()
  changeCompleteEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() submitUpdateEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output() deleteTodoEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered= false;
  isEditing = false;

  constructor() {}
  changeCompleted(){
    this.changeCompleteEvent.emit({...this.todo, isComplete : !this.todo.isComplete});
  }

  submitUpdate(event: KeyboardEvent){
    const code = event.key;
    event.preventDefault();
    if(code === "Enter"){
      this.submitUpdateEvent.emit({...this.todo});
      this.isEditing = false;
    }
  }

  deleteTodo(){
    this.deleteTodoEvent.emit(this.todo);
  }
}
