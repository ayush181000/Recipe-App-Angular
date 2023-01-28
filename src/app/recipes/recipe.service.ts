import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shooping-list.service';
import { Recipe } from './recipe.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list-actions';

@Injectable()
export class RecipeService {
  recipesChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanges.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanges.next(this.recipes.slice());
  }
}

// private recipes: Recipe[] = [
//   new Recipe(
//     'Tasty Schnitzel',
//     'This is simply a test',
//     'https://live.staticflickr.com/7423/28115954606_5a068f9d36_b.jpg',
//     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
//   ),
//   new Recipe(
//     'Big Fat Burger',
//     'This is simply a test',
//     'https://live.staticflickr.com/7423/28115954606_5a068f9d36_b.jpg',
//     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
//   ),
// ];
