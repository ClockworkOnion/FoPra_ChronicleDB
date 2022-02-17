import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JavaChronicleService } from 'src/app/java/services/java-chronicle.service';
import { ChronicleJavaStreamAttribute, ChronicleJavaStreamInfo } from 'src/app/model/JavaChronicle';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-java-query',
  templateUrl: './java-query.component.html',
  styleUrls: ['./java-query.component.css']
})
export class JavaQueryComponent implements OnInit {
  // @ViewChild(MatTable) datatable!: MatTable<any>;
  columnNames: string[] = []; // table headers
  dataSource = new MatTableDataSource();

  requestSchema: ChronicleJavaStreamAttribute[] = []

  outputInfo: string | null = null; // string to be displayed inside HTML: if null, not displayed at all

  private streamInfo!: ChronicleJavaStreamInfo;

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
      appendFrom: new FormControl(true),
      queryString: new FormControl("", [ Validators.required, Validators.minLength(8)])
    },
    { validators: this.validateIntervalInput }
  );

  validateIntervalInput(control: AbstractControl) {
    const min = control.get('lowerBound');
    const max = control.get('upperBound');

    if (
      min == null ||
      min.value == null ||
      max == null ||
      max.value == null
    ) {
      console.error('Fehler bei TimeTravel Intervallvalidation');
      return null;
    }
    if (max.value < min.value) {
      // wenn exclusiv muss +1 aufs minimum
      return { interval: 'Interval not correct!' };
    } else {
      return null;
    }
  }
  //////////////////////////////////////////////////////////

  constructor(
    private snackBar: SnackBarService, private javaChronicle: JavaChronicleService,
    public dialogRef: MatDialogRef<JavaQueryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string},
    private changeDetector: ChangeDetectorRef, // ViewChild aktualisieren gegen ngIf
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    this.streamInfo = this.javaChronicle.getStream(this.data.name)!;
  }

  executeQuery() {
    this.resetData();
    this.getHeadersForTable().then(stop => {
      if (!stop)
        this.fillTableData()
      return stop   
    }).then(e => this.detectPageAndSort());
  }

  private getHeadersForTable() {
    return this.javaChronicle.schema(this.data.name, this.intervalFormControl.value).then(headerSchema => {
      console.log(headerSchema); 
      if (headerSchema.error) return true;

      this.requestSchema = headerSchema;
      this.requestSchema.forEach(attr => {
        this.columnNames.push(attr.name);
      })
      this.columnNames.push("tstart");
      this.columnNames.push("tend");
      return false;
    });
  }

  private fillTableData() {
    this.javaChronicle.query(this.data.name, this.intervalFormControl.value)
      .then(res => {
        this.dataSource.data = res;
        this.outputInfo = JSON.stringify(res);
      });
  }

  private detectPageAndSort() {
    this.changeDetector.detectChanges();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  resetData() {
    this.outputInfo = '';
    this.columnNames = [];
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

  copyResult() {
    this.clipboard.copy(this.outputInfo!);
    this.snackBar.openSnackBarwithStyle("Copied Query Results","green-snackbar");
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }
    console.log(true < false);
    console.log(false < false);
    console.log(false < true);
    console.log(true < true);
    

    this.dataSource.data = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);
    });

    function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
