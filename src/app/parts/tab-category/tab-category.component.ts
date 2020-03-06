import { CATEGORIES, Category } from '../category.class';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConditionFacade } from 'src/app/store/condition/facades';

@Component({
  selector: 'app-tab-category',
  templateUrl: './tab-category.component.html',
  styleUrls: ['./tab-category.component.scss'],
})
export class TabCategoryComponent implements OnInit {
  backgroundColor = '#81d6f8';
  color = '#f0fff3';
  categories: Category[] = CATEGORIES;
  private onDestroy$ = new Subject();
  category$: Observable<Category> = this.conditionFacade.category$;
  category?: Category;
  constructor(private conditionFacade: ConditionFacade) {}

  ngOnInit() {
    this.category$.pipe(takeUntil(this.onDestroy$)).subscribe((category) => {
      this.category = category;
    });
  }

  onTabClick(event: MatTabChangeEvent): void {
    this.conditionFacade.setCategory(this.categories[event.index]);
  }
}
