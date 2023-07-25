import { Component, Input } from '@angular/core';
import { University } from 'src/app/interface/university.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() universities: University[] = [];

}
