import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Защищает страницы от неавторизованного доступа
 */
@Injectable()
export class AuthGuard {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.authenticated) {
      return true; // пользователь авторизован если у него есть JWT токен
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
