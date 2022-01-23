import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Counter } from '../Counter';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  //object passed from parent component
  @Input() counter!: Counter;
  selectedDevice: Counter | undefined;
  
  //declare method for button to click, is is received by the parent component when the emit() method is called
  //@Output() showGraph = new EventEmitter<Counter>();
  constructor() { }

  showGraph(counter: Counter){
    this.selectedDevice = counter;
  }

  ngOnInit(): void {
  }

}
