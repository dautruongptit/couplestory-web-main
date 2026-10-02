import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import PublicStory from './pages/PublicStory';
import { getTenantSlug } from './utils/publicStory';

export default function App() {
  // <slug>.couplestory.site serves that website directly, without the app shell or login.
  const tenantSlug = getTenantSlug();
  if (tenantSlug) return <PublicStory slug={tenantSlug} />;

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
