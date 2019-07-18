import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-booking-catalog',
  templateUrl: './booking-catalog.component.html',
  styleUrls: ['./booking-catalog.component.css']
})
export class BookingCatalogComponent implements OnInit {
  @Input() messagetest: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor() { }

  public message = "child to parent"
  ngOnInit() {

    console.log(this.messagetest);
    
  }
  
  send() {
    console.log(this.message);
    
    this.messageEvent.emit(this.message);
  }
 
 

}
