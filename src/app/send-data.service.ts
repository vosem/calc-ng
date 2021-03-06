import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Insurant } from './insurant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: "root"
})
export class SendDataService {

  private insurantUrl = 'assets/insurant.json';  // URL to web api
  private postUrl = '/submit';  // URL to web api

  insurant: Insurant;
  sum: number;

  constructor(private http: HttpClient) {}

  getInsurant() {
    return this.http.get<Insurant>(this.insurantUrl);
  }

  sendInsurant (insurant: Insurant): Observable<Insurant> {
    let sumRequest = this.http.post<Insurant>(this.postUrl, insurant, httpOptions);
    return sumRequest;
  }
}
