import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../services/facebook/facebook.service';
import { ScrollRightDirective } from '../directives/onscroll.directive';
import { Album } from '../gallery/album';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../app.component.css'],
  providers: [ FacebookService ]
})
export class GalleryComponent implements OnInit {

  albums:Album[];
  getAlbumsError:String;
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
            this.albums = albums
            this.showRightArrow();
          },
          error => this.getAlbumsError = error
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
