import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://live.staticflickr.com/7423/28115954606_5a068f9d36_b.jpg'
    ),
    new Recipe(
      'Another test recipe',
      'This is simply a test',
      'https://live.staticflickr.com/7423/28115954606_5a068f9d36_b.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
