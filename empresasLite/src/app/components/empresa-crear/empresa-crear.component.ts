import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-crear',
  templateUrl: './empresa-crear.component.html',
  styleUrls: ['./empresa-crear.component.css'],
})
export class EmpresaCrearComponent implements OnInit {
  company: Company = new Company();
  formulario: FormGroup;

  constructor(
    private service: CompanyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nit: ['nit1234', [Validators.required]],
      name: ['Postobon', [Validators.required]],
      address: ['calle 23 # 34-09', Validators.required],
      phone: ['3213454321', Validators.required],
    });
  }
  ngOnInit(): void {}

  get NameNoValid() {
    return (
      this.formulario.get('name')?.invalid &&
      this.formulario.get('name')?.touched
    );
  }

  get AddressNoValid() {
    return (
      this.formulario.get('address')?.invalid &&
      this.formulario.get('address')?.touched
    );
  }

  get NitNoValid() {
    return (
      this.formulario.get('nit')?.invalid && this.formulario.get('nit')?.touched
    );
  }

  get PhoneNoValid() {
    return (
      this.formulario.get('phone')?.invalid &&
      this.formulario.get('phone')?.touched
    );
  }

  Create() {
    Swal.fire({
      text: 'loading...',
      allowOutsideClick: false,
    });

    Swal.showLoading();
    if(this.formulario.valid){
      this.company.address = this.formulario.get('address')?.value;
      this.company.name = this.formulario.get('name')?.value;
      this.company.nit = this.formulario.get('nit')?.value;
      this.company.phone = this.formulario.get('phone')?.value;
    }

    this.service.createCompany(this.company).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Company: ' + this.company.name + ' was created',
          allowOutsideClick: false,
        });        
        this.router.navigateByUrl('companyList');
        Swal.close();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'An error ocurred',
          text: 'An error ocurred trying to create the company',
          allowOutsideClick: false,
        });
        Swal.close();
      }
    })


  }
}
