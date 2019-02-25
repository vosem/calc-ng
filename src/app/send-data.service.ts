import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

  private insurantUrl = 'assets/insurant.json';  // URL to web api?????????????????????
  insurant: Insurant;

  constructor(private http: HttpClient) {}

  getInsurant() {
  return this.http.get<Insurant>(this.insurantUrl);
}

  sendInsurant (insurant: Insurant): Observable<Insurant> {
    return this.http.post<Insurant>(this.insurantUrl, insurant, httpOptions);
  }




  // getData() {
  //   return this.http.get("insurant.json");
  // }
}
