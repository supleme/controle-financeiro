import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { TipoPagamentoComponent } from './components/tipo-pagamento/tipo-pagamento.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'categoria', component: CategoriaComponent },
  {path: 'tipo-pagamento', component: TipoPagamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
