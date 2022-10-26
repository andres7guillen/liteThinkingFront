import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConexionesService } from './conexiones.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private headers = new HttpHeaders({
    'Content-type': 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('token')!.toString()
  });

  constructor(private http: HttpClient, private conn: ConexionesService) { }

  createCompany(company:Company){
    return this.http.post(this.conn.urlCompany,JSON.stringify(company),{headers: this.headers});
  }

  updateCompany(company?:Company):Observable<any>{
    return this.http.put(this.conn.urlCompany,JSON.stringify(company),{headers: this.headers})
  }

  getCompanies():Observable<any>{
    return this.http.get(this.conn.urlCompany,{headers: this.headers} )    
  }

  getCompanyByNit(nit?:string): Observable<any>{
    return this.http.get(this.conn.urlCompany + "/" + nit,{headers: this.headers});
  }

  deleteCompany(nit?:string):Observable<any>{
    return this.http.delete(this.conn.urlCompany + '/' + nit,{headers: this.headers});
  }

}
