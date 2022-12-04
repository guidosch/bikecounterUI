import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Counter } from '../Counter';
import { TrailCoordinates, trails } from '../TrailCoordinates';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent {

  //object passed from parent component
  @Input() counter!: Counter;
  selectedDevice: Counter | undefined;
  
  //declare method for button to click, is is received by the parent component when the emit() method is called
  //@Output() showGraph = new EventEmitter<Counter>();
  constructor() {
  }
  
  ngOnInit(): void {
    let trail = trails.get(this.counter.id);
    if (trail) {
      //let url = `https://map.geo.admin.ch/?lang=de&topic=ech&E${trail.x}=&N=${trail.y}&zoom=8`;
      let url = `http://map.geo.admin.ch/?Y=${trail.x}&X=${trail.y}&zoom=10&crosshair=marker`;
      this.counter.location = url;
    }
  }

  checkBatteryVoltage(volt: number): boolean{
    return volt < 3.1 ? true : false;
  }

  checkHumidity(humidity: number): boolean{
    return humidity > 80 ? true : false;
  }

  showGraph(counter: Counter){
    this.selectedDevice = counter;
  }

  extractSingleGatewayId(counter: Counter): string{
    if (counter.gateways){
      return counter.gateways.gateway_id
    }
    return "";

  }

}
