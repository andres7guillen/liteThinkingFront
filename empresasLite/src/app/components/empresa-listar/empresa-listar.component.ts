import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-listar',
  templateUrl: './empresa-listar.component.html',
  styleUrls: ['./empresa-listar.component.css'],
})
export class EmpresaListarComponent implements OnInit {
  companies: Company[] = [];
  constructor(private service: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.service.getCompanies().subscribe({
      next: (data) => {console.log(data);
        this.companies = data;
      },
    });
  }

  deleteCompany(company: Company)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, do you want to delete: ' + company.name + '?',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false
    }).then(resp =>{
      if (resp.value) {
        this.service.deleteCompany(company.nit).subscribe({
          next: (data) => {
            this.getCompanies();
            if (data != undefined) {
              const indexList = this.companies.indexOf(company);
              if (indexList !== -1) {
                this.companies.splice(indexList, 1);
              }              
              Swal.fire({
                title: 'Success',
                text: 'Company:  ' + company.name + ' was deleted',
                allowOutsideClick: false
              });
              this.router.navigateByUrl('companyList');
            }
          },
          error:(error) => {
            Swal.fire({
              title:'forbidden',
              icon: 'error',
              text:'you dont have permission for deleting'
            })
          }
        })
      }
    })
  }

  
  
}
