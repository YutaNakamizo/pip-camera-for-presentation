import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import {
  purple,
  yellow,
} from '@material-ui/core/colors';
import '~/index.css';
import { App } from '~/App';
import * as serviceWorkerRegistration from '~/serviceWorkerRegistration';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: yellow,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
    >
      <BrowserRouter
      >
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

