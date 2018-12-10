import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { Cliente } from "../model/cliente.model";
import { Observable } from "rxjs";


@Injectable()
export class ClienteService {

    endpoint = environment.api.cliente;

    constructor (private _http : HttpClient) {}

    public getRiscos() : Observable<any> {
        return this._http.get(`${this.endpoint}riscos`);
    }

    public postCliente(cliente: Cliente) : Observable<any> {
        return this._http.post(this.endpoint, cliente);
    }

}