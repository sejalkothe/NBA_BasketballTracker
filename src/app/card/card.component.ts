import { TeamDetails } from 'src/team';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { HomeComponent } from '../home/home.component';
// import { TrackteamService } from '../trackteam.service';
import { Router } from '@angular/router';
import { Url } from '../resource/url';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  
  @Input() cardData: any ={}
  @Input() parentCard: any[] = [];
  @Input() teamDetails: TeamDetails | any;
  @Output() showResult = new EventEmitter();
  @Output() removeCard = new EventEmitter();
  logo:string=Url.logoUrl;
  // @Input() teamDetails: TeamDetails | undefined;
  // @Output() closeId:number= 0;
  // @Input() closeEvent : any;

  

  closed = false;
 
  constructor(private router: Router) { }
  
  // teamCode:number=0;

  // navigateToPage(): void {
  
    // this.router.navigate([`/result/:${this.teamCode}`]); // replace '/page-url' with the actual URL of the page you want to navigate to

   
  // }
  ngOnInit() {

    if (this.teamDetails && this.teamDetails.abbreviation) {
    this.logo += `/${this.teamDetails.abbreviation}.png`;
  }
 
}
  seeResult(): void {
    this.showResult.emit(this.teamDetails)
  }

  deleteCard(): void {
    this.removeCard.emit(this.teamDetails?.id)
  }

 closeCard() {
this.closed = true;
}
 
//   trackTeam: any=[];
//  selectedOption = null;
//   option: any=[];
  // constructor(private _dropdown: DropdownService ) { }

  
  //   // console.log(this.cardData);
  //   // console.log(this._trackteam)
  //   this._dropdown.getTeams().subscribe((data) => {
  //     // this.option=data.data;
  //     // console.log(data);
  //     });

  //     // this._trackteam.getTrack().subscribe((result) => {
  //     //   this.trackTeam=result.result;
  //     //   // console.log(result);
  //     //   });  
  

}

