import React from 'react';
import './styles/App.css';
import MainContent from './components/MainContent';
import { observer } from 'mobx-react-lite';

function App(){
  return (
    <React.Fragment>
      <MainContent />
    </React.Fragment>
  );
}

export default observer(App);