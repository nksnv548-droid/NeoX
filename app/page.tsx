import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Systems } from '@/components/sections/Systems';
import { Approach } from '@/components/sections/Approach';
import { Deployments } from '@/components/sections/Deployments';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Systems />
      <Approach />
      <Deployments />
      <Contact />
    </main>
  );
}
