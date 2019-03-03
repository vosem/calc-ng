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
  @Input() sum; // this is getting data from formComponent
  @Input() term: number; // this is getting data from formComponent
  @Input() premium: number; // this is getting data from formComponent
 

  constructor(private sendDataService: SendDataService,
    private formComponent: FormComponent) {
    this.premium = this.formComponent.model.premium;
    this.term = this.formComponent.model.term;
  }
  
  showInsurant() {
    this.sendDataService.getInsurant()
    .subscribe((data: Insurant) => {
      this.insurant = { ...data };
      // if (this.sum == null) { this.sum = 'Please try shorter term'};
    });
  }

  hideResult() {
    let result = document.getElementsByClassName("result")[0];
    result.classList.remove('shown');
  }

  ngOnInit() {
    this.showInsurant();
  }

}
