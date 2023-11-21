import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public hasTodo$ : Observable<boolean> | undefined;

  constructor(private todoService: TodoService){}
  ngOnInit(): void {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map(length => length > 0));
  }
  
}
