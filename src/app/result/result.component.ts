import { Component, OnInit } from '@angular/core';
import { SendDataService } from '../send-data.service';
import { Insurant } from '../insurant';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [SendDataService]
})
export class ResultComponent implements OnInit {
  insurant : Insurant;
  constructor(private sendDataService: SendDataService) { }

  ngOnInit() {
    this.sendDataService.getData().subscribe((data:Insurant) => this.insurant=data);
  }

}
