import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { Company } from 'src/app/models/company.model';
import { ArticleService } from 'src/app/services/article.service';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-crear',
  templateUrl: './articulo-crear.component.html',
  styleUrls: ['./articulo-crear.component.css']
})
export class ArticuloCrearComponent implements OnInit {
  article: Article = new Article();
  formulario: FormGroup;
  companies:Company[] = [];

  constructor(
    private service: ArticleService,
    private companyService: CompanyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({      
      name: ['', [Validators.required]],
      companyNit:['']    
    });
  }
  ngOnInit(): void {
    this.getCompanies();
  }

  get NameNoValid() {
    return (
      this.formulario.get('name')?.invalid &&
      this.formulario.get('name')?.errors &&
      this.formulario.get('name')?.touched
    );
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe({
      next: (data) =>{
        if(data != undefined){
          this.companies = data;
        }
      }
    })
  }
  
  Create() {
    if(this.formulario.valid){
      this.article.companyNit = this.formulario.get('companyNit')?.value;
      this.article.name = this.formulario.get('name')?.value;
    }
    Swal.fire({
      text: 'loading...',
      allowOutsideClick: false,
    });

    Swal.showLoading();
    if(this.formulario.valid){
      this.article.name = this.formulario.get('name')?.value;      
    }

    this.service.createArticle(this.article).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Article: ' + this.article.name + ' was created',
          allowOutsideClick: false,
        });
        console.error('tiene que navegar a articleList');
        this.router.navigateByUrl('articleList');
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
    });
  }
}
