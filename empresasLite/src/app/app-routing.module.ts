import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloCrearComponent } from './components/articulo-crear/articulo-crear.component';
import { ArticuloDetalleComponent } from './components/articulo-detalle/articulo-detalle.component';
import { ArticuloEditarComponent } from './components/articulo-editar/articulo-editar.component';
import { ArticuloListarComponent } from './components/articulo-listar/articulo-listar.component';
import { EmpresaCrearComponent } from './components/empresa-crear/empresa-crear.component';
import { EmpresaDetalleComponent } from './components/empresa-detalle/empresa-detalle.component';
import { EmpresaEditarComponent } from './components/empresa-editar/empresa-editar.component';
import { EmpresaListarComponent } from './components/empresa-listar/empresa-listar.component';
import { RolUsuarioComponent } from './components/rol-usuario/rol-usuario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

const ROUTES: Routes = [
    {path: 'home', component: HomeComponent,canActivate:[ AuthGuard ] },
    {path: 'register', component: RegistroComponent},
    {path: 'login', component: LoginComponent},
    {path: 'companyCreate', component: EmpresaCrearComponent, canActivate:[ AuthGuard ]},
    {path: 'companyList', component: EmpresaListarComponent, canActivate:[ AuthGuard ]},
    {path: 'companyDetail/:nit', component: EmpresaDetalleComponent, canActivate:[ AuthGuard ]},
    {path: 'companyEdit/:nit', component: EmpresaEditarComponent, canActivate:[ AuthGuard ]},
    {path: 'articleCreate', component: ArticuloCrearComponent, canActivate:[ AuthGuard ]},
    {path: 'articleList', component: ArticuloListarComponent, canActivate:[ AuthGuard ]},
    {path: 'articleDetail/:id', component: ArticuloDetalleComponent, canActivate:[ AuthGuard ]},
    {path: 'articleEdit/:id', component: ArticuloEditarComponent, canActivate:[ AuthGuard ]},
    { path: 'roleUser', component: RolUsuarioComponent,canActivate:[ AuthGuard ]},
    { path: 'user', component:UsuarioComponent,canActivate:[ AuthGuard ]},
    { path: '**', redirectTo: 'register' }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export const APP_ROUTING = RouterModule.forRoot(ROUTES,{  useHash: true });