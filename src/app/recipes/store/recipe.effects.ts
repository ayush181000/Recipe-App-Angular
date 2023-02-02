import { Actions, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap(() =>
        this.http.get<Recipe[]>(
          'https://ng-recipe-book-660af-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
        )
      ),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipeActions.SetRecipes(recipes);
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
