import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarTwo from './NavbarTwo';

const VoiceOfOakLayout: React.FC = () => (
  <div className="min-h-screen">
    <NavbarTwo />
    <main>
      <Outlet />
    </main>
  </div>
);

export default VoiceOfOakLayout; 