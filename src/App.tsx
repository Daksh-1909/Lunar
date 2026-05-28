import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import CollectionsPage from './pages/CollectionsPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { GalleryProvider } from './context/GalleryContext';
import { ScrollParticleProvider } from './components/ui/ScrollParticleProvider';

function App() {
  return (
    <GalleryProvider>
      <ScrollParticleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="collections/:slug" element={<CollectionDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ScrollParticleProvider>
    </GalleryProvider>
  );
}

export default App;

