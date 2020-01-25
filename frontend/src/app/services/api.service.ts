import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, ObservableLike } from 'rxjs';
import { User } from '../models/users.model';
import {MatSnackBar} from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};
const apiUrl = 'http://localhost:5001/api/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getUsers(skip): Observable<User[]>{
    console.log(skip);
    const url = `${apiUrl}/${skip}`;
    return this.http.get<User[]>(url)
    .pipe(
      tap(users => console.log('pronto')),
      catchError(this.handleError('Erro ao listar usuários', []))
    )
  }
  getUser(id: string): Observable<User>{
    const url = `${apiUrl}/${id}`
    return this.http.get<User>(url).pipe(
      tap(_=> console.log(`leu o usuario id=${id}`)),
      catchError(this.handleError<User>(`Erro ao buscar usuário ${id}`))
    )
  }
  getUserByName(name: string): Observable<User[]>{
    const url = `${apiUrl}/name/${name}`;
    return this.http.get<User[]>(url).pipe(
      tap(_=>console.log(`usuário nome=${name}`)),
      catchError(this.handleError<User[]>(`Erro ao buscar usuário ${name}`))
    )
  }
  addUser(user): Observable<User>{
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`adicionou o usuário com id=${user.id}`)),
      catchError(this.handleError<User>('Erro ao cadastrar cadastrar'))
    )
  }
  updateUser(id, user): Observable<any>{
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_=> console.log(`atualiza o usuario com id=${id}`)),
      catchError(this.handleError<any>('Erro ao editar usuário'))
    )
  }
  deleteUser(id: string): Observable<User>{
    const url = `${apiUrl}/delete/${id}`;
    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_=> console.log(`remove o usuario com id=${id}`)),
      catchError(this.handleError<User>('Erro ao remover usuário'))
    )
  }
  countUsers(): Observable<Number>{
    const url = apiUrl + '/count';
    return this.http.get<Number>(url).pipe(
      tap(_=> console.log('count users')),
      catchError(this.handleError<Number>('Erro ao listar'))
    )
  }

  private handleError<T>(operation, result?: T){
    return (error: any): Observable<T> => {
      this._snackBar.open(operation, error.status, {
        duration: 4000,
      })
      console.error(error);
      return of(result as T);
    }
  }
}
