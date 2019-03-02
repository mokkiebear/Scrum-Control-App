import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  createIteration(title, description){
    const iteration = {
      title: title,
      description: description
    };
    return this.http.post(`${this.uri}/api/project`, iteration);
  }
}
