import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { GameDetails, Team, TeamList } from 'src/team';
import { ENVIRONMENT } from 'src/environment/environment';
import { Url } from './resource/url';
import { TeamDetails } from './resource/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  baseUrl: string = 'https://free-nba.p.rapidapi.com/';
  private apiurl: string = `${this.baseUrl}teams/`;
  // private apiDetail: string = `${this.baseUrl}${params}`;
  private headers = new HttpHeaders().set(
    'x-rapidapi-key',
    '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX'
  );
  setStorage(key: string, value: TeamDetails[]): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getStorage(key: string): TeamDetails[] {
    const data: string | null = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

    
  constructor(private http: HttpClient) {}

  // getTeams() {
  //   return this.http
  //     .get(this.apiurl, {
  //       headers: this.headers,
  //     })
  //     .pipe(
  //       tap(
  //         (data: any) => {
  //           return data;
  //         },
  //         (error: Error) => {
  //           return error;
  //         }
  //       )
  //     );
  // }


  getTeams(): Observable<TeamList> {
    
    return this.http
      .get<TeamList>(Url.getTeams, {
        headers: ENVIRONMENT.headers,
      })
      .pipe(
        tap(
          (data: TeamList) => { return data },
          (error: Error) => { return error }
        )
      );
  }

  getGameDetails(params: string): Observable<GameDetails> {
    return this.http
      .get<GameDetails>(Url.getGameDetails.replace('{params}', params), {
        headers: ENVIRONMENT.headers,
      })
      .pipe(
        tap(
          (data: GameDetails) => { return data },
          (error: Error) => { return error }
        )
      );
  }
 
  // getDetails() {
  //   console.log(this.getDetails)
  //   return this.http
  //     .get(this.apiDetail, {
  //       headers: this.headers,
  //     })
  //     .pipe(
  //       tap(
  //         (data: any) => {
  //           return data;
  //         },
  //         (error: Error) => {
  //           return error;
  //         }
  //       )
  //     );
  // }

}
