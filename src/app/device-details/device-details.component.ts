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
  @Output() notify = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
