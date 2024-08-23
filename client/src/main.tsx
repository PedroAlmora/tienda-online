import React from 'react'
import ReactDOM from 'react-dom/client'
import esEs from 'antd/locale/es_ES';
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { store } from './store';
import { theme } from './common/theme';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Suspense>
    <Provider store={store}>
      <ConfigProvider 
      locale={esEs}
      theme={theme}
      >
        <div style={{ height: '100%', overflow: 'hidden'}}>
        <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </Provider>
  </React.Suspense>
)
