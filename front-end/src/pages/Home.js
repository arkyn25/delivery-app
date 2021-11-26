import React from 'react';
import { Navigate } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';

const renato = '';
export default function Home() {
  if (!renato) return <Navigate to="login" />;
  return (
    <div className="App">
      <span className="logo">Home</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
    </div>
  );
}
