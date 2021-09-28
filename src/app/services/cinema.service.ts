import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs/operators';
import { Booking, Cinema, Movie, ResponseDto } from '../core/interfaces/cinema.interface';

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

  private getAllCinemas(): Observable<Cinema[]> {
    return this.http.get<ResponseDto<Cinema[]>>(`${this.baseUrl}/cinemas`)
      .pipe(
        first(),
        map((res: ResponseDto<Cinema[]>) => res.content )
        )
  }
  private getAllMovies(): Observable<Movie[]> {
    return this.http.get<ResponseDto<Movie[]>>(`${this.baseUrl}/cinemas`)
      .pipe(
        first(),
        map((res: ResponseDto<Movie[]>) => res.content )
        )
  }
  private getAllBookings(): Observable<Booking[]> {
    return this.http.get<ResponseDto<Booking[]>>(`${this.baseUrl}/cinemas`)
      .pipe(
        first(),
        map((res: ResponseDto<Booking[]>) => res.content )
        )
  }
}
