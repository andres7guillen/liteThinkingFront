import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionesService {
    public urlCompany:string = 'https://localhost:7259/api/Company';
    public urlArticle:string = 'https://localhost:7259/api/Article';    
    public urlUser:string = 'https://localhost:7259/api/User';

  constructor() { }
}
