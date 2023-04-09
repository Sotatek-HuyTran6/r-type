import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { mainRoutes } from './routes/routes';
import { RouteObject } from './types/route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/index.scss';
import Layout from './layouts';
import ProtectedRoute from 'routes/protected-routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'types/redux';
import { refresh } from 'redux/auth/actions';
import { useSelector } from 'react-redux';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'san-serif'].join(','),
  },
  palette: {
    neutral: {
      main: '#50fa7b',
    },
  },
  status: { danger: 'red' },
});

function App() {
  const dispatch = useDispatch() as AppDispatch;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(refresh(navigate));
  }, []);

  const auth: any = useSelector((state: RootState) => state.auth);
  const { data, error, myInfo, isLoading } = auth;

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Routes>
            {mainRoutes.map((item: RouteObject, index: number) => {
              const Component = item.component;
              if (item.isPublic) {
                return <Route key={index} path={item.path} element={<Component />}></Route>;
              } else {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    element={
                      <ProtectedRoute>
                        <React.Fragment>
                          {!isLoading && myInfo ? (
                            <Layout>
                              <Component />
                            </Layout>
                          ) : null}
                        </React.Fragment>
                      </ProtectedRoute>
                    }
                  ></Route>
                );
              }
            })}
          </Routes>
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
