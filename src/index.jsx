import React from "react";
import ReactDOM from "react-dom";
import Farkle from "./components/Farkle";
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('react-app-root')
  );
};

render(Farkle);

if (module.hot) {
  module.hot.accept('./components/Farkle', () => {
    render(Farkle)
  });
}
