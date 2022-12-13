import './App.css'
import { RootLayout } from './pages/index/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TestLayout } from './components/test/TestLayout';
import { Test } from './components/test/Test';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { WelcomePage } from './pages/index/WelcomePage';
import { QueryStateWrapper } from './shared/extra/QueryStateWrapper';
import { User } from './utils/types';
import { MainViewLayout } from './pages/mainview/MainViewLayout';
import { MainView } from './pages/mainview/MainView';
import { getUser } from './pb/config';
import { LoaderElipse } from './shared/loaders/Loaders';
import { isUserLoggedIn } from './api/methods';




function App() {

   const userQuery = useQuery(['user'],isUserLoggedIn)
  
  //  supabase.auth.onAuthStateChange((event, session) => {
  //   console.log("auth state changed == ",event, session)
  // })

   const testmode = false
   const user = userQuery?.data as User

  console.log("user ==== ",user)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} test_mode={true}/>,
      // loader:userLoader(queryClient),
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <WelcomePage user={user} /> },

        {
          path: '/auth',
          element: <AuthLayout user={user} />,
          children: [
            {
              index: true,
              element: <Login />,
              // loader: deferredBlogPostsLoader,
            },
            {
              path: '/auth/signup',
              element: <Signup />,
              // loader: blogPostLoader,
            },
          ],
        },
        {
          path: '/main',
          element: <MainViewLayout user={user} />,
          children: [
            {
              index: true,
              element: <MainView user={user} />,
              // loader: deferredBlogPostsLoader,
            },
            // {
            //  path:'/main/mobile',
            //   element: <MainMobileView user={user} />,
            //   // loader: deferredBlogPostsLoader,
            // },
            {
              path:':channel_id',
              element: <MainView user={user} />,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },
 


        {
          path: '/test',
          element: <TestLayout user={user} />,
          children: [
            {
              index: true,
              element: <Test user={user} />,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },

      ],
    },
    // {
    //   path: '/newsletter',
    //   action: newsletterAction,
    // },
  ]);

  return (
    <QueryStateWrapper
      error={userQuery.error}
      isError={userQuery.isError}
      isLoading={userQuery.isLoading}
      loader={<LoaderElipse />}
      >
      <div className=" dark:bg-slate-900 h-full max-h-screen
       dark:text-white dark:shadow-white">
        <RouterProvider router={router} />
      </div>
    </QueryStateWrapper>
  )
}

export default App
