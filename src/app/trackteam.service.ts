// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class TrackteamService {
//   private apiurl: string = 'https://free-nba.p.rapidapi.com/games?';
//   private headers = new HttpHeaders().set(
//     'x-rapidapi-key',
//     '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX'
//   );

//   constructor(private http: HttpClient) {}
//   selectedValue: any;
//   // items: any[] = [];
//   // filteredItems: any[] = [];

//   getTrack() {
//     // console.log(this.getTrack)
//     return this.http

//       .get(this.apiurl, {
//         headers: this.headers,
//       })
//       .pipe(
//         tap(
//           (result: any) => {
//             return result;
//           },
//           (error: Error) => {
//             return error;
//           }
//         )
//       );
//   }
// }
