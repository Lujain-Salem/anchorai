import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';
import { ArrowRight, Check, Sparkles, User, Target, MessageSquare } from 'lucide-react';
import { Logo } from '../components/Logo';

const IDENTITY_AREAS = [
  { id: 'achievement', label: 'Achievement', description: 'Grades, competitions, awards' },
  { id: 'relationships', label: 'Relationships', description: 'Friends, family, community' },
  { id: 'creativity', label: 'Creativity', description: 'Art, music, writing, design' },
  { id: 'wellness', label: 'Wellness', description: 'Physical health, mental health, sleep' },
  { id: 'growth', label: 'Growth', description: 'Learning, curiosity, personal development' },
  { id: 'community', label: 'Community', description: 'Volunteering, service, belonging' },
];

export default function OnboardingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [identityAreas, setIdentityAreas] = useState<string[]>([]);
  const [reflections, setReflections] = useState({
    proud: '',
    meaning: '',
    disappointed: '',
  });
  const [generating, setGenerating] = useState(false);

  const toggleArea = (id: string) => {
    setIdentityAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const reflectionAnswers = [
      { question: 'What are you most proud of recently?', answer: reflections.proud },
      { question: 'What gives you meaning outside of achievements?', answer: reflections.meaning },
      { question: 'What do you do when you feel disappointed?', answer: reflections.disappointed },
    ];

    // Calculate initial scores based on selections
    const baseScore = 30;
    const achievement = identityAreas.includes('achievement') ? Math.min(baseScore + 25, 85) : baseScore;
    const relationships = identityAreas.includes('relationships') ? Math.min(baseScore + 25, 85) : baseScore;
    const creativity = identityAreas.includes('creativity') ? Math.min(baseScore + 25, 85) : baseScore;
    const wellness = identityAreas.includes('wellness') ? Math.min(baseScore + 25, 85) : baseScore;
    const growth = identityAreas.includes('growth') ? Math.min(baseScore + 25, 85) : baseScore;
    const community = identityAreas.includes('community') ? Math.min(baseScore + 25, 85) : baseScore;

    const overallScore = Math.round((achievement + relationships + creativity + wellness + growth + community) / 6);

    await supabase.from('profiles').upsert({
      id: user?.id,
      name: firstName,
      age: parseInt(age),
      school_grade: grade,
      identity_areas: identityAreas,
      reflection_answers: reflectionAnswers,
      identity_score: overallScore,
    });

    await supabase.from('identity_maps').upsert({
      user_id: user?.id,
      achievement,
      relationships,
      creativity,
      wellness,
      growth,
      community,
    });

    await supabase.from('identity_scores').insert({
      user_id: user?.id,
      score: overallScore,
      achievement,
      relationships,
      creativity,
      wellness,
      growth,
      community,
    });

    setGenerating(false);
    navigate('/dashboard');
  };

  const steps = [
    {
      title: 'Basic Information',
      subtitle: 'Tell us a little about yourself',
      icon: <User className="w-5 h-5" />,
    },
    {
      title: 'Identity Areas',
      subtitle: 'Which areas are currently important in your life?',
      icon: <Target className="w-5 h-5" />,
    },
    {
      title: 'Reflection Questions',
      subtitle: 'Help us understand your perspective',
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  const canProceed = () => {
    if (step === 0) return firstName && age && grade;
    if (step === 1) return identityAreas.length > 0;
    if (step === 2) return reflections.proud && reflections.meaning && reflections.disappointed;
    return false;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 mb-8">
          <Logo size={36} />
          <span className="text-xl font-bold text-slate-900">Anchor AI</span>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-primary-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
              {steps[step].icon}
            </div>
            <span className="text-sm font-medium text-primary-600">Step {step + 1} of 3</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-2 mb-1">{steps[step].title}</h1>
          <p className="text-slate-500 mb-6">{steps[step].subtitle}</p>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900"
                  placeholder="Your first name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    min={12}
                    max={18}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900"
                    placeholder="12-18"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900"
                  >
                    <option value="">Select</option>
                    <option value="7th">7th Grade</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600 mb-4">Select all that apply to you right now.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {IDENTITY_AREAS.map((area) => {
                  const isSelected = identityAreas.includes(area.id);
                  return (
                    <button
                      key={area.id}
                      onClick={() => toggleArea(area.id)}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-primary-50 border-primary-500 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-primary-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary-500 bg-primary-500' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-primary-900' : 'text-slate-900'}`}>
                          {area.label}
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ml-7 ${isSelected ? 'text-primary-700' : 'text-slate-500'}`}>
                        {area.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What are you most proud of recently?</label>
                <textarea
                  value={reflections.proud}
                  onChange={(e) => setReflections({ ...reflections, proud: e.target.value })}
                  className="w-full h-24 px-4 py-3 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900 resize-none"
                  placeholder="Something that made you feel good about yourself..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What gives you meaning outside of achievements?</label>
                <textarea
                  value={reflections.meaning}
                  onChange={(e) => setReflections({ ...reflections, meaning: e.target.value })}
                  className="w-full h-24 px-4 py-3 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900 resize-none"
                  placeholder="Activities, people, or values that matter to you..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What do you do when you feel disappointed?</label>
                <textarea
                  value={reflections.disappointed}
                  onChange={(e) => setReflections({ ...reflections, disappointed: e.target.value })}
                  className="w-full h-24 px-4 py-3 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900 resize-none"
                  placeholder="How you cope with setbacks..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!canProceed() || generating}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                {generating ? 'Generating...' : 'Generate Identity Map'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
