import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import type { User } from './user.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);

  loadUsers() {
    return this.httpClient.get<User[]>(baseUrl).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error("Something went wrong! Please try again."));
      })
    );
  }

  fetchUser(id: number) {
    return this.httpClient.get<User>(`${baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error("Something went wrong! Please try again."));
      })
    );
  }
}
