import { Component, Input, Output } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  
  @Input() cardData: any ={}
  @Input() parentCard: any[] = [];
  // @Output() closeId:number= 0;
 
  @Input() closeEvent : any;
  closed = false;
 
  
  closeCard() {

    // console.log(option.id)
    this.closed = true;
    // this.closeId = this.options.id

  }
 
  
 selectedOption = null;
  option: any=[];
  constructor(private _dropdown: DropdownService) { }

  ngOnInit() {
    console.log(this.cardData);
    this._dropdown.getTeams().subscribe((data) => {
      this.option=data.data;
      console.log(data);
      
      
    });
  }  

}

