import Hero from '@/components/hero';
import Features from '@/components/features';
import WalkthroughPreview from '@/components/walkthrough-preview';
import Playground from '@/components/playground';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Playground />
      <WalkthroughPreview />

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black flex flex-col items-center justify-center text-zinc-600">
        <p className="text-sm font-medium">© 2026 zod-based-form. Built for the community.</p>
      </footer>
    </div>
  );
}


