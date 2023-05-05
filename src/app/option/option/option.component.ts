import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Option } from '../option';
import { OptionService } from '../option.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  option: Option = {
    id: 0,
    name: '',
    optionTypeId: 0
  };

  options: Option[] = [];
  option$: Subscription = new Subscription();
  deleteOption$: Subscription = new Subscription();
  isLoading = true;
  errorMessage: string = '';
  constructor(private optionService: OptionService, private router: Router) {}

  ngOnInit(): void {
    console.log('In option');
    this.getOptions();
    console.log(this.isLoading);
  }

  ngOnDestroy(): void {
    this.option$.unsubscribe();
  }

  getOptions() {
    this.option$ = this.optionService.getOptions().subscribe(result => {
      this.options = result;
      this.isLoading = false;
      console.log('alle options ', this.options);
    });
  }

  edit(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['option/edit'], { state: { id: id, mode: 'edit' } });
  }
  add() {
    this.router.navigate(['option/edit'], { state: { mode: 'add' } });
  }
}
