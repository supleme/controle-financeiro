import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor( private formBuilder: FormBuilder,
               private data: DataService,
               private router: Router
  ) {
    this.form = this.formBuilder.group({
      "user": new FormControl(null, [Validators.required]),
      "password": new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    const user = this.form.get("user")?.value

    this.data.getUser(user).subscribe({
      next: (response) =>{
        console.log(response)
        if(response[0]){
          Swal.fire({
            title: "Logado com sucesso!",
            icon: "success",
            draggable: true
          });
          this.router.navigate(['']);
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro ao logar",
            text: "Usuário não encontrado!",
          })
        }
      },
      error: (error) => {
        console.log('Erro ao carregar login ', error)
      }
    });
  }
}
