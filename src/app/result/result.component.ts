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
  sum : string = '0';
  // @Input() insurant: insurant; // this is getting data from formComponent

  constructor(private sendDataService: SendDataService,
    private formComponent: FormComponent) {
    // this.sum = this.sendDataService.sum;
  }
  
  showInsurant() {
    this.sendDataService.getInsurant()
    .subscribe((data: Insurant) => this.insurant = { ...data });
  }

  showSum() {
    // console.log(this.insurant);
    // console.log(this.formComponent.diagnostic);
    this.sendDataService.sendInsurant(this.formComponent.model)
      .subscribe(data => {
         this.sum = JSON.stringify(data);
         console.log(this.sum);
      })
    return this.sum;
  }

  ngOnInit() {
    this.showInsurant();
    // this.showSum();
  }

}
