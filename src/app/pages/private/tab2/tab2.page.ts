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

  constructor() {
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
  
    for (const property of this.properties) {
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
          <ion-icon aria-hidden="true" name="trash-outline" class="fa-${property.type}"></ion-icon>
      </div>
      <div class="details">
          <div class="price">${property.type}</div>
          <div class="address">${property.type}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${property.type}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${property.type}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.type} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
  }
  
  properties= [{
    id: '1',
    type: 'house',
    level: 5,
    location: {
      lat: 41.414448,
      lng: 2.181070,
    },
  }, {
    id: '2',
    type: 'house',
    level: 5,
    location: {
      lat: 41.425126,
      lng: 2.156366,
    },
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