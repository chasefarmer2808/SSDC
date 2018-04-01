import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.css']
})
export class StatusMessageComponent implements OnInit {

  @Input() success: boolean;
  @Input() failMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
