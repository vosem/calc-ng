import { Component, OnInit } from '@angular/core';
import { Insurant } from '../insurant';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  sex = ['m', 'f'];

  model = new Insurant('Hello', this.sex[0], 18, 32);

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
