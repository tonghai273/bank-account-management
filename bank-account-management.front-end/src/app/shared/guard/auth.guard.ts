import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { NavigateUrlService } from '../navigate/navigate-url.service';
import { SESSION } from '../utils/utils';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthorized()) {
            this.router.navigate(['auth']);
            return false;
        }

        const roles = route.data.roles as Role[];
        if (roles && !roles.some(r => this.authService.hasRole(r))) {
            this.router.navigate(['not-role']);
            return false;
        }

        return true;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthorized()) {
            return false;
        }

        const roles = route.data && route.data.roles as Role[];
        if (roles && !roles.some(r => this.authService.hasRole(r))) {
            return false;
        }

        return true;
    }
}