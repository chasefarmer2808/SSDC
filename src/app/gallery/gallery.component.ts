import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FacebookService } from '../services/facebook/facebook.service';
import { ScrollRightDirective } from '../directives/onscroll.directive';
import { Album } from '../gallery/album';
import { Photo } from '../gallery/photo';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../app.component.css'],
  providers: [ FacebookService ]
})
export class GalleryComponent implements OnInit, AfterViewChecked {

  albums:Album[];
  selectedAlbum:Photo[];
  selectedAlbumName:String;
  getAlbumsError:String;
  getAlbumError:String;
  rightArrowVisible:boolean;
  leftArrowVisible:boolean;
  yScrollLimit:number;
  albumButtonElements:HTMLElement[];
  firstAlbumIndex:number = 0;

  readonly SCROLL_SPEED:number = 5;

  @ViewChild('albumsContainer') albumsContainer: ElementRef;

  constructor(private facebookService: FacebookService, private renderer: Renderer2) {
    this.hideLeftArrow();
    this.hideRightArrow();
  }

  ngOnInit() {
    this.getGalleries();
  }

  ngAfterViewChecked() {
    this.getAlbumButtonElements();
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

  getAlbum(album:Album) {
    this.selectedAlbumName = album.name;
    this.facebookService.getAlbum(album.id)
        .subscribe(
          (album) => {
            this.selectedAlbum = album;
          },
        error => this.getAlbumError = error
        );
  }

  getAlbumButtonElements() {
    this.albumButtonElements = this.albumsContainer.nativeElement.querySelectorAll('button');
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

  smoothYScrollRight(element:ElementRef, offset:number) {
    let currentYScroll = element.nativeElement.scrollLeft;
    let yScrollRightLimit = currentYScroll + offset;

    let scrollSmoother = setInterval(() => {
      element.nativeElement.scrollLeft += this.SCROLL_SPEED;

      if (element.nativeElement.scrollLeft >= yScrollRightLimit) {
        clearInterval(scrollSmoother);
      }
    }, 1);
  }

  smoothYScrollLeft(element:ElementRef, offset:number) {
    let currentYScroll = element.nativeElement.scrollLeft;
    let yScrollLeftLimit = currentYScroll - offset;
    let isAllTheWayLeft = element.nativeElement.scrollLeft == 0;

    let scrollSmoother = setInterval(() => {
      element.nativeElement.scrollLeft -= this.SCROLL_SPEED;

      if (element.nativeElement.scrollLeft <= yScrollLeftLimit || isAllTheWayLeft) {
        clearInterval(scrollSmoother);
      }
    }, 1);
  }

  scrollRightToNextAlbum() {
    if (this.firstAlbumIndex < this.albumButtonElements.length) {
      let currentWidth = this.albumButtonElements[this.firstAlbumIndex].offsetWidth;
      this.firstAlbumIndex++;
      this.smoothYScrollRight(this.albumsContainer, currentWidth);
    }
  }

  scrollLeftToNextAlbum() {
    if (this.firstAlbumIndex > 0) {
      this.firstAlbumIndex--;
      let currentWidth = this.albumButtonElements[this.firstAlbumIndex].offsetWidth;
      this.smoothYScrollLeft(this.albumsContainer, currentWidth);
    }
  }
}
