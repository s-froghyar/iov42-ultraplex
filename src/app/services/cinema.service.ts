import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs/operators';
import { Booking, Cinema, CinemaScreen, CinemaScreening, Movie, ResponseDto } from '../core/interfaces/cinema.interface';
import { ICard } from '../core/interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}
  
  getInitialData(): Observable<[Cinema[], Movie[], Booking[]]> {
    return forkJoin([
      this.getAllCinemas(),
      this.getAllMovies(),
      this.getAllBookings()
    ]).pipe(first())
  }
  
  getScreensAndScreenings(selectedCinemaId: number | string): Observable<[CinemaScreen[], CinemaScreening[]]> {
    return forkJoin([
      this.getScreens(selectedCinemaId),
      this.getScreenings(selectedCinemaId)
    ]).pipe(first())
  }
  private getScreenings(cinemaId: number | string): Observable<CinemaScreening[]> {
    return this.http.get<ResponseDto<CinemaScreening[]>>(`${this.baseUrl}/cinemas/${cinemaId}/screenings?size=100`)
    .pipe(
      first(),
      map((res: ResponseDto<CinemaScreening[]>) => res.content)
    )
  }
  private getScreens(cinemaId: number | string): Observable<CinemaScreen[]> {
    return this.http.get<ResponseDto<CinemaScreen[]>>(`${this.baseUrl}/cinemas/${cinemaId}/screens?size=100`)
    .pipe(
      first(),
      map((res: ResponseDto<CinemaScreen[]>) => res.content)
    )
  }
  private getAllCinemas(): Observable<Cinema[]> {
    return this.http.get<ResponseDto<Cinema[]>>(`${this.baseUrl}/cinemas?size=100`)
      .pipe(
        first(),
        map((res: ResponseDto<Cinema[]>) => res.content )
        )
  }
  private getAllMovies(): Observable<Movie[]> {
    return this.http.get<ResponseDto<Movie[]>>(`${this.baseUrl}/movies?size=100`)
      .pipe(
        first(),
        map((res: ResponseDto<Movie[]>) => res.content )
        )
  }
  private getAllBookings(): Observable<Booking[]> {
    return this.http.get<ResponseDto<Booking[]>>(`${this.baseUrl}/cinemas?size=100`)
      .pipe(
        first(),
        map((res: ResponseDto<Booking[]>) => res.content )
        )
  }
}
