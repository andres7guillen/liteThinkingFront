import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioRolModel } from 'src/app/models/usuario.rol.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css'],
})
export class RolUsuarioComponent implements OnInit {
  usuarioRol: UsuarioRolModel;
  formulario: FormGroup;

  constructor(
    private service: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.email]],
      role: [''],
    });
    this.usuarioRol = new UsuarioRolModel();
  }

  ngOnInit(): void {}

  asociar() {
    if(this.formulario.valid){
      this.usuarioRol.role = this.formulario.get('role')?.value;
      this.usuarioRol.email = this.formulario.get('email')?.value;
    }
    this.service.asociarUsuarioRol(this.usuarioRol).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Info',
          text:
            'User: ' +
            this.usuarioRol.email +
            ' was associated with role: ' +
            this.usuarioRol.role +
            ' successfully',
          allowOutsideClick: false,
        });
        this.router.navigateByUrl('companyList');
      },
      error: (error) => {
        Swal.fire({
          title: 'ERROR',
          icon:'error',
          text:
            'Error trying to associate: ' +
            this.usuarioRol.email +
            'with the Role: ' +
            this.usuarioRol.role +
            '',
          allowOutsideClick: false,
        });
        this.router.navigateByUrl('empresaLista');
      },
    });
  }

  remover() {
    this.service.RemoverUsuarioRol(this.usuarioRol).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Info',
          text:
            'User: ' +
            this.usuarioRol.email +
            ' was removed from: ' +
            this.usuarioRol.role +
            ' succesfully',
          allowOutsideClick: false,
        });
        this.router.navigateByUrl('companyList');
      },
      error: (error) => {
        Swal.fire({
          title: 'ERROR',
          text:
            'An error ocurred trying to remove: ' +
            this.usuarioRol.email +
            ' from the role: ' +
            this.usuarioRol.role +
            '',
          allowOutsideClick: false,
        });
        this.router.navigateByUrl('companyList');
      },
    });
  }
}
