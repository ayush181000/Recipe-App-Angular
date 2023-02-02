import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };

    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe, index) => index !== action.payload
        ),
      };

    default:
      return state;
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
