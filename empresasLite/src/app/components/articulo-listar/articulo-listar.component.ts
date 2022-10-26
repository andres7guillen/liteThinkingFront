import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-listar',
  templateUrl: './articulo-listar.component.html',
  styleUrls: ['./articulo-listar.component.css']
})
export class ArticuloListarComponent implements OnInit {

  articles: Article[] = [];
  constructor(private service: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.service.getArticles().subscribe({
      next: (data) => {console.log(data);
        this.articles = data;
      },
    });
  }

  deleteArticle(article: Article)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure, do you want to delete: ' + article.name + '?',
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false
    }).then(resp =>{
      if (resp.value) {
        this.service.deleteArticle(article.id).subscribe({
          next: (data) => {
            this.getArticles();
            if (data != undefined) {                          
              Swal.fire({
                title: 'Success',
                text: 'Article:  ' + article.name + ' was deleted',
                allowOutsideClick: false
              });
              
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
