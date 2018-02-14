import React, { Component } from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import classes from './App.css';
import People from '../components/People/People';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';
import WithClassAlternative from '../hoc/WithClassAlternative';
// import Radium, { StyleRoot } from 'radium';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] Inside Constructor()', props);
    this.state = {  // new in modern setup
      people: [
        {id: 'asd234rwtf', name: 'Michael', age: 29},
        {id: 'rerw4235ft', name: 'Manu', age: 212},
        {id: 'sdfgsdfg45', name: 'Sara', age: 33},
      ],
      showPeople: false,
      toggleClicked: 0
    };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE App.js] Inside componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
    // return true;
    return nextState.people !== this.state.people || nextState.showPeople !== this.state.showPeople;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  // state = {
  //   people: [
  //     {id: 'asd234rwtf', name: 'Michael', age: 29},
  //     {id: 'rerw4235ft', name: 'Manu', age: 212},
  //     {id: 'sdfgsdfg45', name: 'Sara', age: 33},
  //   ],
  //   showPeople: false
  // };

  deletePersonHandler = (personIndex) => {
    // const people = this.state.people.slice();   // copy 
    const people = [...this.state.people];
    people.splice(personIndex, 1);
    this.setState({people: people});
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.people.findIndex(p => p.id === id);
    const person = {
      ...this.state.people[personIndex]
    };

    person.name = event.target.value;
    const people = [...this.state.people];
    people[personIndex] = person;

    this.setState({people});
  }

  togglePeopleHandler = () => {
    const doesShow = this.state.showPeople;
    this.setState((prevState, props) => {   // setState is async call !!!
      return {
        showPeople: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  render() {
    console.log('[App.js] Inside render()');

    let people = null;

    if (this.state.showPeople) {
      people = <People 
          people={this.state.people} 
          clicked={this.deletePersonHandler} 
          changed={this.nameChangedHandler}/>;
    }

    // use bind over the anonymous function syntax
    return (
      <Aux>
      <button onClick={() => {this.setState({showPeople: true})}}>Show People</button>
        <Cockpit 
        appTitle={this.props.title}
        showPeople={this.state.showPeople}
        people={this.state.people}
        clicked={this.togglePeopleHandler}/>
        {people}
      </Aux>
    );
  }
}

// export default Radium(App);
export default WithClassAlternative(App, classes.App);