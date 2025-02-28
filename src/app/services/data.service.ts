import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria{
  id: string;
  name: string;
  color: string;
}

export interface TipoPagamento{
  id: string;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private url = "http://localhost:3000"

  getUser(user: string): Observable<any>{
    return this.http.get<any>(this.url + '/user/?name=' + user);
  }

  getAllCategoria(): Observable<Categoria[]>{
    return this.http.get<any>(this.url + '/categorias');
  }

  addCategoria(categoria: { name: string; color: string }){
    const urlPostCategoria = this.url + '/categorias';
    return this.http.post(urlPostCategoria, categoria);
  }

  deleteCategoria(id: String){
    const urlDeleteCategoria = this.url + '/categorias/' + id;
    return this.http.delete(urlDeleteCategoria);
  }

  getAllTipoPagamento(): Observable<TipoPagamento[]>{
    return this.http.get<any>(this.url + '/tipoPagamento')
  }

  addTipoPagamento(tipoPagamento: {name: string, color: string}){
    const urlPostTipoPagamento = this.url + '/tipoPagamento';
    return this.http.post(urlPostTipoPagamento, tipoPagamento);
  }

  deleteTipoPagamento(id: String){
    const urlDeleteTipoPagamento = this.url + '/tipoPagamento/' + id;
    return this.http.delete(urlDeleteTipoPagamento);
  }
}
