import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { University } from '../interface/university.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {

  constructor(private http: HttpClient) { }

  getUniversities(country: string, value: string): Observable<University[]> {
    return this.http.get<University[]>(`http://universities.hipolabs.com/search?country=${country}&name=${value}`);
  };
  
}
