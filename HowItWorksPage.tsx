import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Cpu, Map, Shield, Heart, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

const steps = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Journal Entry',
    description: 'You write a reflection about your day, feelings, or experiences. There are no right or wrong answers — just honest thoughts.',
    color: 'bg-primary-100 text-primary-700',
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: 'AI Analysis',
    description: 'Our AI reads your entry for emotional language, achievement dependence, self-criticism, and balanced identity signals.',
    color: 'bg-secondary-100 text-secondary-700',
  },
  {
    icon: <Map className="w-6 h-6" />,
    title: 'Identity Map Generation',
    description: 'Your identity is mapped across six dimensions: Achievement, Relationships, Creativity, Wellness, Growth, and Community.',
    color: 'bg-accent-100 text-accent-700',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Risk Detection',
    description: 'Anchor detects when your self-worth is becoming too tied to achievement outcomes. This is called "identity drift."',
    color: 'bg-warning-100 text-warning-700',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Personalized Support',
    description: 'You receive tailored recommendations, resources, and reflection prompts to help you rebuild a balanced sense of self.',
    color: 'bg-success-100 text-success-700',
  },
];

export default function HowItWorksPage() {
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
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              The Anchor AI Process
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">How Anchor AI Works</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Anchor AI uses natural language processing to understand your reflections and help you maintain a balanced identity.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12">
            <div className="flex flex-col items-center gap-4">
              {steps.map((step, i) => (
                <div key={i} className="w-full">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center shrink-0`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">What We Analyze</h3>
              <ul className="space-y-2">
                {['Achievement dependence language', 'Self-criticism patterns', 'Emotional tone (sentiment)', 'Identity balance signals', 'Relationship references', 'Non-achievement pride sources'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">What We Never Do</h3>
              <ul className="space-y-2">
                {['Make mental health diagnoses', 'Store data without your consent', 'Share entries with third parties', 'Judge your worth or choices', 'Replace human counselors', 'Use data for advertising'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
            >
              Try Anchor AI
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
