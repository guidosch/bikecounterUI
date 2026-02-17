import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CollectionToEUIMapping } from '../eui-mappings';
import { DeviceEuiTrailMappingServiceService } from '../device-eui-trail-mapping-service.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


/**
const ELEMENT_DATA: CollectionToEUIMapping[] = [
  { collectionId: 'adlisberg-1', deviceEUI: "83jd838de", validFrom: new Date() },
  { collectionId: 'antennentrail', deviceEUI: "83jd838de", validFrom: new Date() },
  { collectionId: 'hoecker-new-1', deviceEUI: "83jd838de", validFrom: new Date() },
];

 */


@Component({
    selector: 'app-device-eui-trail-mapping',
    templateUrl: './device-eui-trail-mapping.component.html',
    styleUrl: './device-eui-trail-mapping.component.css',
    standalone: false
})
export class DeviceEuiTrailMappingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['collectionId', 'deviceEUI', 'validFrom'];
  private cloudService: DeviceEuiTrailMappingServiceService;
  dataSource!: MatTableDataSource<CollectionToEUIMapping, MatPaginator>;
  //dataSource = ELEMENT_DATA;

  constructor(private apiService: DeviceEuiTrailMappingServiceService) {
    this.cloudService = apiService;

  }
  ngAfterViewInit(): void {
    this.cloudService.getMappings("test").subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);;
    });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  checkRole(): boolean {
    //todo: implement
    return true;
  }

}
