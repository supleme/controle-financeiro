import { Component } from '@angular/core';
import { Categoria, DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  form: FormGroup;
  categorias: Categoria[] = [];

  constructor(private data: DataService,
              private formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({
      "name": new FormControl(null, [Validators.required]),
      "color": new FormControl(null, [Validators.required]),
    })
    this.buildTable();
  }

  submit(){
    const novaCategoria = {name: this.form.get("name")?.value, color: this.form.get("color")?.value};
    this.data.addCategoria(novaCategoria).subscribe({
      next: (response) =>{
        console.log(response);
        this.buildTable();
          Swal.fire({
            title: "Categoria cadastrada com sucesso!",
            icon: "success",
            draggable: true
          });
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar categoria",
          text: error,
        })
        console.log('Erro ao cadastrar categoria ', error)
      }
    });

  }

  buildTable(){
    this.data.getAllCategoria().subscribe({
      next: (response) =>{
        this.categorias = response;
        console.log(this.categorias);
      },
      error: (error) =>{
        console.log('Erro ', error)
      }
    })
  }

  registerCategoria(){

  }

}
