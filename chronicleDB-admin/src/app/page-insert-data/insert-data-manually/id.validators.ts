import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ChronicleStream } from 'src/app/model/ChronicleStream';
import { ChronicleService } from 'src/app/services/chronicle.service';

@Injectable()
export class IDValidators {
  selectedStream!: ChronicleStream | null;

  constructor(private chronicle: ChronicleService) {}

  largerThanPreviousId(streamId: number): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve, reject) => {
        this.chronicle.getMaxKey(streamId).then((value) => {
          if (value === "Empty Index" || control.value > value) {
            resolve(null);
          } else {
            resolve({ chronicleMaxIndex: value });
          }
        });
      });
    };
  }
}
