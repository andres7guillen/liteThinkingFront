import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  formulario: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      email: ['',[Validators.email]],
      password: ['',[Validators.required]],
    });    
  }

  ngOnInit(): void {}

  get EmailNoValid(){
    return this.formulario.get('email')?.invalid && this.formulario.get('email')?.touched;
  }

  Login() {
    if(this.formulario.invalid){
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched;
      })
    }

    this.usuario.email = this.formulario.get('email')?.value;
    this.usuario.PassWord = this.formulario.get('password')?.value;

    Swal.fire({
      text: 'loading...',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.auth.Login(this.usuario).subscribe({
      next: (data) => {
        Swal.close();
        console.log(data);
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        Swal.close();
        Swal.fire({ title: 'Error in authentication', text: "An error ocurred trying to Login" });
        console.log(error.error);
      },
    });
  }

    
}
