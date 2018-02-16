import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Sipnner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}
const BASE_PRICE = 4.0;

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null,  // will get from web
      // totalPrice: BASE_PRICE,
      // purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    console.log(this.props);
    // axios.get('https://react-my-burger-ff530.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     const receivedIngredients = response.data;
    //     // calculate the total price
    //     const totalPrice = Object.keys(response.data)
    //                         .map(igKey => receivedIngredients[igKey] * INGREDIENT_PRICES[igKey])
    //                         .reduce((acc, el) => acc + el, BASE_PRICE);
    //     // set state
    //     this.setState({ingredients: receivedIngredients, totalPrice, purchasable: totalPrice > BASE_PRICE ? true : false});
    //   }).catch(error => {
    //     this.setState({error: true});
    //   });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((acc, el) => {
        return acc + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCounted = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCounted;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCounted = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCounted;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  //   }
  //   queryParams.push('price=' + this.state.totalPrice);
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryParams.join('&')
    // });
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad: true, meat: false, ...}

    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p> : <Sipnner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls 
            price={this.props.price}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
      orderSummary = <OrderSummary 
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.props.price}
                        ingredients={this.props.ings}/>
    }

    if (this.state.loading) {
      orderSummary = <Sipnner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));