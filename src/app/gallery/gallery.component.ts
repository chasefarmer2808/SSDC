import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../services/facebook/facebook.service';
import { ScrollRightDirective } from '../directives/onscroll.directive';
import { Album } from '../gallery/album';
import { Photo } from '../gallery/photo';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../app.component.css'],
  providers: [ FacebookService ]
})
export class GalleryComponent implements OnInit {

  albums:Album[];
  selectedAlbum:Photo[];
  getAlbumsError:String;
  getAlbumError:String;
  rightArrowVisible:boolean;
  leftArrowVisible:boolean;

  constructor(private facebookService: FacebookService) {
    this.hideLeftArrow();
    this.hideRightArrow();
  }

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.facebookService.getAlbums()
        .subscribe(
          (albums) => {
            this.albums = albums;
            this.showRightArrow();
          },
          error => this.getAlbumsError = error
        );
  }

  getAlbum(album) {
    this.facebookService.getAlbum(album.id)
        .subscribe(
          (album) => {
            this.selectedAlbum = album;
          },
        error => this.getAlbumError = error
        );
  }

  hideRightArrow() {
    this.rightArrowVisible = false;
  }

  showRightArrow() {
    this.rightArrowVisible = true;
  }

  hideLeftArrow() {
    this.leftArrowVisible = false;
  }

  showLeftArrow() {
    this.leftArrowVisible = true;
  }
}
