import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../services/facebook/facebook.service';
import { Album } from '../gallery/album';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../app.component.css'],
  providers: [ FacebookService ]
})
export class GalleryComponent implements OnInit {

  albums:Album[];

  constructor(private facebookService: FacebookService) {

  }

  ngOnInit() {
    this.getGalleries();
  }

  getGalleries() {
    this.facebookService.getAlbums()
        .then((albums) => {
          this.albums = albums;
        });
  }

}
