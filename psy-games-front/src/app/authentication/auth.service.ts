import { Injectable } from '@angular/core';
import { RestDataSource } from '../service/rest.datasource';
import { Observable } from 'rxjs';

/**
 * Сервис авторизации
 */
@Injectable()
export class AuthService {
  constructor(private dataSource: RestDataSource) {}

  /**
   * Авторизует пользователя
   * 
   * @param username Имя пользователя
   * @param password Пароль пользователя
   * @returns Observable c прошел/не прошел авторизацию
   */
  authenticate(username: string, password: string): Observable<boolean> {
    return this.dataSource.authenticate(username, password);
  }

  /**
   * @returns true - пользователь авторизован, false - пользователь не авторизован
   */
  get authenticated(): boolean {
    return this.dataSource.authToken !== null;
  }

  /**
   * Сбрасывает авторизацию пользователя
   */
  clear(): void {
    this.dataSource.authToken = null;
  }
}
