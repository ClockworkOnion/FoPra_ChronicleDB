import { EventCompoundType } from './../../../model/ChronicleEvent';
import { ChronicleService } from 'src/app/services/chronicle.service';
import { SnackBarService } from './../../../services/snack-bar.service';
import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  AfterViewInit,
} from '@angular/core';
import { CreateStreamService } from 'src/app/services/rest services/create-stream.service';
import { StreamEventPropertyComponent } from '../stream-event-property.component';

@Component({
  selector: 'app-eventgenerator',
  templateUrl: './eventgenerator.component.html',
  styleUrls: ['./eventgenerator.component.css'],
})
export class EventgeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<StreamEventPropertyComponent>>();
  // Expose class so that it can be used in the template
  class = StreamEventPropertyComponent;

  selectedCompoundOrSingle: string = '';
  objectCompoundType :EventCompoundType | undefined;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private snackbar: SnackBarService,
    private chronicle: ChronicleService,
    private createService: CreateStreamService
  ) {}

  ngOnInit(): void {
    this.selectedCompoundOrSingle = 'single';
  }

  ngAfterViewInit(): void {
    // Erste Komponente erstellen
    setTimeout(()=>this.addComponent(this.class),0)
   
  }

  addComponent(componentClass: Type<any>) {
    if (
      this.selectedCompoundOrSingle === 'single' &&
      this.componentsReferences.length >= 1
    ) {
      this.openSnackBar(this.singleWarning);
    } else {
      // Create component dynamically inside  ng-template
      let componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(componentClass);
      let component = this.container.createComponent(componentFactory);
      let childComponent = component.instance;
      childComponent.unique_key = ++this.child_unique_key;
      childComponent.parentRef = this;

      // Push the component so that we can keep track of which components are created
      this.componentsReferences.push(component);
    }
  }

  get numberOfEventComponents() {
    return this.componentsReferences.length;
  }

  removeComponent(key: number) {
    if (this.container.length <= 1){ this.openSnackBar("Can't have less than 1 Event") 
    return;}
    let componentRef = this.componentsReferences.filter(
      (x) => x.instance.unique_key == key
    )[0];
    let vcrIndex: number = this.container.indexOf(componentRef.hostView);
    this.container.remove(vcrIndex);
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.unique_key !== key
    );
  }

  createCompoundList(): string {
    let res: string = '';
    for (var x of this.componentsReferences) {
      res = res + x.instance.sendEvent() + ',';
    }
    return res.slice(0, -1);
  }

  sendAll() {
    let selectedOption = this.selectedCompoundOrSingle;
    let res: string = '';
    if (this.componentsReferences.length === 0) {
      // kein Event vorhanden
      res = 'undefined';
    } else if (
      this.componentsReferences.length <= 1 &&
      selectedOption == 'single'
    ) {
      res = this.componentsReferences[0].instance.sendEvent();
    } else if (selectedOption == 'varCompound') {
      res = `{"VarCompound":[${this.createCompoundList()}]}`;
    } else if (selectedOption == 'compound') {
      res = `{"Compound":[${this.createCompoundList()}]}`;
    }
    this.setObjectCompoundType();
    this.createService.changeObjectCompound(this.objectCompoundType as EventCompoundType)
    this.createService.changeEventProperties(res);
  }

  singleWarning: string =
    "Can't add more Event properties! Please select Compound or VarCompound";

  openSnackBar(message: string) {
    this.snackbar.openSnackBarwithStyle(message,"red-snackbar");
  }
  setObjectCompoundType(){
    switch(this.selectedCompoundOrSingle){
      case "single": this.objectCompoundType=EventCompoundType.single;
    }
    switch(this.selectedCompoundOrSingle){
      case "varCompound": this.objectCompoundType=EventCompoundType.varCompound;
    }
    switch(this.selectedCompoundOrSingle){
      case "compound": this.objectCompoundType=EventCompoundType.compound;
    }
  }
}
