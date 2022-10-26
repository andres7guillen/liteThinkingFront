import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-editar',
  templateUrl: './empresa-editar.component.html',
  styleUrls: ['./empresa-editar.component.css']
})
export class EmpresaEditarComponent implements OnInit {

  nit:string = "";
  company: Company = new Company();
  formulario: FormGroup;
  disabled: boolean = true;

  constructor(
    private service: CompanyService,
    private router: Router,
    private fb: FormBuilder,
    private route:ActivatedRoute
  ) {
    this.getCompanyByNit();
    this.formulario = this.fb.group({
      nit: [{value:'', disabled: true},'', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }
  ngOnInit(): void {}

  getCompanyByNit(){
    this.nit = this.route.snapshot.paramMap.get('nit')!.toString();
    this.service.getCompanyByNit(this.nit).subscribe({
      next: (data) =>{
        if(data !== undefined){
          this.company = data;
          this.formulario.setValue({
            name: this.company.name,
            address: this.company.address,
            nit: this.company.nit,
            phone: this.company.phone
          })
        }
      }
    })
  }

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

  Update() {
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

    this.service.updateCompany(this.company).subscribe({
      next: (data) => {
        this.router.navigateByUrl('companyList')
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Company: ' + this.company.name + ' was created',
          allowOutsideClick: false,
        });
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
