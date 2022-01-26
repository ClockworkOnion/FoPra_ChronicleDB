import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getShortEventString } from '../model/ChronicleEvent';
import { ChronicleStream } from '../model/ChronicleStream';
import { ChronicleService } from '../services/chronicle.service';
import { GetFlankService } from '../services/rest services/get-flank.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface TimeTravelData {
  lowerBound: number;
  upperBound: number;
  typeSelector: string;
}
export const inclusiveString = 'Inclusive';
@Component({
  selector: 'app-time-travel',
  templateUrl: './time-travel.component.html',
  styleUrls: ['./time-travel.component.css'],
})
export class TimeTravelComponent implements AfterViewInit {
  // @ViewChild(MatTable) datatable!: MatTable<any>;
  columnNames: string[] = []; // table headers
  columnNamesForTable: string[] = []; // table headers
  data: string[][] = [];
  dataSource = new MatTableDataSource();

  outputInfo: string | null = null; // string to be displayed inside HTML: if null, not displayed at all

  private currentStream!: ChronicleStream | null;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.detectPageAndSort();
  }

  //////////////////////////////////////////////////////////
  ///////////////////// Validator //////////////////////////
  intervalFormControl = new FormGroup(
    {
      lowerBound: new FormControl(0, [Validators.required, Validators.min(0)]),
      upperBound: new FormControl(50, [Validators.required, Validators.min(0)]),
      typeSelector: new FormControl('Exclusive'),
    },
    { validators: this.validateIntervalInput }
  );

  validateIntervalInput(control: AbstractControl) {
    const min = control.get('lowerBound');
    const max = control.get('upperBound');
    const type = control.get('typeSelector');

    if (
      min == null ||
      min.value == null ||
      max == null ||
      max.value == null ||
      type == null ||
      type.value == null
    ) {
      console.error('Fehler bei TimeTravel Intervallvalidation');
      return null;
    }
    if (max.value < min.value + (type.value == inclusiveString ? 0 : 1)) {
      // wenn exclusiv muss +1 aufs minimum
      return { interval: 'Interval not correct!' };
    } else {
      return null;
    }
  }
  //////////////////////////////////////////////////////////

  constructor(
    private chronicleService: ChronicleService,
    private snackBar: SnackBarService,
    private flankService: GetFlankService,
    public dialogRef: MatDialogRef<TimeTravelComponent>,
    private changeDetector: ChangeDetectorRef // ViewChild aktualisieren gegen ngIf
  ) {
    this.chronicleService.selectedStream$.subscribe((stream) => {
      this.currentStream = stream;
    });
  }

  timeTravel() {
    this.chronicleService
      .timeTravel(this.intervalFormControl.value as TimeTravelData)
      .subscribe((response) => {
        this.resetData();
        this.createColumnHeaders();
        this.createTableHeaders();

        let json: any[] = JSON.parse(response);
        json.forEach((entry) => {
          this.data.push(this.adaptEntryToColumnDefinition(entry));
        });

        this.generateStringView();
        this.dataSource.data = this.data;

        this.detectPageAndSort();
      });
  }

  private detectPageAndSort() {
    this.changeDetector.detectChanges();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  createColumnHeaders() {
    this.columnNames.push('Timestamp');

    // if (this.currentStream!.compoundType == EventCompoundType.single) {
    //   let text : string = "";
    //   switch (this.currentStream!.event![0].singleOrList) {
    //     case EventElementSingleOrList.constList:
    //       text = "Const List of "
    //       break;
    //     case EventElementSingleOrList.varList:
    //       text = "Var List of "
    //       break;
    //     default:
    //       break;
    //   }

    //   text += this.currentStream!.event![0].type;
    //   this.columnNames.push(text);
    // } else {
    this.currentStream?.event?.forEach((event) =>
      this.columnNames.push(getShortEventString(event))
    );

    // }

    // for (let l = 0; l < json[0].payload[comptype].length; l++) {
    //   for (var key in json[0].payload[comptype][l]) {
    //     if (!this.columnNames.includes(key)) {
    //       this.columnNames.push(key);
    //     }
    //   }
    // }
    // ha lol ein Fehler
  }

  createTableHeaders() {
    this.columnNames.forEach((column) => {
      let amount = this.getNumberOfOccurences(column);
      this.columnNamesForTable.push(
        column + (amount > 0 ? ' (' + amount + ')' : '')
      );
    });
  }

  private getNumberOfOccurences(name: string): number {
    let counter = 0;
    this.columnNamesForTable.forEach((column) => {
      if (column.startsWith(name)) {
        counter++;
      }
    });
    return counter;
  }

  adaptEntryToColumnDefinition(entry: { payload: any; t1: number }): string[] {
    let entryKeys: string[];
    let entryValues: string[];
    if (entry.payload['Compound'] || entry.payload['VarCompound']) {
      entryKeys = this.getKeysOfCompoundPayload(entry.payload);
      entryValues = this.getValuesOfCompoundPayload(entry.payload);
    } else {
      entryKeys = Object.keys(entry.payload);
      entryValues = [entry.payload[Object.keys(entry.payload)[0]]];
    }

    let rowValues: string[] = [];
    rowValues.push('' + entry.t1);

    let entryIndex = 0;
    for (let index = 1; index < this.columnNames.length; index++) {
      // Wir starten column bei 1, weil wir den Timestamp ja schon haben, daher length-1
      const currentColumn: string = this.columnNames[index];

      if (currentColumn == entryKeys[entryIndex]) {
        rowValues.push(entryValues[entryIndex]);
        entryIndex++;
      } else {
        rowValues.push('-');
      }
    }

    return rowValues;
  }

  /**
   * Nimmt den Payload eines Component-Eintrags und gibt die Typen der Komponenten zurück.
   * Z.B. Ein Eintrag hat einen I8 und einen ConstString,
   * dann bekommt man folgendes zurück ["I8", "ConstString"].
   *
   * {"payload": {"Compound": [{"I8": 5}, {"U8": 9}]}} -> ["I8", "U8"]
   */
  getKeysOfCompoundPayload(payload: any): string[] {
    let result: string[] = [];
    (payload[Object.keys(payload)[0]] as any[]).forEach((component: any) =>
      result.push(Object.keys(component)[0])
    );
    return result;
  }

  /**
   * Nimmt den Payload eines Component-Eintrags und gibt die Verte der Komponenten zurück.
   * Z.B. Ein Eintrag hat einen I8 und einen ConstString,
   * dann bekommt man folgendes zurück ["I8", "ConstString"].
   *
   * {"payload": {"Compound": [{"I8": 5}, {"U8": 9}]}} -> [5, 9]
   */
  getValuesOfCompoundPayload(payload: any): string[] {
    let result: string[] = [];
    (payload[Object.keys(payload)[0]] as any[]).forEach((component: any) =>
      result.push(component[Object.keys(component)[0]])
    );
    return result;
  }

  generateStringView() {
    this.outputInfo = `Received ${this.data.length} entries\n`;
    this.data.forEach((entry) => {
      this.outputInfo += '\n';
      for (let index = 0; index < entry.length; index++) {
        const value = entry[index];
        this.outputInfo += `${this.columnNames[index]}: ${value}\n`;
      }
    });
  }

  resetData() {
    this.outputInfo = '';
    this.columnNames = [];
    this.columnNamesForTable = [];
    this.data = [];
  }

  closeDialog() {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}