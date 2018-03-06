import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FacebookService } from '../services/facebook/facebook.service';
import { ScrollInfoDirective } from '../directives/onscroll/onscroll.directive';
import { Album } from '../gallery/album';
import { Photo } from '../gallery/photo';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../app.component.css'],
  providers: [ FacebookService ]
})
export class GalleryComponent implements OnInit {

  albums:Album[];
  selectedAlbum:Photo[];
  selectedAlbumName:String;
  getAlbumsError:String;
  getAlbumError:String;
  rightArrowVisible:boolean;
  leftArrowVisible:boolean;
  yScrollLimit:number;

  readonly SCROLL_SPEED:number = 5;

  @ViewChild('albumsContainer') albumsContainer: ElementRef;

  constructor(private facebookService: FacebookService, private renderer: Renderer2) {
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
            this.albums = albums.data;
            this.showRightArrow();

            if (this.albums.length > 0) {
              this.getAlbum(this.albums[0]);
            }
          },
          error => this.getAlbumsError = error
        );
  }

  getAlbum(album:Album) {
    this.selectedAlbumName = album.name;
    this.facebookService.getAlbum(album.id)
        .subscribe(
          (album) => {
            this.selectedAlbum = album.data;
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
    this.smoothYScroll(this.albumsContainer, this.SCROLL_SPEED);
  }

  scrollLeft() {
    this.smoothYScroll(this.albumsContainer, -1*this.SCROLL_SPEED);
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
          element.nativeElement.scrollLeft == 0 || 
          this.rightArrowVisible == false) {
        clearInterval(scrollSmoother); // stop the interval
      }
    }, 1); // call every 1 millisecond
  }
}
