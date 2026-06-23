import React, { useState } from 'react';
import HeartLoader from './components/HeartLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Events from './components/Events';
import Story from './components/Story';
import Gallery from './components/Gallery';
import BlessingSky from './components/BlessingSky';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  const [theme, setTheme] = useState('enchanted');

  return (
    <>
      <HeartLoader />
      <ThemeSelector activeTheme={theme} onThemeChange={setTheme} />
      <Navbar />
      <main>
        <Hero />
        <Couple />
        <Events />
        <Story />
        <Gallery />
        <BlessingSky />
        <RSVP activeTheme={theme} />
      </main>
      <Footer />
    </>
  );
}
