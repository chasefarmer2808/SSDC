import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Photo } from '../../photo';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  selectedPhoto: Photo;
  selectedPhotoIndex: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.selectedPhotoIndex = this.data.index;
    this.selectedPhoto = this.data.photos[this.selectedPhotoIndex];
  }

  nextPhoto() {
    if (this.lastPhotoSelected()) {
      return;
    }

    this.selectedPhotoIndex++;
    this.selectedPhoto = this.data.photos[this.selectedPhotoIndex];
  }

  prevPhoto() {
    if (this.firstPhotoSelected()) {
      return;
    }

    this.selectedPhotoIndex--;
    this.selectedPhoto = this.data.photos[this.selectedPhotoIndex];
  }

  firstPhotoSelected() {
    return this.selectedPhotoIndex === 0;
  }

  lastPhotoSelected() {
    return this.selectedPhotoIndex === this.data.photos.length - 1;
  }

}
