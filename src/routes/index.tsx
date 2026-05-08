import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '@/components/site/Navbar'
import { HeroSection } from '@/components/site/HeroSection'
import { StickyScrollSection } from '@/components/site/StickyScrollSection'
import { QuoteBreak } from '@/components/site/QuoteBreak'
import { WelcomeSection } from '@/components/site/WelcomeSection'
import { ProphetQuotesSection } from '@/components/site/ProphetQuotesSection'
import { QuotesSection } from '@/components/site/QuotesSection'
import { FellowshipSection } from '@/components/site/FellowshipSection'
import { Footer } from '@/components/site/Footer'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'ICGC Greater Grace Temple — A Place of Grace, A House of Power',
      },
      {
        name: 'description',
        content:
          'Welcome to ICGC Greater Grace Temple. Join us for worship, Bible study and fellowship.',
      },
      { property: 'og:title', content: 'ICGC Greater Grace Temple' },
      {
        property: 'og:description',
        content: 'A Place of Grace, A House of Power.',
      },
    ],
  }),
  component: Index,
})

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar revealAfterVh={2.35} />
      <main>
        <HeroSection />
        <div className="relative z-10 bg-background">
          <WelcomeSection />
          <StickyScrollSection />
          <QuoteBreak />
          <QuotesSection />
          <ProphetQuotesSection />
          <FellowshipSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
