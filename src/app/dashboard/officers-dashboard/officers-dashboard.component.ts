import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { OfficersService } from 'app/services/officers/officers.service';
import { OfficerDataSource } from 'app/services/officers/officer-data-source';

import { StatusMessageComponent } from 'app/status-message/status-message.component';

import { Officer } from 'app/services/officers/officer';
import { environment } from 'environments/environment';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const lettersOnlyRegex = /^[a-zA-Z\s]+$/;

@Component({
  selector: 'app-officers-dashboard',
  templateUrl: './officers-dashboard.component.html',
  styleUrls: [
    './officers-dashboard.component.css',
    '../dashboard.component.css',
    '../../app.component.css'
  ]
})
export class OfficersDashboardComponent implements OnInit {

  columnsToDisplay: Array<string> = ['photo', 'name', 'role'];
  officersDataSource: OfficerDataSource;
  serverUrl: string = environment.serverUrl;
  selectedRows: SelectionModel<Officer>
  dataSaving: boolean = false;
  deleting: boolean = false;

  constructor(private officersService: OfficersService,
              private addOfficerDialog: MatDialog) {
    this.selectedRows = new SelectionModel<Officer>(true, []);
  }

  ngOnInit() {
    this.officersDataSource = new OfficerDataSource(this.officersService);
    this.officersDataSource.loadOfficers();
    this.addOfficerDialog.afterAllClosed.subscribe(() => {
      this.officersDataSource.loadOfficers();
    });
  }

  openAddOfficerDialog() {
    this.addOfficerDialog.open(AddOfficerDialog);
  }

}

@Component({
  selector: 'add-officer-dialog',
  templateUrl: 'add-officer-dialog.html',
  styleUrls: [
    './officers-dashboard.component.css',
    '../dashboard.component.css',
    '../../app.component.css'
  ]
})
export class AddOfficerDialog {
  addOfficerForm: FormGroup;
  officerPhoto: File;
  addingOfficer: boolean = false;
  addOfficerSuccess: boolean = false;
  addOfficerError: any;
  previewImageUrl: string;

  @ViewChild('previewImage') previewImage: ElementRef;

  constructor(public dialogRef: MatDialogRef<AddOfficerDialog>, 
              private officersService: OfficersService) {
    this.createAddOfficerForm();
    
  }

  createAddOfficerForm() {
    this.addOfficerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      role: new FormControl('', [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      emailAddress: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
      bio: new FormControl(''),
      photo: new FormControl(null, Validators.required)
    });
  }

  addOfficer() {
    let formData = this.constructFormData();
    this.addingOfficer = true;
    this.officersService.createOfficer(formData)
      .subscribe(
        (res) => {
          this.addingOfficer = false;
          this.addOfficerSuccess = true;
          console.log('success: ', res);
        },
        (err) => {
          this.addingOfficer = false;
          this.addOfficerSuccess = false;
          this.addOfficerError = err;
          console.log('err: ', err);
        }
      );
  }

  handlePhotoUpload(imgFile: File) {
    this.addOfficerForm.get('photo').setValue(imgFile);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImageUrl = event.target.result;
    }
    reader.readAsDataURL(imgFile);
  }

  private constructFormData(): FormData {
    let formData = new FormData();

    for (let key of Object.keys(this.addOfficerForm.value)) {
      formData.append(key, this.addOfficerForm.get(key).value);
    }

    return formData;
  }
}
