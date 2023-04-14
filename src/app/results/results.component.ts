import { Game } from './../../team';
import { Component,Input } from '@angular/core';
import { TeamDetails} from '../resource/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownService } from '../dropdown.service';
// import { Game } from 'src/team';
import { Location } from '@angular/common';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  @Input() teamDetails: TeamDetails | undefined;
  // @Input() gameDetails: Game | any;

  constructor(private router: ActivatedRoute,private _dropdown: DropdownService,private location: Location) { }

  ngOnInit(): void {
    const selectedTeams: TeamDetails[] = this._dropdown.getStorage('selectedTeams');
    const teamCode: string | null = this.router.snapshot.paramMap.get('teamCode');
    if (teamCode && selectedTeams && selectedTeams.length) {
      const index: number = selectedTeams.findIndex((team: TeamDetails) => team.id === +teamCode);
      if (index !== -1) {
        this.teamDetails = selectedTeams[index]
      }
    }
  }

  backToTeams(): void {
    this.location.back();
  }


}
