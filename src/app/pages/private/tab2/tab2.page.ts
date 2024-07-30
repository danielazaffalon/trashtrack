import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { Geolocation } from '@capacitor/geolocation';
import { LatLng } from '@capacitor/google-maps/dist/typings/definitions';
import { ContainersService } from 'src/app/services/containers.service';
import { Router } from '@angular/router';
import { Container, ContainerType, IUser, Role } from 'src/app/model/interfaces';
import { ContainersFilterComponent } from "../../../shared/containers-filter/containers-filter.component";
import { man } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service';

const UPDATE_POSITION_TIME = 2000;

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
  currentPositionMarker: any = null;
  currentPositionHandler: any;
  selectedTypes: ContainerType[] = Object.values(ContainerType);
  userIcon: string = '';
  containersSubscription: any = null;

  constructor(
    private containersService: ContainersService,
    private router: Router,
    private storage: StorageService
  ) {
    addIcons({
      dumpster: "../../../../assets/icon/dumpster-solid.svg",
      [Role.operator]: "../../../../assets/icon/truck.svg",
      [Role.normal]: man,
    });
  }

  ionViewWillEnter() {
    this.initMap();
  }

  ionViewWillLeave() {
    clearInterval(this.currentPositionHandler);
  }

  private async initMap() {
    // Get user role to define icon
    const { role } = await this.storage.get('userSettings') as IUser;

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
      zoom: 14,
      center,
      mapId: "4504f8b37365c3d0",
    });

    this.containersSubscription = this.containersService.getContainers(this.selectedTypes).subscribe(this.onContainerListChanged);
    this.currentPositionMarker = new this.AdvancedMarkerElement({
      map: this.map,
      content: this.buildCurrentPositionMarker(role),
      position: center,
      zIndex: 1
    });
    this.currentPositionHandler = setInterval(this.updateCurrentPosition, UPDATE_POSITION_TIME);
  }

  private onContainerListChanged = (containers: Container[]) => {
    for(const marker of this.markers) {
      marker.setMap(null);
    }
    for (const container of containers) {
      const advancedMarkerElement = new this.AdvancedMarkerElement({
        map: this.map,
        content: this.buildContainerMarker(container),
        position: container.location,
        title: container.id,
      });
  
      advancedMarkerElement.addListener("click", () => {
        this.toggleHighlight(advancedMarkerElement);
      });
      this.markers.push(advancedMarkerElement);
    }
  }
  
  toggleHighlight(markerView: any) {
    if (markerView.content.classList.contains("highlight")) {
          markerView.content.classList.remove("highlight");
          markerView.zIndex = null;
    } else {
          markerView.content.classList.add("highlight");
          markerView.zIndex = 1;
    }
  }

  gotToIncidentForm(containerId: string){
    this.router.navigate(['/tabs/tab1', { containerId }]);
  }

  gotToIncidentsList(containerId: string){
    this.router.navigate(['/tabs/tab3', { containerId }]);
  }
  
  buildContainerMarker(container: any) {
    const content = document.createElement("div");
    content.classList.add("container");
    content.innerHTML = `
      <div class="icon ${container.type}">
          <ion-icon aria-hidden="true" name="dumpster"></ion-icon>
      </div>
      <div class="details">
          <div class="title">${container.name}</div>
          <div class="features">Type: ${container.type}</div>
          <div class="features">Fill Level: ${container.level}</div>
          <div class="address">ID: ${container.id}</div>
          <div class="address">Register ID: ${container.register_id}</div>
          <div class="address">${container.address}</div>
          <div class="features">
          <div>
              <span class="fa-sr-only reportButton">Report incident</span>
          </div>
          <div>
              <span class="fa-sr-only listIncidentsBtn">View incidents</span>
          </div>
          </div>
      </div>
      `;
    content.getElementsByClassName("reportButton")[0].addEventListener("click", () => {
      this.gotToIncidentForm(container.id);
    });
    content.getElementsByClassName("listIncidentsBtn")[0].addEventListener("click", ()=>{
      this.gotToIncidentsList(container.id);
    })
    return content;
  }

  buildCurrentPositionMarker(role: string) {
    const content = document.createElement("div");
    content.classList.add("current-position");
    content.innerHTML = `<ion-icon aria-hidden="true" name="${role}"></ion-icon>`;
    return content;
  }

  setFilters(filter: ContainerType[]) {
    this.selectedTypes = filter;
    this.containersSubscription?.unsubscribe();
    this.containersSubscription = this.containersService.getContainers(filter).subscribe(this.onContainerListChanged);
  }

  updateCurrentPosition = async () => {
    const { lat, lng } = this.currentPositionMarker.position; 
    const { coords: { latitude, longitude }} = await Geolocation.getCurrentPosition();
    if (latitude === lat && longitude === lng) return;

    const center: LatLng = { lat, lng };
    this.currentPositionMarker.position = center;
  }

  async setMapCenter() {
    const {coords: {latitude, longitude }} = await Geolocation.getCurrentPosition();
    const center: LatLng = {
      lat: latitude,
      lng: longitude
    }
    this.map?.setCenter(center);
  }
}