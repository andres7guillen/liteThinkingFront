import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';
import { ConexionesService } from './conexiones.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private headers = new HttpHeaders({
    'Content-type': 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('token')!.toString()
  });

  constructor(private http:HttpClient, private conn: ConexionesService) { }
  
  createArticle(Article:Article){
    return this.http.post(this.conn.urlArticle,JSON.stringify(Article),{headers: this.headers});
  }

  updateArticle(Article?:Article):Observable<any>{
    return this.http.put(this.conn.urlArticle,JSON.stringify(Article),{headers: this.headers})
  }

  getArticles():Observable<any>{
    return this.http.get(this.conn.urlArticle,{headers: this.headers} )    
  }

  getArticleById(id?:string): Observable<any>{
    return this.http.get(this.conn.urlArticle + "/" + id,{headers: this.headers});
  }

  deleteArticle(nit?:string):Observable<any>{
    return this.http.delete(this.conn.urlArticle + '/' + nit,{headers: this.headers});
  }

}
