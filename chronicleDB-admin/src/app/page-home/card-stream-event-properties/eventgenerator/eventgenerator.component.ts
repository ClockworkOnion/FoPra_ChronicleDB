import {
  Component,
  OnInit,
  ComponentFactoryResolver, Type,
  ViewChild,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import {StreamEventPropertyComponent} from "src/app/page-home/card-stream-event-properties/stream-event-property.component"

@Component({
  selector: 'app-eventgenerator',
  templateUrl: './eventgenerator.component.html',
  styleUrls: ['./eventgenerator.component.css']
})

export class EventgeneratorComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<StreamEventPropertyComponent>>()
  selectedCompound:string="";
  // Expose class so that it can be used in the template
  class = StreamEventPropertyComponent;


  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  addComponent(componentClass: Type<any>) {
    if(this.selectedCompound==="1" && this.componentsReferences.length>=1){console.log("cant add more")}else{
    // Create component dynamically inside  ng-template
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let component = this.container.createComponent(componentFactory);
    let childComponent = component.instance;
    childComponent.unique_key=++this.child_unique_key;
    childComponent.parentRef = this;

    // Push the component so that we can keep track of which components are created
    this.componentsReferences.push(component);
    }
  }

  removeComponent(key:number) {
    if(this.container.length<1 )return;
    let componentRef = this.componentsReferences.filter(
      x=> x.instance.unique_key ==key)[0];
      let vcrIndex:number = this.container.indexOf(componentRef.hostView);
      this.container.remove(vcrIndex);
      this.componentsReferences = this.componentsReferences.filter(
        x => x.instance.unique_key !== key
      );
    
  }
  sendAll(){

    //to be modified to send to other components
    for(var x of this.componentsReferences){
      console.log(x.instance.sendEvent())
    }

  }

  ngOnInit(): void {
  }

}
