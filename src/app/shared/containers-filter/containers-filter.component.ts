import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IonModal, IonTitle, IonHeader, IonToolbar, IonButton, IonButtons, IonContent, IonItem, IonCheckbox, IonFab, IonFabButton, IonRow, IonIcon, IonCol, IonGrid } from "@ionic/angular/standalone";
import { ContainerType } from 'src/app/model/interfaces';

@Component({
  selector: 'app-containers-filter',
  templateUrl: './containers-filter.component.html',
  styleUrls: ['./containers-filter.component.scss'],
  standalone: true,
  imports: [IonGrid, IonCol, IonIcon, IonRow, IonFabButton, IonFab, IonCheckbox, IonItem, IonContent, IonButtons, IonButton, IonToolbar, IonModal, IonTitle, IonHeader, CommonModule]
})
export class ContainersFilterComponent {
  public isModalOpen: boolean = false;
  public buttonEnabled: boolean = false;
  containerTypes: ContainerType[] = Object.values(ContainerType);
  filter: ContainerType[] = [];

  @Input() selectedTypes!: ContainerType[];
  @Output() setNewFilter: EventEmitter<ContainerType[]> = new EventEmitter();

  constructor() { }


  setModalOpen(value: boolean) {
    this.isModalOpen = value;
    this.buttonEnabled = false;
    this.filter = [ ...this.selectedTypes ];
  }

  typeClicked(type: ContainerType) {
    this.buttonEnabled = true;
    if (this.filter.includes(type))
      this.filter.splice(this.filter.indexOf(type),1);
    else
      this.filter.push(type);
  }

  setFilter() {
    this.setNewFilter.emit(this.filter);
    this.setModalOpen(false);
  }

}
