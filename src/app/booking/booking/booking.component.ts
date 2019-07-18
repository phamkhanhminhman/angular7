import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  vote: number = 0;
   message:string;
  // public message = " message from parent abc test";
  constructor() { }
  
  ngOnInit() {
  }
 

  receive(e) {
   console.log(e);
   
    
  }


}
