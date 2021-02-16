import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  userById(id: number) {
    return this.dataStore.users.find(x => x.id ==id);
  }

  private _users: BehaviorSubject<User[]>;
  
  private dataStore: {
    users: User[]; 
    
  }

  constructor(private http: HttpClient) { 
    this.dataStore = {users : [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  ///////////// load and subscribe and get errors insted of subscribing with the conponent////////////////////
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  loadAll(){
    const url:string = "https://angular-material-api.azurewebsites.net/users";
    return this.http.get<User[]>(url)
    .subscribe(data =>{
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
    }, error=>{
      console.log("failed to get Users");
    });
  }
}
