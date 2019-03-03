import { Component, OnInit } from "@angular/core";
import { Insurant } from "../insurant";
import { SendDataService } from '../send-data.service';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  providers: [SendDataService]
})
export class FormComponent {

  constructor(private sendDataService: SendDataService) { }
  sex = ['Masculine', 'Feminine'];
  sum;

  model = new Insurant("Hello", this.sex[0], 18, 32, 1000);

  submitted = false;


  onSubmit() {
    this.submitted = true;
  }

  newInsurant() {
    console.log(this.model);
    return JSON.stringify(this.model);
  }

  transferInsurant(){
    return this.sendDataService.sendInsurant(this.model)
    .subscribe((data: Insurant) => this.model = { ...data });
  }

  getSum(){
    let premium = this.model.premium;
    return this.sendDataService.sendInsurant(this.model)
    .subscribe(data => {
        console.log(data); // response from server
        console.log(typeof data);
        console.log(premium);
        console.log(typeof premium);
        if(data == null) {
          this.sum = 'Please try shorter term!'
        } else {
          this.sum = Math.round(premium/+data);
        }
        console.log(this.sum);
        this.showSum();
      });
  }
  showSum(){
    let result = document.getElementsByClassName("result")[0];
    result.classList.add('shown');
    console.log(result);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
