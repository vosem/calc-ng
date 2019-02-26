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

  model = new Insurant("Hello", this.sex[0], 18, 32);

  submitted = false;


  onSubmit() {
    this.submitted = true;
  }

  newInsurant() {
    // this.model = new Insurant("Good-Buy", this.sex[1], 30, 20);
    console.log(this.model);
    return JSON.stringify(this.model);
  }

  transferInsurant(){
    this.sendDataService.sendInsurant(this.model)
    .subscribe((data: Insurant) => this.model = { ...data });
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
