import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-icon',
  templateUrl: './map-icon.component.html',
  styleUrls: ['./map-icon.component.scss'],
  standalone: true,
})
export class MapIconComponent {

  @Input() property: any;

  constructor() { }

}
