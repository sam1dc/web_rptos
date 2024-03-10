import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environments';
import { AuthResponse, EstadoUsuario, Usuario } from '../interfaces';
import { CheckTokenResponse } from '../interfaces/check-token.response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _usuario!: Usuario;

  private _usuarioActual = signal<Usuario | null>(null);
  private _estadoDelUsuario = signal<EstadoUsuario>(EstadoUsuario.checking);

  public usuarioActual = computed(() => this._usuarioActual())
  public estadoDelUsuario = computed(() => this._estadoDelUsuario())

  get usuario() {
    return { ...this._usuario };
  }

  constructor() { 
    this.checkEstadoDelUsuario().subscribe()
  }

  private setAuthentication(resp:AuthResponse): boolean{
    if (resp.email_user) {
      this._usuario = {
        email_user: resp.email_user!,
        rol: resp.role!,
        distid: resp.distid!,
        nombre: resp.additional_data.nombre!,
        apellido: resp.additional_data.apellido!,
        cedula: resp.additional_data.cedula!
      }
      this._usuarioActual.set(this._usuario)
      this._estadoDelUsuario.set(EstadoUsuario.authenticated)
      localStorage.setItem('token', resp.token?.toString() || '')
      return true;
    }
    return false;
  }

  login(email_user: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/login`;
    const body = { email_user, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        map(resp => this.setAuthentication(resp)),
        catchError(err => of(err.error.msg))
      );
  }

  checkEstadoDelUsuario(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const token = localStorage.getItem('token')
    if (!token){
      this.logout()
      return of(false);
    } 

    const headers = new HttpHeaders()
      .set('X-Token', token);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(resp => this.setAuthentication(resp)),
        catchError(() => {
          this._estadoDelUsuario.set(EstadoUsuario.notAuthenticated)
          return of(false)
        })
      )

  }

  logout() {
    localStorage.removeItem('token');
    this._usuarioActual.set(null);
    this._estadoDelUsuario.set( EstadoUsuario.notAuthenticated );
  }
}
