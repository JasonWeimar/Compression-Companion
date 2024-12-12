// App.jsx
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPageView from './views/LandingPageView';
import LoginAndRegView from './views/LoginAndRegView';
import DashboardView from './views/DashboardView';
import CreateSetupView from './views/CreateSetupView';
import ManageSetupsView from './views/ManageSetupView';
import UpdateSetupView from './views/UpdateSetupView';
import KnowHowView from './views/KnowHowView';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageView />} />
        <Route path="/companion/auth" element={<LoginAndRegView />} />

        <Route element={<Layout />}>
          <Route path="/companion/dashboard" element={<DashboardView />} />
          <Route path="/companion/create" element={<CreateSetupView />} />
          <Route path="/companion/manage/:id?" element={<ManageSetupsView />} />
          <Route path="/companion/:id/edit" element={<UpdateSetupView />} />
          <Route path="/companion/knowhow" element={<KnowHowView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
