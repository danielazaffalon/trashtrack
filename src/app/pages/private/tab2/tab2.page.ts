/// <reference types="@types/google.maps" />
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HeaderPage } from 'src/app/shared/header/header.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapIconComponent } from 'src/app/shared/map-icon/map-icon.component';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
// import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { Container, ContainerType } from 'src/app/model/interfaces';
import { ContainersService } from 'src/app/services/containers.service';
// import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HeaderPage, MapIconComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Page {

  constructor(private containersService: ContainersService) {
    addIcons({ trashOutline });
  }

  ionViewWillEnter(){
    this.initMap();
  }

  async initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  
    // const center = {lat: 37.43238031167444, lng: -122.16795397128632};
    const coordinates = await Geolocation.getCurrentPosition();

    const center: LatLng = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }

    const map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 11,
      center,
      mapId: "4504f8b37365c3d0",
    });

    this.containersService.getContainers().subscribe(containers => {
      for (const property of containers) {
        const advancedMarkerElement = new AdvancedMarkerElement({
          map,
          content: this.buildContent(property),
          position: property.location,
          title: property.id,
        });
    
        advancedMarkerElement.addListener("click", () => {
          this.toggleHighlight(advancedMarkerElement, property);
        });
      }
    });
  }
  
  toggleHighlight(markerView: any, property: any) {
    if (markerView.content.classList.contains("highlight")) {
          markerView.content.classList.remove("highlight");
          markerView.zIndex = null;
    } else {
          markerView.content.classList.add("highlight");
          markerView.zIndex = 1;
    }
  }
  
  buildContent(property: any) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
          <ion-icon aria-hidden="true" name="trash-outline" class="${property.type}"></ion-icon>
      </div>
      <div class="details">
          <div class="title">${property.name}</div>
          <div class="features">Type: ${property.type}</div>
          <div class="features">Fill Level: ${property.level}</div>
          <div class="address">ID: ${property.id}</div>
          <div class="address">Register ID: ${property.register_id}</div>
          <div class="address">${property.address}</div>
          <div class="features">
          <div>
              <span class="fa-sr-only">Report incident</span>
          </div>
          </div>
      </div>
      `;
    return content;
  }
  
  properties: Container[] = [{
    id: 'Container 1',
    type: ContainerType.clothes,
    level: 80,
    location: {
      lat: 41.414448,
      lng: 2.181070,
    },
    name: 'name 1',
    register_id: 1,
    address: 'address 1',
  }, {
    id: 'Container 2',
    type: ContainerType.special,
    level: 50,
    location: {
      lat: 41.425126,
      lng: 2.156366,
    },
    name: 'name 2',
    register_id: 2,
    address: 'address 2',
  }];

}

// async initMap(){
//   const apiKey = environment.mapKey

//   const mapRef = document.getElementById('map')!;
  
//   const coordinates = await Geolocation.getCurrentPosition();

//   const location: LatLng = {
//     lat: coordinates.coords.latitude,
//     lng: coordinates.coords.longitude
//   }

//   const newMap = await GoogleMap.create({
//     id: 'my-map', // Unique identifier for this map instance
//     element: mapRef, // reference to the capacitor-google-map element
//     apiKey: apiKey, // Your Google Maps API Key
//     config: {
//       center: location,
//       zoom: 8, // The initial zoom level to be rendered by the map
//     },
//   });

//   // Add a marker to the map
//   const markerId = await newMap.addMarker({
//     coordinate: location
//   });

//   // Move the map programmatically
//   await newMap.setCamera({
//     coordinate: location
//   });
// }