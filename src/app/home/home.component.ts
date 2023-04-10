import { Component, OnInit, Output } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { ITeam } from 'src/team';
import { TrackteamService } from '../trackteam.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  @Output() closeCard:any;
  
  showCard= false;
  teamSelected: any ;
  options: any=[];
  parentCard: any[]=[];
  selectedOption: any = null;
 

  
//   ngAfterViewInit() {
  _options:any = this.options.filter((element:any)=>{
    // return element.id ===  this.teamSelected.id;
    return element;
    
  })

   
 
// }

    idData:any = 0 ;

  closeEvent(id:number){
    this._options.filter((element:any) =>{
    return (element.id !== id)

    })
  }

   Card1(id:number){
    console.log(id)
   }

  constructor(private _dropdown: DropdownService) { }
 
  AddCard() {
    this._options=this.options.filter((element:any)=>{
      return element.id === this.idData

    })
    console.log(this._options)
    if (this.selectedOption) {
      this.parentCard = [this.selectedOption];
    }
  }

  handleChange(event: Event) {
    const eventTarget = event.target;
    const selectedValue = (eventTarget as HTMLSelectElement)?.value;
    if (selectedValue) {
      console.log(`Selected value: ${selectedValue}`);
    }
    this.idData =+ selectedValue;
    console.log(`Team Selected value is ${this.idData}`)
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
 



ngOnInit() {
  console.log(this._options);
  this._dropdown.getTeams().subscribe((data) => {
    this.options=data.data;
    this.options=[data.data,...this.options];

    console.log(data);
    this.teamSelected=1
    // console.log(this.teamSelected);

  });


}  

handleInputChange(event: any) {
  console.log(`Input value changed: ${event.target.value}`);

}

  
}


