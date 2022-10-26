import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpresaListarComponent } from './components/empresa-listar/empresa-listar.component';
import { EmpresaCrearComponent } from './components/empresa-crear/empresa-crear.component';
import { EmpresaEditarComponent } from './components/empresa-editar/empresa-editar.component';
import { ArticuloListarComponent } from './components/articulo-listar/articulo-listar.component';
import { ArticuloCrearComponent } from './components/articulo-crear/articulo-crear.component';
import { ArticuloEditarComponent } from './components/articulo-editar/articulo-editar.component';
import { ArticuloDetalleComponent } from './components/articulo-detalle/articulo-detalle.component';
import { EmpresaDetalleComponent } from './components/empresa-detalle/empresa-detalle.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RolUsuarioComponent } from './components/rol-usuario/rol-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NavComponent } from './components/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConexionesService } from './services/conexiones.service';
import { AuthService } from './services/auth.service';
import { CompanyService } from './services/company.service';
import { ArticleService } from './services/article.service';

@NgModule({
  declarations: [
    AppComponent,
    EmpresaListarComponent,
    EmpresaCrearComponent,
    EmpresaEditarComponent,
    ArticuloListarComponent,
    ArticuloCrearComponent,
    ArticuloEditarComponent,
    ArticuloDetalleComponent,
    EmpresaDetalleComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    RolUsuarioComponent,
    UsuarioComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConexionesService,AuthService,CompanyService,ArticleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
