import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:Usuario = new Usuario();
  formulario: FormGroup;

  constructor(private authService:AuthService, private router:Router, private fb: FormBuilder) 
  {
    this.formulario = this.fb.group({
      email: ['',[Validators.email]],
      password: ['',[Validators.required]],
      confirmPasword: ['', Validators.minLength(10)]
    });  
  }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  Register(){
    if(this.formulario.valid){
      this.usuario.email = this.formulario.get('email')?.value;
      this.usuario.PassWord = this.formulario.get('password')?.value;
      Swal.fire({title:'',text:'loading...',
                allowOutsideClick:false});
      Swal.showLoading();

      this.authService.CrearUsuario(this.usuario).subscribe({
        next: (data) => {console.log(data), Swal.close(),this.router.navigateByUrl('/home');},
        error: (error) => {Swal.close(), Swal.fire({icon:'error', title:'Error creating the user',text:error.error,
        allowOutsideClick:false}), console.log(error.error)}
      })
      this.formulario.reset();
    }else{
      Swal.fire('Invalid information, please verify it!!');
      this.formulario.reset();
    }
    
  }

  get samePassword(){
    const pass1 = this.formulario.get('password')?.value;
    const pass2 = this.formulario.get('confirmPasword')?.value;
    return (pass1 === pass2) ? false : true;
  }

}
