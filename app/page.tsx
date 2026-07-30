import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Systems } from '@/components/sections/Systems';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Systems />
      {/* Approach, Deployments, Contact sections land in the next pass */}
    </main>
  );
}
