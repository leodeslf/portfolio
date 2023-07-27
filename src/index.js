import { render } from 'react-dom';
import Portfolio from './Portfolio';
import './sass/main.scss';
import store from './stores/store';
import { Provider } from 'react-redux';

render(
  <Provider store={store}>
    <Portfolio />
  </Provider>,
  document.getElementById('root')
);
