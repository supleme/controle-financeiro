import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService, TipoPagamento } from '../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-pagamento',
  standalone: false,
  templateUrl: './tipo-pagamento.component.html',
  styleUrl: './tipo-pagamento.component.css'
})
export class TipoPagamentoComponent {
  form: FormGroup;
  tiposPagamento: TipoPagamento[] = [];

  constructor(private data: DataService,
              private formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({
      "name": new FormControl(null, [Validators.required]),
      "color": new FormControl(null, [Validators.required]),
    });
    this.buildTable();
  }

  submit(){
    const novaCategoria = {name: this.form.get("name")?.value, color: this.form.get("color")?.value};
    this.data.addTipoPagamento(novaCategoria).subscribe({
      next: (response) =>{
        console.log(response);
        this.buildTable()
        this.form.reset();
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
    this.data.getAllTipoPagamento().subscribe({
      next: (response) =>{
        this.tiposPagamento = response;
        console.log(this.tiposPagamento);
      },
      error: (error) =>{
        console.log('Erro ', error)
      }
    })
  }

  deleteTipoPagamento(id: string){
    this.data.deleteTipoPagamento(id).subscribe({
      next: (response) =>{
        console.log(response);
        this.buildTable();
      },
      error: (error) =>{
        console.log('Erro ', error)
      }
    })
  }
}
