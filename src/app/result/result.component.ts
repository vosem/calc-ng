import { Component, OnInit, Input } from '@angular/core';
import { SendDataService } from '../send-data.service';
import { FormComponent } from '../form/form.component';
import { Insurant } from '../insurant';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  providers: [SendDataService, FormComponent]
})
export class ResultComponent implements OnInit {
  insurant : Insurant; // this was getting data from '../insurant'
  // sum : string = '0';
  @Input() sum: number; // this is getting data from formComponent

  constructor(private sendDataService: SendDataService,
    private formComponent: FormComponent) {
    // this.sum = this.sendDataService.sum;
  }
  
  showInsurant() {
    this.sendDataService.getInsurant()
    .subscribe((data: Insurant) => this.insurant = { ...data });
  }

  ngOnInit() {
    this.showInsurant();
    // this.showSum();
  }

}
