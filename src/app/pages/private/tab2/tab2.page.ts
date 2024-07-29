import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { Geolocation } from '@capacitor/geolocation';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ContainersService } from 'src/app/services/containers.service';
import { Router } from '@angular/router';
import { filterOutline } from 'ionicons/icons';
import { Container, ContainerType } from 'src/app/model/interfaces';
import { ContainersFilterComponent } from "../../../shared/containers-filter/containers-filter.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent, ContainersFilterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Page {
  map?: any;
  AdvancedMarkerElement?: any;
  markers: any[] = [];
  selectedTypes: ContainerType[] = Object.values(ContainerType);

  constructor(
    private containersService: ContainersService,
    private router: Router
  ) {
    addIcons({ dumpster: "../../../../assets/icon/dumpster-solid.svg", 'filter-outline': filterOutline });
  }

  ionViewWillEnter() {
    this.initMap();
  }

  private async initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    this.AdvancedMarkerElement = AdvancedMarkerElement;
    // const center = {lat: 41.40332742165967, lng: 2.184885862336193};
    const coordinates = await Geolocation.getCurrentPosition();

    const center: LatLng = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }

    this.map = new Map(document.getElementById("map") as HTMLElement, {
      zoom: 11,
      center,
      mapId: "4504f8b37365c3d0",
    });
    this.containersService.getContainers(this.selectedTypes).subscribe(this.onContainerListChanged);
  }

  private onContainerListChanged = (containers: Container[]) => {
    for(const marker of this.markers) {
      marker.setMap(null);
    }
    for (const property of containers) {
      const advancedMarkerElement = new this.AdvancedMarkerElement({
        map: this.map,
        content: this.buildContent(property),
        position: property.location,
        title: property.id,
      });
  
      advancedMarkerElement.addListener("click", () => {
        this.toggleHighlight(advancedMarkerElement, property);
      });
      this.markers.push(advancedMarkerElement);
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

  gotToIncidentForm(id: string){
    this.router.navigate(['/tabs/tab1', {id}]);
  }
  
  buildContent(property: any) {
    const content = document.createElement("div");
    content.classList.add("property");
    content.innerHTML = `
      <div class="icon">
          <ion-icon aria-hidden="true" name="dumpster" class="${property.type}"></ion-icon>
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
              <span class="fa-sr-only reportButton">Report incident</span>
          </div>
          </div>
      </div>
      `;
    content.getElementsByClassName("reportButton")[0].addEventListener("click", () => {
      this.gotToIncidentForm(property.id);
    });
    return content;
  }

  setFilters(filter: ContainerType[]) {
    this.selectedTypes = filter;
    this.containersService.getContainers(filter).subscribe(this.onContainerListChanged);
  }
}