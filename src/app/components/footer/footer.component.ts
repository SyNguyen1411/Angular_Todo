import { Component } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/fitering.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  filterButtons : FilterButton[] = [
    {type: Filter.All,  label:"All", isActive: true},
    {type: Filter.Active,  label:"Active", isActive: false},
    {type: Filter.Complete,  label:"Complete", isActive: false}
  ]

  length = 0;
}
