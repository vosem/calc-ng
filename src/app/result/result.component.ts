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
  sum : number;

  constructor(private sendDataService: SendDataService) { }
  
  showInsurant() {
    this.sendDataService.getInsurant()
    .subscribe((data: Insurant) => this.insurant = { ...data });
  }

  showSum() {
    this.sendDataService.sendInsurant;
  }

  ngOnInit() {
    this.showInsurant();
    // this.showSum();
  }

}
