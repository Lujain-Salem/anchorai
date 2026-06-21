import Layout from '../components/Layout';
import { Users, School, Trophy, HeartHandshake, ArrowUpRight, ExternalLink, Phone, BookOpen, Calendar, MapPin, Star, MessageCircle, Heart, AlertTriangle } from 'lucide-react';

const resourceCategories = [
  {
    category: 'Mentorship',
    icon: Users,
    color: 'bg-primary-50 text-primary-600',
    borderColor: 'border-primary-100',
    items: [
      {
        title: 'Peer Mentor Matching',
        description: 'Get matched with an older student who understands the pressure you are facing. They have been there and can share what helped them stay grounded.',
        action: 'Find a Mentor',
        actionIcon: <Users className="w-4 h-4" />,
      },
      {
        title: 'Become a Mentor',
        description: 'Sometimes helping others see their worth helps you see your own. Mentor a younger student in a subject you enjoy or a skill you have built.',
        action: 'Apply to Mentor',
        actionIcon: <Star className="w-4 h-4" />,
      },
    ],
  },
  {
    category: 'Clubs & Activities',
    icon: Trophy,
    color: 'bg-secondary-50 text-secondary-600',
    borderColor: 'border-secondary-100',
    items: [
      {
        title: 'Interest-Based Clubs',
        description: 'Join clubs that exist for joy, not competition. Art club, hiking group, book club, music ensemble — find what makes you lose track of time.',
        action: 'Browse Clubs',
        actionIcon: <Trophy className="w-4 h-4" />,
      },
      {
        title: 'Creative Workshops',
        description: 'Weekly workshops in creative writing, photography, painting, or coding for fun. No grades, no performance reviews — just creation.',
        action: 'View Schedule',
        actionIcon: <Calendar className="w-4 h-4" />,
      },
    ],
  },
  {
    category: 'Volunteering',
    icon: HeartHandshake,
    color: 'bg-accent-50 text-accent-600',
    borderColor: 'border-accent-100',
    items: [
      {
        title: 'Local Community Service',
        description: 'Volunteer at a food bank, animal shelter, or community garden. Contributing to something bigger than yourself shifts focus away from self-evaluation.',
        action: 'Find Opportunities',
        actionIcon: <MapPin className="w-4 h-4" />,
      },
      {
        title: 'Virtual Volunteering',
        description: 'Tutor younger students online, transcribe historical documents, or help with environmental research. Make impact from anywhere.',
        action: 'Explore Remote',
        actionIcon: <ExternalLink className="w-4 h-4" />,
      },
    ],
  },
  {
    category: 'School Support',
    icon: School,
    color: 'bg-success-50 text-success-600',
    borderColor: 'border-success-100',
    items: [
      {
        title: 'School Counselor',
        description: 'Your counselor is trained to help with academic stress, identity questions, and emotional wellbeing. Everything you share is confidential.',
        action: 'Book a Session',
        actionIcon: <Calendar className="w-4 h-4" />,
      },
      {
        title: 'Study Skills & Time Management',
        description: 'Feeling overwhelmed often comes from poor boundaries, not lack of ability. Learn how to study smarter and protect your downtime.',
        action: 'Get Resources',
        actionIcon: <BookOpen className="w-4 h-4" />,
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Resources</h1>
          <p className="text-slate-500 mt-1">
            Build anchors outside of achievement. These resources help you grow in every dimension.
          </p>
        </div>

        <div className="space-y-8">
          {resourceCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.category}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-9 h-9 rounded-lg ${cat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900">{cat.category}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {cat.items.map((item) => (
                    <div
                      key={item.title}
                      className={`bg-white rounded-2xl shadow-sm border ${cat.borderColor} p-5 hover:shadow-md transition-shadow`}
                    >
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                      <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors border border-slate-200">
                        {item.actionIcon}
                        {item.action}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Crisis Support Section */}
        <div className="mt-10 bg-red-50 rounded-2xl border border-red-100 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-900">Crisis Support</h2>
              <p className="text-sm text-red-700 mt-2 leading-relaxed">
                If you are in immediate crisis, you are not alone. These resources are available 24/7 and trained to help.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-slate-900 text-sm">Crisis Text Line</span>
                  </div>
                  <p className="text-sm text-slate-600">Text HOME to 741741 to connect with a trained crisis counselor.</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-slate-900 text-sm">988 Suicide & Crisis Lifeline</span>
                  </div>
                  <p className="text-sm text-slate-600">Call or text 988 for free, confidential support 24/7.</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-slate-900 text-sm">Trevor Project</span>
                  </div>
                  <p className="text-sm text-slate-600">LGBTQ+ support: call 1-866-488-7386 or text START to 678678.</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-red-600" />
                    <span className="font-semibold text-slate-900 text-sm">School Counselor</span>
                  </div>
                  <p className="text-sm text-slate-600">Your school counselor is trained and confidential. Reach out today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* General support banner */}
        <div className="mt-8 bg-primary-500 rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Not sure where to start?</h3>
              <p className="text-primary-100 text-sm mt-1">
                Talk to a trusted adult — a parent, teacher, or counselor. Sometimes just saying "I am struggling" is the hardest and most important step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
