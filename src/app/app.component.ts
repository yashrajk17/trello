import { Component, OnInit } from "@angular/core";
import { AppComponentModal } from "src/core/app.component.modal";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  appcompModal: AppComponentModal = new AppComponentModal();
  constructor() {}
  ngOnInit() {
    const localStorageValue = JSON.parse(localStorage.getItem("item"));
    this.appcompModal.teamsArray = localStorageValue == null ? [] : localStorageValue;
  }
  addList() {
    this.appcompModal.teamsArray.push(
      { 
        listName :this.appcompModal.listName,
        values: []
      }
    );
    this.modifyLocalStorage();
    this.appcompModal.listName = null;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.modifyLocalStorage();
  }

  removeCard(listName, cardName) {
    const valueArray = this.appcompModal.teamsArray.filter(x => x.listName === listName)[0].values;
    this.appcompModal.teamsArray.filter(x => x.listName === listName)[0].values = valueArray.filter(x => x.cardName !== cardName);
    this.modifyLocalStorage();
  }
  
  removeList(listName) {
    this.appcompModal.teamsArray = this.appcompModal.teamsArray.filter(x => x.listName !== listName);
    this.modifyLocalStorage();
  }

  setSelectedList(listName) {
    this.appcompModal.selectedList = listName;
  }

  addCard() {
    this.appcompModal.teamsArray
    .filter(x => x.listName === this.appcompModal.selectedList)[0]
    .values.push({ cardName : this.appcompModal.cardName });
    this.appcompModal.cardName = null;
    this.modifyLocalStorage();
  }

  modifyLocalStorage() {
    localStorage.setItem("item", JSON.stringify(this.appcompModal.teamsArray));
  }
}
