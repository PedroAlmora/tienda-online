import { RouteObject, createBrowserRouter } from "react-router-dom";
import { DashboardContent, ErrorView } from "./features";
import Dashboard from "./features/dashboard/application/dashboard";
import Home from "./features/home/application/home";
import ProductList from "./features/products/application/product-list";
import Login from "./features/auth/application/login";
import ProductNameList from "./features/products/application/product-name-list";
import ProductMarcaList from "./features/products/application/product-marca-list";

// eslint-disable-next-line react-refresh/only-export-components
const DashboardRoutes: RouteObject[] = [
    {
        path : '',
        element: <Home/>
    },
    {
        path : '/productos/:section',
        element: <ProductList/>
    },
    {
        path : '/buscadorProductos/:name',
        element: <ProductNameList/>
    },
    {
        path : '/buscadorProductosMarca/:marca',
        element: <ProductMarcaList/>
    }
];

const rootRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <DashboardContent />,
                errorElement: <ErrorView />,
                children: DashboardRoutes
            }
        ]
    },
    {
        path : '/login',
        element: <Login/>
    },
];

export const router = createBrowserRouter(rootRoutes);