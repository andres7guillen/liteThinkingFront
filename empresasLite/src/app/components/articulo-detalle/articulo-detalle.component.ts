import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articulo-detalle',
  templateUrl: './articulo-detalle.component.html',
  styleUrls: ['./articulo-detalle.component.css']
})
export class ArticuloDetalleComponent implements OnInit {

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
      name: ['', []],
      companyNit: [{value:'', disabled: true},'', []],
      companyName:['']
    });
  }
  ngOnInit(): void {}

 

  getArticleById(){
    this.id = this.route.snapshot.paramMap.get('id')!.toString();
    this.service.getArticleById(this.id).subscribe({
      next: (data) =>{
        if(data !== undefined){
          this.article = data;
          this.formulario.setValue({
            name: this.article.name,
            companyNit: this.article.companyNit,
            companyName: this.article.company?.name           
          })
        }
      }
    })
  }
}
