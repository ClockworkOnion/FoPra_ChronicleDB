import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JavaChronicleService } from 'src/app/java/services/java-chronicle.service';
import { ChronicleJavaAttributeType } from 'src/app/model/JavaChronicle';
import { SnackBarService } from 'src/app/services/snack-bar.service';

import { JavaInsertComponent } from './java-insert.component';

describe('JavaInsertComponent', () => {
  let component: JavaInsertComponent;
  let javaChronicleService: JavaChronicleService;
  let snackBarService: SnackBarService;
  let data: {name: string};
  let getStreamSpy: jasmine.Spy;

  beforeEach(async () => {
    snackBarService = jasmine.createSpyObj("SnackBarService", ["openRedSnackBar"]);
    javaChronicleService = new JavaChronicleService(jasmine.createSpyObj("HttpClient", ["get", "post"]), snackBarService);
    getStreamSpy = spyOn(javaChronicleService, "getStream").and.returnValue(
      {
        name: "Test", 
        eventCount: 5, 
        schema: [{name: "X", type: ChronicleJavaAttributeType.INTEGER}, {name: "Y", type: ChronicleJavaAttributeType.BOOLEAN}]
      }
    )
    data = {name: "Hallo"};
    component = new JavaInsertComponent(javaChronicleService, data, snackBarService);

  });
  
  it("ngOnInit: success", () => {
    component.ngOnInit();
    expect(getStreamSpy).toHaveBeenCalled();
  })

  it("parseEventElementToCorrectType: success", () => {
    component.ngOnInit();
    expect(component.parseEventElementToCorrectType("48", "X")).toBe(48);
  })

  it("parseEventElementToCorrectType: fail", () => {
    component.ngOnInit();
    component.parseEventElementToCorrectType("48", "Z");
    expect(snackBarService.openRedSnackBar).toHaveBeenCalled();
  })
});
