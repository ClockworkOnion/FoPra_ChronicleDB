import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JavaChronicleService } from 'src/app/java/services/java-chronicle.service';
import { ChronicleJavaAttributeType, ChronicleJavaStreamInfo } from 'src/app/model/JavaChronicle';
import { SnackBarService } from 'src/app/services/snack-bar.service';

export const CSV_SEPERATOR: string = ";";
export const CSV_DEZIMAL_POINT: string = ",";
export const CSV_TIMESTAMP_HEADER: string = "TSTART";

@Component({
  selector: 'app-java-insert',
  templateUrl: './java-insert.component.html',
  styleUrls: ['./java-insert.component.css']
})
export class JavaInsertComponent implements OnInit {

  streamInfo!: ChronicleJavaStreamInfo;
  tableSchema: string = "";

  fileName!: string;
  parsingSuccessfull : boolean = false;
  fileContent!: string;
  insertJson!: any[];

  constructor(private javaChronicle: JavaChronicleService, @Inject(MAT_DIALOG_DATA) public data: {name: string}, private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.streamInfo = this.javaChronicle.getStream(this.data.name)!;
    this.streamInfo.schema.forEach(attr => {
      this.tableSchema += `${attr.name} (${attr.type}), `;
    })
    this.tableSchema = this.tableSchema.substring(0, this.tableSchema.length - 2);
    this.tableSchema += " and TSTART."
  }

  onFileSelected(event: any) {
    if (!event.target) return;

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        self.fileContent = fileReader.result as string;

        if (file.name.endsWith(".csv")) {
          self.parseCSVToJSON();
        } else {
          try {
            self.insertJson = JSON.parse(fileReader.result as string);
            self.parsingSuccessfull = true;
            self.snackBar.openGreenSnackBar("Parsing of File to JSON successfull!");
          } catch (error) {
            self.parsingSuccessfull = false;
            self.snackBar.openRedSnackBar("Parsing of File to JSON failed!");
          }
        }
      };
      fileReader.readAsText(file);

    }
  }

  onInsertEventClicked() {
    this.javaChronicle.insert(this.data.name, this.insertJson);
  }

  
  parseCSVToJSON() {
    let lines: string[] = this.fileContent.split("\r\n");
    let result: any[] = [];
  
    let headers: string[] = lines[0].split(CSV_SEPERATOR);
  
    for (let index = 1; index < lines.length; index++) {
      const currentLine = lines[index];
      if (currentLine.length == 0) {
        continue;
      }
      let newEntry: any = {};
  
      const currentEntry:string[] = currentLine.split(CSV_SEPERATOR)
      for (let i = 0; i < currentEntry.length; i++) {
        const element = currentEntry[i];
        let header = headers[i];
        
        if (element.length == 0) {
          newEntry[header] = null;
        } else {
          if (header == CSV_TIMESTAMP_HEADER) { // allows own TimestampHeader in CSV
            header = "TSTART";
          }
          newEntry[header] = this.parseEventElementToCorrectType(element, header);
        }

      }
  
      result.push(newEntry);
    }
    this.insertJson = result;
    this.snackBar.openGreenSnackBar("Parsing of CSV successfull!")
  }

  /**
   * Nimmt einen einzigen Eintrag aus der CSV Tabelle und parst diesesn zu dem Typ,
   * den der Header vorgibt
   * @param element ein Eintrag der CSV
   * @param headerName Header der Spalte von dem Eintrag
   * @returns element in dem passenden Typ zur Spalte
   */
  parseEventElementToCorrectType(element: string, headerName: string) : any {
    if (headerName.toUpperCase() == CSV_TIMESTAMP_HEADER) {
      return Number(element);
    }

    let type = this.getTypeOfHeader(headerName);
    if (!type) this.snackBar.openRedSnackBar(`The Header ${headerName} is not contained in the schema of Stream ${this.data.name}!`);

    switch (type) {
      case ChronicleJavaAttributeType.BOOLEAN:
        return element.toLowerCase() == 'true'
      case ChronicleJavaAttributeType.STRING:
        return element;
      default:
        return Number(element.replace(CSV_DEZIMAL_POINT, "."));
    }
  }

  /**
   * Returns the type of one element of the schema. e.g. "DOUBLE"
   * @param name of the schema element
   */
  getTypeOfHeader(name: string) : ChronicleJavaAttributeType | null {
    for (let attr of this.streamInfo.schema) {
      if (attr.name == name) {
        return attr.type;
      }
    }
    return null;
  }
}
