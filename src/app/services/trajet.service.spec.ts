import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trajet {
  id: number;
  departurePlace: string;
  arrivalPlace: string;
  distance: number;
  durationEstimated: string;
  durationArrivalEstimated: string;
  price: number;
  driver: string;
}

@Injectable({
  providedIn: 'root',
})
export class TrajetService {
  private baseUrl = 'http://localhost:8081/api/trajets'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les trajets
  getAllTrajets(): Observable<Trajet[]> {
    return this.http.get<Trajet[]>(this.baseUrl);
  }
}
