"use client"

import ImageGrid from '@/components/ImageGrid';
import { GlobalProvider } from '@/context/GlobalContext';

export default function Home() {


  return (
    <main
      className='lg:px-20 md:px-16 sm:px-10 px-5 lg:py-10 md:py-8 sm:py-6 py-4 bg-slate-300 h-auto'
    >
      <GlobalProvider>
        <ImageGrid />
      </GlobalProvider>
    </main>
  );
};
