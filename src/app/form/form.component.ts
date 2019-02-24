import { Component, OnInit } from "@angular/core";
import { Insurant } from "../insurant";
import { SendDataService } from "../send-data.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent {
  sex = ['Masculine', 'Feminine'];

  model = new Insurant("Hello", this.sex[0], 18, 32);
  // model : Insurant = {
  //   name: 'Hello',
  //   sex: this.sex[0],
  //   age: 18,
  //   term: 32
  // };

  submitted = false;

  onSubmit() {
    this.submitted = true;

    // let dataToSend = JSON.stringify(this.model);
    //     console.log(dataToSend);
    //     return dataToSend;
  }

  newInsurant() {
    this.model = new Insurant("Hello", this.sex[0], 18, 32);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
