import { Link } from 'react-router-dom';
import {
  Shield,
  TrendingUp,
  Heart,
  ArrowRight,
  Sparkles,
  FileText,
  Cpu,
  Map,
  ChevronRight,
  Menu,
  X,
  Lock,
  Scale,
  Users,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Logo size={36} />
              <span className="text-xl font-bold text-slate-900">Anchor AI</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                How It Works
              </Link>
              <Link to="/responsible-ai" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                Responsible AI
              </Link>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Get Started
              </Link>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 space-y-1 border-b border-slate-200 bg-white">
            <Link to="/how-it-works" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              How It Works
            </Link>
            <Link to="/responsible-ai" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              Responsible AI
            </Link>
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
              Sign In
            </Link>
            <Link to="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Identity Wellness
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Helping teenagers build <span className="text-primary-500">identity beyond achievement</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Anchor AI detects identity drift — when self-worth becomes overly tied to grades, competitions, and external validation — and guides you back to a balanced sense of self.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary-500/25"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold border border-slate-200 hover:border-primary-300 hover:text-primary-600 transition-all"
              >
                See How It Works
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What is Identity Drift */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning-50 text-warning-700 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Understanding Identity Drift
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">What is Identity Drift?</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            Identity drift happens when your sense of self becomes increasingly tied to external achievements — grades, competitions, social media validation — while other parts of who you are fade into the background. Over time, this imbalance can lead to anxiety, burnout, and a fragile sense of self-worth.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-3 mx-auto">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">The Warning Signs</h3>
              <p className="text-sm text-slate-600">Feeling worthless after a bad grade, defining yourself only by wins, neglecting relationships for success.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center mb-3 mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Why It Matters</h3>
              <p className="text-sm text-slate-600">A one-dimensional identity is fragile. When that dimension fails, your entire self-image collapses.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-success-100 text-success-600 flex items-center justify-center mb-3 mx-auto">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">The Solution</h3>
              <p className="text-sm text-slate-600">Build a multi-dimensional identity. Achievement is one part — relationships, creativity, wellness, and growth matter too.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How Anchor Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three simple steps to a healthier relationship with achievement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              icon={<FileText className="w-6 h-6" />}
              title="Write Your Reflection"
              description="Journal about your day, feelings, or a specific event. Be honest — there are no wrong answers."
              color="primary"
            />
            <StepCard
              number={2}
              icon={<Cpu className="w-6 h-6" />}
              title="AI Analysis"
              description="Our AI analyzes your entry for achievement dependence, self-criticism, and emotional patterns."
              color="secondary"
            />
            <StepCard
              number={3}
              icon={<Map className="w-6 h-6" />}
              title="Get Your Identity Map"
              description="See your identity balance score, drift risk level, and personalized recommendations."
              color="accent"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Features</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to build a resilient, multi-dimensional identity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Identity Mapping"
              description="Visualize your self-worth across six dimensions: Achievement, Relationships, Creativity, Wellness, Growth, and Community."
              color="primary"
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Drift Detection"
              description="AI detects when achievement language is taking over your identity and flags it before it becomes a crisis."
              color="secondary"
            />
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Personalized Insights"
              description="Receive AI-generated recommendations tailored to your unique patterns, challenges, and goals."
              color="accent"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Safe & Private"
              description="Your journal entries are encrypted and never shared. Built with privacy and safety as core principles."
              color="success"
            />
          </div>
        </div>
      </section>

      {/* AI Flow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Anchor AI Pipeline</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From your journal entry to actionable insights in seconds.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            <FlowStep label="Journal Input" />
            <ArrowRight className="w-5 h-5 text-slate-400 hidden lg:block" />
            <FlowStep label="NLP Analysis" />
            <ArrowRight className="w-5 h-5 text-slate-400 hidden lg:block" />
            <FlowStep label="Theme Extraction" />
            <ArrowRight className="w-5 h-5 text-slate-400 hidden lg:block" />
            <FlowStep label="Sentiment Analysis" />
            <ArrowRight className="w-5 h-5 text-slate-400 hidden lg:block" />
            <FlowStep label="Drift Detection" />
            <ArrowRight className="w-5 h-5 text-slate-400 hidden lg:block" />
            <FlowStep label="Recommendations" />
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Built Responsibly</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ethical AI principles are at the core of everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResponsibleCard
              icon={<Users className="w-6 h-6" />}
              title="Human-in-the-Loop"
              description="Anchor never makes diagnoses. We are a reflective tool, not a replacement for counselors."
              color="primary"
            />
            <ResponsibleCard
              icon={<Lock className="w-6 h-6" />}
              title="Privacy First"
              description="Your journal entries are encrypted and never sold or shared with third parties."
              color="accent"
            />
            <ResponsibleCard
              icon={<Scale className="w-6 h-6" />}
              title="Bias Reduction"
              description="AI suggestions are supportive, non-judgmental, and designed for cultural sensitivity."
              color="secondary"
            />
            <ResponsibleCard
              icon={<Shield className="w-6 h-6" />}
              title="Safety First"
              description="Crisis detection flags urgent language and immediately directs users to trusted resources."
              color="warning"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-primary-500 rounded-3xl p-12 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to discover your true anchor?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join students building a healthier relationship with achievement and self-worth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors border border-primary-400"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={36} />
                <span className="text-xl font-bold text-slate-900">Anchor AI</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Helping students stay grounded beyond achievement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/how-it-works" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">How It Works</Link></li>
                <li><Link to="/responsible-ai" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Responsible AI</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/signup" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><span className="text-sm text-slate-500">Privacy Policy</span></li>
                <li><span className="text-sm text-slate-500">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400">Anchor AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ number, icon, title, description, color }: { number: number; icon: React.ReactNode; title: string; description: string; color: 'primary' | 'secondary' | 'accent' }) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600 border-primary-100',
    secondary: 'bg-secondary-50 text-secondary-600 border-secondary-100',
    accent: 'bg-accent-50 text-accent-600 border-accent-100',
  };
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4 border`}>
        {icon}
      </div>
      <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold mb-3">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: 'primary' | 'secondary' | 'accent' | 'success' }) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    accent: 'bg-accent-50 text-accent-600',
    success: 'bg-success-50 text-success-600',
  };
  return (
    <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function ResponsibleCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: 'primary' | 'secondary' | 'accent' | 'warning' }) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    secondary: 'bg-secondary-50 text-secondary-600',
    accent: 'bg-accent-50 text-accent-600',
    warning: 'bg-warning-50 text-warning-600',
  };
  return (
    <div className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-slate-100">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FlowStep({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm border border-slate-100">
      <div className="w-2 h-2 rounded-full bg-primary-500" />
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}
