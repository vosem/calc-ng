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
  sum : number;

  model = new Insurant("Hello", this.sex[0], 18, 32);

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
    return this.sendDataService.sendInsurant(this.model)
    .subscribe(data => {
        console.log(data); // response from server
        console.log(typeof data);
        this.sum = +data;
        console.log(this.sum);
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
