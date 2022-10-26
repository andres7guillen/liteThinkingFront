import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,
    private router:Router){}

    canActivate():  boolean {
      console.log('Block by guard');
      if(this.auth.estaAutenticado()){
        return true;
      }else{
        Swal.fire({title:'Info',
                  text:'No se ha logueado',
                  allowOutsideClick: false
      })
        this.router.navigateByUrl('/login');
        return false;
      }
    }
  
}


// export class AuthGuard implements CanActivate {
//   constructor(){}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }
