import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { BASE_PRICE, INGREDIENT_PRICES }from '../reducers/burgerBuilder';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients, totalPrice) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients,
      totalPrice
    }
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://react-my-burger-ff530.firebaseio.com/ingredients.json')
      .then(response => {
        const receivedIngredients = response.data;
        // calculate the total price
        const totalPrice = Object.keys(response.data)
                            .map(igKey => receivedIngredients[igKey] * INGREDIENT_PRICES[igKey])
                            .reduce((acc, el) => acc + el, BASE_PRICE);
        dispatch(setIngredients(receivedIngredients, totalPrice));
        // this.setState({ingredients: receivedIngredients, totalPrice, purchasable: totalPrice > BASE_PRICE ? true : false});
      }).catch(error => {
        // this.setState({error: true});
        dispatch(fetchIngredientsFailed());
      });
  };
};