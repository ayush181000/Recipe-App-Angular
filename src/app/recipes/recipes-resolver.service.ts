import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    this.store.dispatch(new RecipeActions.FetchRecipes());
    return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
  }
}
