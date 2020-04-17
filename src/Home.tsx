import React from 'react';

interface Props {
  history: any,
  location: any,
  match: any,
  staticContext: any,
  meta: any
}

export default function Home(props:Props) {
  console.log(props)
  return (
  <div className="Home">{props.meta.name}</div>
  );
}
