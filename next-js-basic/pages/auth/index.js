import React from 'react';
import Router from 'next/router';

import User from '../../components/User';

const authIndexPage = (props) => (
  <div>
    <h1>The Auth Index Page - {props.appName}</h1>
    <User name="max" age={28} />
    <button onClick={() => Router.push('/')}>Go to Main</button>
  </div>
);

authIndexPage.getInitialProps = (context) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({appName: 'Super Awesome (Auth) app'});
    }, 1000);
  });
  return promise;
}

export default authIndexPage;