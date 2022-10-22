import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface User {}

@Injectable()
export class JwtAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    console.log(`jwt auth service: email: ${email}, password=${password}`);
    return this.http.post<User>('/api/login', { email, password });
    //.shareReplay();
    // We are calling shareReplay to prevent the receiver of this Observable from accidentally triggering multiple POST requests due to multiple subscriptions.
  }
}
