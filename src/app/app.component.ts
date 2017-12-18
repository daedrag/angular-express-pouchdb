import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  todoDb: any;
  currentTodo: string;

  configDb: any;
  currentConfig: string;

  constructor() { }

  ngOnInit(): void {
    console.log(PouchDB);
    this.todoDb = new PouchDB('http://localhost:3000/db/todos/', {
      ajax: {
        withCredentials: false
      }
    });
    this.configDb = new PouchDB('localhost:3000/configs', {
      ajax: {
        withCredentials: false
      }
    });
    console.log(this.todoDb.adapter);

    this.todoDb.changes({
      since: 'now',
      live: true
    }).on('change', this.showTodos.bind(this));

    this.configDb.changes({
      since: 'now',
      live: true
    }).on('change', this.showConfigs.bind(this));

    this.showTodos('showing all todos..');
    this.showConfigs('showing all configs..');
  }

  addTodo() {
    if (!this.currentTodo) {
      return;
    }

    const todo = {
      _id: new Date().toISOString(),
      todo: this.currentTodo.slice(0)
    };
    this.todoDb.put(todo, (err, result) => {
      if (err) {
        console.error(err);
      }
    });
  }

  showTodos(change: any) {
    // console.log(change);
    this.todoDb.allDocs({include_docs: true, descending: true}, (err, doc) => {
      if (err) {
        console.error(err);
      }

      console.log(doc.rows.map(row => row.doc.todo));
    });
  }

  addConfig() {
    if (!this.currentConfig) {
      return;
    }

    const conf = {
      _id: new Date().toISOString(),
      config: this.currentConfig.slice(0)
    };
    this.configDb.put(conf, (err, result) => {
      if (err) {
        console.error(err);
      }
    });
  }

  showConfigs(change: any) {
    // console.log(change);
    this.configDb.allDocs({include_docs: true, descending: true}, (err, doc) => {
      if (err) {
        console.error(err);
      }

      console.log(doc.rows.map(row => row.doc.config));
    });
  }
}
