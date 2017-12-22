import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  yScrollLimit:number;

  @ViewChild('albumsContainer') albumsContainer: ElementRef;

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

            if (this.albums.length > 0) {
              this.getAlbum(this.albums[0]);
            }
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

  scrollRight() {
    this.smoothYScroll(this.albumsContainer, 3);
  }

  scrollLeft() {
    this.smoothYScroll(this.albumsContainer, -3);
  }

  smoothYScroll(element:ElementRef, offset:number) {
    let currentYScroll = element.nativeElement.scrollLeft;  // get the current y scroll position (0 if all the way left)
    let yScrollRightLimit = currentYScroll + element.nativeElement.offsetWidth; // set the y scroll amount for right scrolling
    let yScrollLeftLimit = currentYScroll - element.nativeElement.offsetWidth; // set the y scroll amount for left scrolling

    // Using an interval to atificially create a linear smoothness
    let scrollSmoother = setInterval(() => {
      element.nativeElement.scrollLeft += offset; // scroll the div
      
      if (element.nativeElement.scrollLeft >= yScrollRightLimit || 
          element.nativeElement.scrollLeft <= yScrollLeftLimit || 
          this.rightArrowVisible == false || 
          this.leftArrowVisible == false) {
        clearInterval(scrollSmoother); // stop the interval
      }
    }, 1); // call every 1 millisecond
  }
}
