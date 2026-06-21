import { Link } from 'react-router-dom';
import { Users, Lock, Scale, Shield, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from '../components/Logo';

const principles = [
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Human-in-the-Loop',
    description: 'Anchor AI never makes mental health diagnoses. Our AI is a reflective tool, not a clinician. Every insight is designed to prompt self-awareness, not to replace professional judgment.',
    color: 'bg-primary-100 text-primary-700',
    points: [
      'AI insights are suggestions, not prescriptions',
      'Users always control their data and decisions',
      'We encourage talking to trusted adults and counselors',
    ],
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Privacy by Design',
    description: 'Your journal entries are private. We use industry-standard encryption and never sell, share, or analyze your data for advertising purposes.',
    color: 'bg-accent-100 text-accent-700',
    points: [
      'End-to-end encryption for journal entries',
      'No third-party data sharing',
      'You can delete your data at any time',
    ],
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: 'Bias Reduction',
    description: 'AI suggestions are supportive, not judgmental. We carefully design prompts and review outputs to ensure our language is inclusive, non-stigmatizing, and culturally sensitive.',
    color: 'bg-secondary-100 text-secondary-700',
    points: [
      'Non-judgmental language in all recommendations',
      'Regular audits for cultural bias',
      'Diverse testing across user backgrounds',
    ],
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Safety First',
    description: 'Users in crisis are directed to trusted resources immediately. Anchor AI includes clear pathways to school counselors, crisis hotlines, and emergency services.',
    color: 'bg-warning-100 text-warning-700',
    points: [
      'Crisis detection flags urgent language',
      'Immediate links to crisis resources',
      'Encouragement to reach out to trusted adults',
    ],
  },
];

export default function ResponsibleAIPage() {
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
              <Shield className="w-4 h-4" />
              Our Commitment
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Responsible AI</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Anchor AI is built with ethical principles at its core. We believe technology should support human wellbeing, not compromise it.
            </p>
          </div>

          <div className="space-y-6">
            {principles.map((principle, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${principle.color} flex items-center justify-center shrink-0`}>
                    {principle.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{principle.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{principle.description}</p>
                    <ul className="mt-4 space-y-2">
                      {principle.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-success-500 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact / Feedback */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-2">Have concerns about our AI?</h3>
            <p className="text-sm text-slate-600 mb-4">
              We welcome feedback on our AI's behavior. If you notice something concerning, please reach out so we can improve.
            </p>
            <a
              href="mailto:feedback@anchorai.app"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Contact our AI Ethics team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
