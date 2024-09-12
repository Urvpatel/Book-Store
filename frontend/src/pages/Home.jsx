import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';
import CategorySlider from '../components/Home/CategorySlider';

const Home = () => {
  return (
    <div className='bg-zinc-900 text-white h-auto px-12 py-8'>
      <Hero />
      <CategorySlider />
      <RecentlyAdded />
    </div>
  );
};

export default Home;
