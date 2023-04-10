import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { ITeam } from 'src/team';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  
  private apiurl: string = 'https://free-nba.p.rapidapi.com/teams/';
  private headers = new HttpHeaders().set('x-rapidapi-key', '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX');
  setStorage: any;

  constructor(private http: HttpClient) { }


  getTeams() {
  // console.log(this.getTeams)
     return this.http
    
     .get(this.apiurl, {
    
      headers: this.headers ,
     })
    .pipe(
    tap(
    (data: any) => { return data },
    (error: Error) => { return error }
     )
    );
    }
 
  
}
