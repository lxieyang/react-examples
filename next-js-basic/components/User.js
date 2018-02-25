import React from 'react';

const user = (props) => (
  <div>
    <h1>{props.name}</h1>
    <p>Age: {props.age}</p>
    <style jsx>{`
      div {
        border: 1px solid #eee;
        box-shadow: 1 2px 2px #ccc;
        padding: 20px;
        text-align: center
      }
    `}</style>
  </div>
);

export default user;