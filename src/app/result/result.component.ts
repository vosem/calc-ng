import { Component, OnInit } from '@angular/core';
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
  insurant : Insurant;
  sum : string = '0';

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
    this.sendDataService.sendInsurant(this.insurant)
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
