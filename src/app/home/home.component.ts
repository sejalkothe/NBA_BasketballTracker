import { Component, OnInit, Output } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { Team, TeamDetails, TeamList } from 'src/team';
import { Game, GameDetails, Score } from '../resource/interfaces';
import { Router } from '@angular/router';
// import { TrackteamService } from '../trackteam.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() closeCard: any;

  showCard = false;
  teamSelected: any;
  options: Team[] = [];
  parentCard: any[] = [];
  selectedOption: number = 0;
  selectedTeams: TeamDetails[]=[];
  isLoading = false;

 

  idData: any = 0;

  
  Card1(id: number) {
    console.log(id);
  }

  constructor(private _dropdown: DropdownService,private router: Router) {}

  // AddCard() {
  //   this._options = this.options.filter((element: any) => {
  //     return element.id === this.idData;
  //   });
  //   console.log(this._options);
  //   // if (this.selectedOption) {
  //   //   this.parentCard = [this.selectedOption];
  //   // }
  // }

  handleChange(event: Event) {
    const eventTarget = event.target;
    const selectedValue = (eventTarget as HTMLSelectElement)?.value;
    if (selectedValue) {
      console.log(`Selected value: ${selectedValue}`);
    }
    // this.idData = +selectedValue;
    // console.log(`Team Selected value is ${this.idData}`);
  }

  // removeTeam(id:number):void{
  //   const index:number = this.getTeamIndex(this.options,id);
  //   if(index !== -1){
  //     this.options.splice(index,1)
  //   }
  //   this._dropdown.setStorage('selectedTeams', this.options);
  // }

  // getTeamIndex(teamList:parentCard[], id:number):number{
  //      return teamList.findIndex((team:parentCard) => team.id ===id);

  // }
  trackTeam(teamId: number): void {
    const team: Team | undefined = this.getTeamDetail(+teamId);
    if (team && this.checkTeamExist(team.abbreviation) === -1) {
      this.isLoading = true;
      const dates: string = this.getLastTwelveDates();
      const params: string = `dates[]=${dates}&per_page=12&team_ids[]=${teamId}`;
      this._dropdown.getGameDetails(params).subscribe((response: GameDetails) => {
        this.isLoading = false;
        this.setTeamResponse(response.data, team)
      }, (error: Error) => {
        this.isLoading = false;
        console.log(error);
      })
    }
  }

  ngOnInit() {
    // console.log(this._options);
    // this._dropdown.getTeams().subscribe((data) => {
    //   this.options = data.data;
    //   this.options = [data.data, ...this.options];

    //   console.log(data);
    //   this.teamSelected = 1;
    //   // console.log(this.teamSelected);
    // });
  this.getAllTeams();
    const selectedTeams: TeamDetails[] = this._dropdown.getStorage('selectedTeams');
    if (selectedTeams && selectedTeams.length) {
      this.selectedTeams = selectedTeams;
    }
  
  }

  getAllTeams(): void {
    this._dropdown.getTeams().subscribe((data) => {
      if (data.data && data.data.length) {
        this.options = data.data;
        console.log(data);
        this.selectedOption = this.options[0].id;
      } else {
        this.options = [];
      }
    }, (error: Error) => {
      console.log(error);
      this.options = [];
    })
  }

  showResult(team: Team): void {
    console.log(team)
    this.router.navigate(['/results', team.id])
  }

  
  removeTeam(id: number): void {
    const index: number = this.getTeamIndex(this.selectedTeams, id);
    if (index !== -1) {
      this.selectedTeams.splice(index, 1)
    }
    this._dropdown.setStorage('selectedTeams', this.selectedTeams);
  }

  getTeamDetail(id: number): Team | undefined {
    return this.options.find((team: Team) => team.id === id);
  }

  getTeamIndex(teamList: TeamDetails[], id: number): number {
    return teamList.findIndex((team: TeamDetails) => team.id === id);
  }

  checkTeamExist(abbreviation: string): number {
    return this.selectedTeams.findIndex((team: TeamDetails) => team.abbreviation === abbreviation);
  }


  handleInputChange(event: any) {
    console.log(`Input value changed: ${event.target.value}`);
  }

  getLastTwelveDates(): string {
    const today: Date = new Date();
    const dates: string[] = [];
    for (let i: number = 1; i <= 12; i++) {
      const date: Date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().slice(0, 10))
    }
    return dates.join('&dates[]=');
  }



  

  setScores(selectedTeam: string, opponentTeam: string, selectedTeamScore: number, opponentTeamScore: number): Score {
    return { selectedTeam, opponentTeam, selectedTeamScore, opponentTeamScore };
  }



  setTeamResponse(data: Game[], team: Team): void {
    const teamDetails: TeamDetails = { id: team.id, name: team.name, abbreviation: team.abbreviation, conference: team.conference, results: [], avgPtsScore: 0, avgPtsConceded: 0, scores: [] };
    let teamScore: number = 0;
    let opponentTeamScore: number = 0;
    const totalRecord: number = data.length;
    for (const teams of data) {
      if (teams.home_team.abbreviation === team.abbreviation) {
        teamScore = teamScore + teams.home_team_score;
        teams.home_team_score > teams.visitor_team_score ? teamDetails.results.push('W') : teamDetails.results.push('L');
        const score: Score = this.setScores(teams.home_team.abbreviation, teams.visitor_team.abbreviation, teams.home_team_score, teams.visitor_team_score);
        teamDetails.scores.push(score);
      } else {
        opponentTeamScore =opponentTeamScore + teams.home_team_score;
        const score: Score = this.setScores(teams.visitor_team.abbreviation, teams.home_team.abbreviation, teams.visitor_team_score, teams.home_team_score);
        teamDetails.scores.push(score);
      }
      if (teams.visitor_team.abbreviation === team.abbreviation) {
        teamScore =teamScore+ teams.visitor_team_score;
        teams.home_team_score < teams.visitor_team_score ? teamDetails.results.push('W') : teamDetails.results.push('L');
      } else {
        opponentTeamScore =opponentTeamScore+ teams.visitor_team_score;
      }
    }
    teamDetails.avgPtsScore = +((teamScore / totalRecord).toFixed(2));
    teamDetails.avgPtsConceded =+ ((opponentTeamScore / totalRecord).toFixed(2));
    this.selectedTeams.push(teamDetails);
    this.selectedTeams = [...this.selectedTeams];
    this._dropdown.setStorage('selectedTeams', this.selectedTeams);
  }
}
