import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable({ providedIn: 'root' })
export class AuthEmployeeGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private storageService: StorageService
    ) {}

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authentication();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authentication();
    }

    private authentication(): boolean {
        const user = this.storageService.userInfo;
        if (user && user.employee) {
            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login/admin']);
        return false;
    }
}