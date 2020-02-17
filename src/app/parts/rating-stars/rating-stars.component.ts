import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent implements OnInit {
  @Input() rating = 0;
  @Input() color = '#FDCC0D';
  star = 'star';
  starBorder = 'star_border';
  starHalf = 'star_half';
  rate1 = this.starBorder;
  rate2 = this.starBorder;
  rate3 = this.starBorder;
  rate4 = this.starBorder;
  rate5 = this.starBorder;
  constructor() { }

  ngOnInit() {
    if (this.rating === 5) {
      this.rate1 = this.rate2 = this.rate3 = this.rate4 = this.rate5 = this.star;
    } else if (this.rating > 4 && this.rating < 5) {
      this.rate1 = this.rate2 = this.rate3 = this.rate4 = this.star;
      this.rate5 = this.starHalf;
    } else if (this.rating === 4) {
      this.rate1 = this.rate2 = this.rate3 = this.rate4 = this.star;
    } else if (this.rating > 3 && this.rating < 4) {
      this.rate1 = this.rate2 = this.rate3 = this.star;
      this.rate4 = this.starHalf;
    } else if (this.rating === 3) {
      this.rate1 = this.rate2 = this.rate3 = this.star;
    } else if (this.rating > 2 && this.rating < 3) {
      this.rate1 = this.rate2 = this.star;
      this.rate3 = this.starHalf;
    } else if (this.rating === 2) {
      this.rate1 = this.rate2 = this.star;
    } else if (this.rating > 1 && this.rating < 2) {
      this.rate1 = this.star;
      this.rate2 = this.starHalf;
    } else if (this.rating === 1) {
      this.rate1 = this.star;
    } else if (this.rating > 0 && this.rating < 1) {
      this.rate1 = this.starHalf;
    }
  }
}
