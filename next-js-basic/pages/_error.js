import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const errorPage = () => (
  <div>
    <h1>Oops, something went wrong.</h1>
    <p>Try go to <Link href="/"><a>Main</a></Link></p>
    
  </div>
);

export default errorPage;