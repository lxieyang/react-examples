import React, { PureComponent } from 'react';
import Person from './Person/Person';

class People extends PureComponent {

  constructor(props) {
    super(props);
    console.log('[People.js] Inside Constructor()', props);
  }

  componentWillMount() {
    console.log('[People.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[People.js] Inside componentDidMount()');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE People.js] Inside componentWillReceiveProps', nextProps);
  }

  /* PureComponent will do the following for you! */
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE People.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextProps.people !== this.props.people ||
  //          nextProps.changed !== this.props.changed ||
  //          nextProps.clicked !== this.props.clicked;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE People.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE People.js] Inside componentDidUpdate');
  }

  render() {
    console.log('[People.js] Inside render()');

    return this.props.people.map((person, index) => {
      return <Person 
        key={person.id}
        name={person.name} 
        position={index}
        age={person.age}
        click={this.props.clicked.bind(this, index)}
        changed={(event) => { this.props.changed(event, person.id) }}/>
    });
  }
}

export default People;