import { Authenticated, ErrorComponent, GitHubBanner, Refine, WelcomePage } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { dataProvider, liveProvider, authProvider } from '@/lib/providers'
import { MainPage, ForgotPasswordPage, SignUpPage, SignInPage } from './pages'
import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import './App.css'
import { ROUTE_PATH } from './lib/route-path'
import Layout from './components/layout/Layout'
function App() {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <RefineKbarProvider>
                <DevtoolsProvider>
                    <Refine
                        dataProvider={dataProvider}
                        liveProvider={liveProvider}
                        routerProvider={routerBindings}
                        authProvider={authProvider}
                        resources={[
                            {
                                name: 'blog_posts',
                                list: '/blog-posts',
                                create: '/blog-posts/create',
                                edit: '/blog-posts/edit/:id',
                                show: '/blog-posts/show/:id',
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {
                                name: 'categories',
                                list: '/categories',
                                create: '/categories/create',
                                edit: '/categories/edit/:id',
                                show: '/categories/show/:id',
                                meta: {
                                    canDelete: true,
                                },
                            },
                        ]}
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
                                            <NavigateToResource />
                                        </Layout>
                                    </Authenticated>
                                }>
                                <Route
                                    index
                                    element={<MainPage />}
                                />
                            </Route>
                        </Routes>
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
