import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from './context/SnackbarContext';
// import Login from './routes/login';
import NewLogin from './routes/newLogin';
// import Register from './routes/register';
import NewRegister from './routes/newRegister';
import Papers from './routes/dashboards/papers';
import Authors from './routes/dashboards/authors';
import Home from './routes/home';
import Venues from './routes/dashboards/venues';
import { FilterProvider } from './context/FilterContext';
import { AuthProvider } from './context/AuthContext';
import {
  ROUTE_ACCOUNT,
  ROUTE_AUTHORS,
  ROUTE_CITATIONS,
  ROUTE_FIELDS_OF_STUDY,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PAPERS,
  ROUTE_PASSWORD,
  ROUTE_PUBLISHERS,
  ROUTE_REGISTER,
  ROUTE_TOPICS,
  ROUTE_TYPES_OF_PAPER,
  ROUTE_VENUES,
} from './consts';
import Account from './routes/account';
import { ErrorBoundaryWrapper } from './context/ErrorBoundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import ForgotPassword from './routes/forgotPassword';
import TypesOfPaper from './routes/dashboards/typesOfPaper';
import FieldsOfStudy from './routes/dashboards/fieldsOfStudy';
import Citations from './routes/dashboards/citations';
import Topics from './routes/dashboards/topics';
import Publishers from './routes/dashboards/publishers';
import { RefreshProvider } from './context/RefreshContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SnackbarProvider>
      <ErrorBoundaryWrapper>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FilterProvider>
              <RefreshProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path={ROUTE_HOME} element={<Home />} />
                    <Route path={ROUTE_LOGIN} element={<NewLogin />} />
                    <Route path={ROUTE_REGISTER} element={<NewRegister />} />
                    <Route path={ROUTE_ACCOUNT} element={<Account />} />
                    <Route path={ROUTE_PASSWORD} element={<ForgotPassword />} />
                    <Route path={ROUTE_PAPERS} element={<Papers />} />
                    <Route path={ROUTE_AUTHORS} element={<Authors />} />
                    <Route path={ROUTE_VENUES} element={<Venues />} />
                    <Route path={ROUTE_TYPES_OF_PAPER} element={<TypesOfPaper />} />
                    <Route path={ROUTE_FIELDS_OF_STUDY} element={<FieldsOfStudy />} />
                    <Route path={ROUTE_PUBLISHERS} element={<Publishers />} />
                    <Route path={ROUTE_CITATIONS} element={<Citations />} />
                    <Route path={ROUTE_TOPICS} element={<Topics />} />
                  </Routes>
                </BrowserRouter>
              </RefreshProvider>
            </FilterProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundaryWrapper>
    </SnackbarProvider>
  );
}
