import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-editar',
  templateUrl: './articulo-editar.component.html',
  styleUrls: ['./articulo-editar.component.css']
})
export class ArticuloEditarComponent implements OnInit {

  id:string = "";
  article: Article = new Article();
  formulario: FormGroup;
  disabled: boolean = true;

  constructor(
    private service: ArticleService,
    private router: Router,
    private fb: FormBuilder,
    private route:ActivatedRoute
  ) {
    this.getArticleById();
    this.formulario = this.fb.group({
      name: ['', [Validators.required]],
      companyNit: [{value:'', disabled: true},'', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  get NameNoValid() {
    return (
      this.formulario.get('name')?.invalid &&
      this.formulario.get('name')?.errors &&
      this.formulario.get('name')?.touched
    );
  }

  getArticleById(){
    this.id = this.route.snapshot.paramMap.get('id')!.toString();
    this.service.getArticleById(this.id).subscribe({
      next: (data) =>{
        if(data !== undefined){
          this.article = data;
          this.formulario.setValue({
            name: this.article.name,
            companyNit: this.article.companyNit            
          })
        }
      }
    })
  }

  

  
  Update() {
    if(this.formulario.valid){      
      this.article.name = this.formulario.get('name')?.value;
    }

    Swal.fire({
      text: 'loading...',
      allowOutsideClick: false,
    });

    Swal.showLoading();   

    this.service.updateArticle(this.article).subscribe({
      next: (data) => {
        this.router.navigateByUrl('articleList');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Article: was updated',
          allowOutsideClick: false,
        });
        Swal.close();        
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'An error ocurred',
          text: 'An error ocurred trying to update the article',
          allowOutsideClick: false,
        });
        //Swal.close();
      }
    })


  }

}
