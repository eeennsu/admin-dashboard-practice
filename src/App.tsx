import { Authenticated, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { dataProvider, liveProvider, authProvider } from '@/lib/providers'
import { MainPage, ForgotPasswordPage, SignUpPage, SignInPage, CompanyListPage, CompanyEditPage } from './pages'
import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import './App.css'
import { ROUTE_PATH } from './lib/route-path'
import { resources } from './lib/resources'
import { notificationProvider } from './lib/providers/notification'
import Layout from './components/layout/Layout'
import CompanyCreatePage from './pages/company/create'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <BrowserRouter>
            <ToastContainer />
            <RefineKbarProvider>
                <DevtoolsProvider>
                    <Refine
                        dataProvider={dataProvider}
                        liveProvider={liveProvider}
                        routerProvider={routerBindings}
                        authProvider={authProvider}
                        notificationProvider={notificationProvider}
                        resources={resources}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                            projectId: 'FOCf4R-b7IOC9-96b9fq',
                            liveMode: 'auto',
                        }}>
                        <Routes>
                            <Route
                                path={ROUTE_PATH.signUp()}
                                element={<SignUpPage />}
                            />
                            <Route
                                path={ROUTE_PATH.signIn()}
                                element={<SignInPage />}
                            />
                            <Route
                                path={ROUTE_PATH.forgotPassword()}
                                element={<ForgotPasswordPage />}
                            />
                            <Route
                                element={
                                    <Authenticated
                                        key='authenticated-layout'
                                        fallback={<CatchAllNavigate to={ROUTE_PATH.signIn()} />}>
                                        <Layout>
                                            <Outlet />
                                        </Layout>
                                    </Authenticated>
                                }>
                                <Route
                                    index
                                    element={<MainPage />}
                                />
                                <Route
                                    path={ROUTE_PATH.companies.list()}
                                    element={<CompanyListPage />}
                                />
                                <Route
                                    path={ROUTE_PATH.companies.create()}
                                    element={<CompanyCreatePage />}
                                />
                                <Route
                                    path={ROUTE_PATH.companies.edit()}
                                    element={<CompanyEditPage />}
                                />
                            </Route>
                        </Routes>
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                    <DevtoolsPanel />
                </DevtoolsProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    )
}

export default App
