import { Component, OnInit } from '@angular/core';
import { ClienteService } from './service/cliente.service';
import { Cliente } from './model/cliente.model';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cliente: Cliente;
  riscos = [];
  enviado = false;

  formulario: FormGroup;
  nome = new FormControl('', Validators.required);
  limiteCredito = new FormControl('', [Validators.required, Validators.min(0.01)]);
  risco = new FormControl('', Validators.required);

  constructor (private _clienteService: ClienteService, 
               private _notifierService: NotifierService,
               private formBuilder: FormBuilder) {
                 this.formulario = this.formBuilder
                 .group({
                   nome: this.nome,
                   limiteCredito: this.limiteCredito,
                   risco: this.risco
                  })
               }

  ngOnInit() {
    this._clienteService
        .getRiscos()
        .subscribe(riscos => {
          riscos.forEach(risco => {
            this.riscos.push(risco);
          });
        })
        ;

    
  }

  onSubmit()  {
    this.enviado = true;


    if(this.formulario.invalid)
      return;

    this.cliente = this.formulario.value;

    this._clienteService
            .postCliente(this.cliente)
            .subscribe(resposta => {
              this.cliente.id = resposta.id;
              this.cliente.taxaJuros = resposta.taxaJuros;
              this.formulario.reset();
              this._notifierService.notify('success', `Cliente cadastrado com sucesso, com taxa de juros de ${this.cliente.taxaJuros}%.`);
              this.enviado = false;
            }, 
            erro => {
              this._notifierService.notify('error', (erro.errors) ? erro.errors : erro);
            }
          );
  }
  


}
