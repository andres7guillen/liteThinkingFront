import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private auth:AuthService,
    private router:Router) { }
    isLogged:boolean = true;

  ngOnInit(): void {
    this.isLogged = this.auth.estaAutenticado();
    console.log('esta logueado:',this.isLogged);
  }

  signOut(){    
    this.auth.LogOut();
    this.auth.userToken = '';
    this.router.navigateByUrl('/login');
  }

}
