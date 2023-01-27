import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Gender } from '../models/ui-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseApiUrl=environment.baseApiUrl;

  constructor(private httpClient :HttpClient) { }

  getGenderList():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUrl+'/genders');
  }
}
