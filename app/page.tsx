import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* Systems, Approach, Deployments, Contact sections land in the next pass */}
    </main>
  );
}
