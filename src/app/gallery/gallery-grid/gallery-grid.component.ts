import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Photo } from '../photo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-gallery-grid',
  templateUrl: './gallery-grid.component.html',
  styleUrls: ['./gallery-grid.component.css']
})
export class GalleryGridComponent implements OnInit {

  public _album = new BehaviorSubject<Photo[]>([]);

  @Input()
  set album(value) {
    this._album.next(value);
  };

  get album() {
    return this._album.getValue();
  }

  avgPhotoWidth:number = 0;
  avgPhotoHeight:number = 0;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this._album
      .subscribe(x => {
        if (x) {
          this.setAverages();
        }
      });
  }

  setAverages() {
    this.album.forEach((photo:Photo) => {
      this.avgPhotoWidth += photo.width;
      this.avgPhotoHeight += photo.height;
    })

    this.avgPhotoWidth /= this.album.length;
    this.avgPhotoHeight /= this.album.length;
  }

  refreshGrid(event, photoIndex:number) {
    let imgParentElement = event.target.parentElement;
    let photo:Photo = this.album[photoIndex];

    if (photo.width > this.avgPhotoWidth) {
      this.renderer.setStyle(imgParentElement, 'grid-column', 'span 2');
    } else if (photo.height > this.avgPhotoHeight) {
      this.renderer.setStyle(imgParentElement, 'grid-row', 'span 2');
    }
  }

}
