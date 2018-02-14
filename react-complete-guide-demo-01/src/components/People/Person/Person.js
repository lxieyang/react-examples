import React, { Component } from 'react';
// import Radium from 'radium';
import classes from './Person.css';
import WithClass from '../../../hoc/WithClass';
import Aux from '../../../hoc/Aux';
import WithClassAlternative from '../../../hoc/WithClassAlternative';
import PropTypes from 'prop-types';

class Person extends Component {

  constructor(props) {
    super(props);
    console.log('[Person.js] Inside Constructor()', props);
  }

  componentWillMount() {
    console.log('[Person.js] Inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount()');
    if (this.props.position === 0) {
      this.inputElement.focus();
    }
  }

  componentWillUnmount() {
    console.log('[Person.js] Inside componentWillUnmount()', this.props.name);
  }

  render () {
    console.log('[Person.js] Inside render()', this.props.name);

    return (
      <Aux>
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old.</p>
        <p>{this.props.children}</p>
        <input 
        ref={(inp) => {this.inputElement = inp}} 
        type="text" 
        onChange={this.props.changed} 
        value={this.props.name}/>
      </Aux>
    );
  }
} 

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

// export default Radium(person);
export default WithClassAlternative(Person, classes.Person);