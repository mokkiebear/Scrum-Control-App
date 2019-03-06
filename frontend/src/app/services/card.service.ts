import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000';
  
  createCard(itId, title, description, state){
    const card = {
      _parent: itId,
      title: title,
      description: description,
      state: state
    };
    return this.http.post(`${this.url}/cards`, card);
  }

  deleteCard(prId, itId, cardId){
    console.log(prId, itId, cardId);
    return this.http.delete(`${this.url}/api/cards/${prId}/iteration/${itId}/card/${cardId}`);
  }
}
