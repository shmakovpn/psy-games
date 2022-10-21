import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

const PROTOCOL = 'http';
const PORT = 3500;

/**
 * Ответ /auth/login
 */
interface authLoginResponse {
  access_token?: string;
  statusCode?: number;
  message?: string;
}

@Injectable()
export class RestDataSource {
  readonly baseUrl: string;

  /**
   * JWT token
   */
  public authToken: string | null = null;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.httpClient
      .post<authLoginResponse>(`${this.baseUrl}auth/login`, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          this.authToken =
            response.access_token !== undefined ? response.access_token : null;
          return !!response.access_token;
        })
      );
  }
}
