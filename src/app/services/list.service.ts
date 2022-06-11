import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from '../interfaces/Animals'


@Injectable({
  providedIn: 'root'
})
export class ListService {

  apiUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient) { }

  ServiceGetAllAnimals() {
    return this.http.get<Animal[]>(this.apiUrl)
  }

  ServiceAddAnimal(animal: Animal) {
    return this.http.post<Animal>(this.apiUrl, animal);
  }
  ServiceUpDateAnimal(animal: Animal) {
    return this.http.put<Animal>(`${this.apiUrl}/${animal.id}`, animal);
  }

  ServiceDeletarAnimals(id?: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)

  }






}
