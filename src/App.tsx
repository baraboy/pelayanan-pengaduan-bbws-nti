import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormSurvey from "./pages/form-survey";
import Thanks from "./pages/thanks";
import { DefaultLayout } from "./components/layouts/default-layout";
import Pelayanan from "./pages/pelayangn";
import { IpProvider } from "./providers/IpProvider";
import RekapData from "./pages/rekap-data";
import Gratifikasi from "./pages/gratifikasi";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Pelayanan />
      },
      {
        path: 'survey-kepuasan-pelanggan',
        element: <FormSurvey />
      },
      {
        path: 'terima-kasih',
        element: <Thanks />
      },
      {
        path: 'pelayanan-pengaduan',
        element: <Pelayanan />
      },
      {
        path: 'gratifikasi',
        element: <Gratifikasi />
      },
      {
        path: 'rekap-data',
        element: <RekapData />
      }
    ]
  },

])

function App() {

  return (
    <>
      <IpProvider>
        <RouterProvider router={router} />
      </IpProvider>
    </>
  )
}

export default App
