import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  // Bei einer Componente mit Namen "MeineKomponente" und benötigten Daten "MeineDaten"
  // constructor(
  //   public dialogRef: MatDialogRef<MeineKomponente>,
  //   @Inject(MAT_DIALOG_DATA) public data: MeineDaten,
  // ) {}

  // Dialog beenden
  // this.dialogRef.close(...);
  // oder <button mat-button [mat-dialog-close]="data.animal">Ok</button>
  
  openDialog(component: ComponentType<unknown>, config?: MatDialogConfig<any>) : Observable<any> {
    const dialogRef = this.dialog.open(component, config);
    return dialogRef.afterClosed();
  }
}