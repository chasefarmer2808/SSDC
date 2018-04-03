import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
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

  columnsToDisplay: Array<string> = ['actions', 'name', 'role'];
  officersDataSource: OfficerDataSource;
  serverUrl: string = environment.serverUrl;
  selectedRows: SelectionModel<Officer>
  deleting: boolean = false;
  deleteSuccess: boolean = false;
  deleteError: any;

  constructor(private officersService: OfficersService,
              private officerDialog: MatDialog) {
    this.selectedRows = new SelectionModel<Officer>(true, []);
  }

  ngOnInit() {
    this.officersDataSource = new OfficerDataSource(this.officersService);
    this.officersDataSource.loadOfficers();
    this.officerDialog.afterAllClosed.subscribe(() => {
      this.officersDataSource.loadOfficers();
    });
  }

  openOfficerDialog() {
    this.officerDialog.open(OfficerDialog, {data: new Officer()});
  }

  openUpdateOfficerDialog(officer: Officer) {
    this.officerDialog.open(OfficerDialog, {data: officer});
  }

  deleteSelectedOfficers() {
    this.deleting = true;
    this.officersService.deleteOfficerMany(this.selectedRows.selected)
      .subscribe(
        (res) => {
          this.officersDataSource.loadOfficers();
          this.selectedRows.clear();
          this.deleteSuccess = true;
          this.deleting = false;
          console.log(res);
        },
        (err) => {
          this.deleteSuccess = false;
          this.deleteError = err;
          this.deleting = false;
          console.log(err);
        }
      );
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
export class OfficerDialog {
  officerForm: FormGroup;
  officerPhoto: File;
  addingOfficer: boolean = false;
  addOfficerSuccess: boolean = false;
  addMode: boolean = false;
  addOfficerError: any;
  previewImageUrl: string;

  @ViewChild('previewImage') previewImage: ElementRef;

  constructor(public dialogRef: MatDialogRef<OfficerDialog>, 
              private officersService: OfficersService,
              @Inject(MAT_DIALOG_DATA) public officerData: Officer) {
    this.createOfficerForm();
    this.determineDialogMode(officerData);
  }

  createOfficerForm() {
    this.officerForm = new FormGroup({
      firstName: new FormControl(this.officerData.firstName, [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      lastName: new FormControl(this.officerData.lastName, [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      role: new FormControl(this.officerData.role, [Validators.required, Validators.pattern(lettersOnlyRegex)]),
      emailAddress: new FormControl(this.officerData.emailAddress, [Validators.required, Validators.pattern(emailPattern)]),
      bio: new FormControl(this.officerData.bio),
      photo: new FormControl(this.officerData.photo, Validators.required)
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
    this.officerForm.get('photo').setValue(imgFile);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.updatePreviewImageUrl(event.target.result);
    }
    reader.readAsDataURL(imgFile);
  }

  private determineDialogMode(officerData: Officer) {
    if (officerData.firstName === '') {
      this.addMode = true;
    } else {
      let imgUrl = `${environment.serverUrl}/${officerData.photo.filename}`;
      this.updatePreviewImageUrl(imgUrl);
    }
  }

  private constructFormData(): FormData {
    let formData = new FormData();

    for (let key of Object.keys(this.officerForm.value)) {
      formData.append(key, this.officerForm.get(key).value);
    }

    return formData;
  }

  private updatePreviewImageUrl(url: string) {
    this.previewImageUrl = url;
  }
}
