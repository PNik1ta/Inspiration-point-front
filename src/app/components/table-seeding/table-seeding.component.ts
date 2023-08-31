import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-seeding',
  templateUrl: './table-seeding.component.html',
  styleUrls: ['./table-seeding.component.scss']
})
export class TableSeedingComponent {
  @Input('hasInfoBlock') hasInfoBlock: boolean = true;
}
