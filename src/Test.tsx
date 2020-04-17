import React, {  ReactElement } from 'react';

interface Props {
  history: any,
  location: any,
  match: any,
  meta: any
}


export default function Test(name:number): ReactElement {
  return (
  <div className="test">{name}</div>
  )
}
