import { Component } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://live.staticflickr.com/7423/28115954606_5a068f9d36_b.jpg'
    ),
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://live.staticflickr.com/7423/28115954606_5a068f9d36_b.jpg'
    ),
  ];
}
