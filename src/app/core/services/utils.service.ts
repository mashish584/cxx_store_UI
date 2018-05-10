import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
  productFullStars = [];
  productHalfStars = [];
  productNoStars = [];

  reviewFullStars = [];
  reviewHalfStars = [];
  reviewNoStars = [];

  resetStars() {
    this.productFullStars = [];
    this.productHalfStars = [];
    this.productNoStars = [];

    this.reviewFullStars = [];
    this.reviewHalfStars = [];
    this.reviewNoStars = [];
  }

  calculateProductStars(product, index) {
    this.productFullStars.push([]);
    this.productHalfStars.push([]);
    this.productNoStars.push([]);
    product.average = product.average || 0;

    // Calculating number of full and half Stars
    for (let i = 0; i < parseInt(product.average, 10); i++) {
      this.productFullStars[index].push(1);
      if (this.productHalfStars[index].length === 0) {
        if (product.average % 1 === 0.5) {
          this.productNoStars[index].push(1);
        }
      }
    }

    // Calculating noStars
    let leftStars = 5 - (this.productFullStars[index].length + this.productHalfStars[index].length);
    for (let i = 0; i < leftStars; i++) {
      this.productNoStars[index].push(1);
    }
    return [this.productFullStars, this.productHalfStars, this.productNoStars];
  }

  calculateReviewStars(rating, index) {
    this.reviewFullStars.push([]);
    this.reviewHalfStars.push([]);
    this.reviewNoStars.push([]);

    // Calculating number of full and half Stars
    for (let i = 0; i < parseInt(rating, 10); i++) {
      this.reviewFullStars[index].push(1);
      if (this.reviewHalfStars[index].length === 0) {
        if (rating.average % 1 === 0.5) {
          this.reviewNoStars[index].push(1);
        }
      }
    }

    // Calculating noStars
    let leftStars = 5 - (this.reviewFullStars[index].length + this.reviewHalfStars[index].length);
    for (let i = 0; i < leftStars; i++) {
      this.reviewNoStars[index].push(1);
    }
    return [this.reviewFullStars, this.reviewHalfStars, this.reviewNoStars];
  }
}
