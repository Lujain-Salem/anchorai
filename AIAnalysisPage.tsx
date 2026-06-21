import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Sparkles,
  Tag,
  Smile,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  Info,
  TrendingUp,
  Search,
  Heart,
  BarChart3,
  Eye,
} from 'lucide-react';


interface DetectedKeywords {
  achievement: string[];
  selfCriticism: string[];
  negativeEmotion: string[];
  balance: string[];
}

interface AIInsight {
  title: string;
  text: string;
  type: string;
}

interface AnalysisState {
  themes: string[];
  sentiment: string;
  driftRisk: string;
  recommendations: { category: string; text: string }[];
  insights: AIInsight[];
  content: string;
  identityScore: number;
  achievementDependence: string;
  detectedKeywords: DetectedKeywords;
}

export default function AIAnalysisPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as AnalysisState | null;

  if (!state) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto text-center py-20">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No analysis available</h2>
          <p className="text-slate-500 mb-6">Write a journal entry first to see your AI analysis.</p>
          <button
            onClick={() => navigate('/journal')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600"
          >
            <BookOpen className="w-5 h-5" />
            Go to Journal
          </button>
        </div>
      </Layout>
    );
  }

  const { themes, sentiment, driftRisk, recommendations, insights, content, identityScore, detectedKeywords } = state;

  const sentimentIcon =
    sentiment === 'Positive' ? (
      <Smile className="w-5 h-5 text-success-500" />
    ) : sentiment === 'Negative' ? (
      <AlertTriangle className="w-5 h-5 text-red-500" />
    ) : (
      <Info className="w-5 h-5 text-primary-500" />
    );

  const driftConfig = {
    High: {
      color: 'bg-red-50 border-red-100 text-red-700',
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      label: 'High Risk',
      desc: 'Your self-worth appears strongly tied to achievement. Immediate attention recommended.',
    },
    Medium: {
      color: 'bg-amber-50 border-amber-100 text-amber-700',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      label: 'Medium Risk',
      desc: 'Some achievement-identity linkage detected. Consider building non-performance anchors.',
    },
    Low: {
      color: 'bg-success-50 border-success-100 text-success-700',
      icon: <CheckCircle2 className="w-5 h-5 text-success-500" />,
      label: 'Low Risk',
      desc: 'Your identity appears well-balanced. Keep nurturing diverse sources of self-worth.',
    },
  };

  const drift = driftConfig[driftRisk as keyof typeof driftConfig] ?? driftConfig.Low;

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-success-500';
    if (score >= 50) return 'text-primary-500';
    return 'text-amber-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-success-50';
    if (score >= 50) return 'bg-primary-50';
    return 'bg-amber-50';
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/journal')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-500" />
            AI Analysis
          </h1>
          <p className="text-slate-500 mt-1">Here is what our AI detected in your reflection.</p>
        </div>

        {/* Original entry */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Your Reflection</h2>
          <p className="text-slate-700 text-sm leading-relaxed italic">"{content}"</p>
        </div>

        {/* Identity Score + Drift Risk */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Identity Balance Score</h2>
            </div>
            <div className={`${getScoreBg(identityScore)} rounded-xl p-4 text-center`}>
              <div className={`text-4xl font-extrabold ${getScoreColor(identityScore)}`}>
                {identityScore}
              </div>
              <p className="text-sm text-slate-600 mt-2">
                {identityScore >= 70
                  ? 'Well balanced! Your identity is grounded across multiple dimensions.'
                  : identityScore >= 50
                  ? 'Moderate balance. Some dimensions need attention.'
                  : 'Your identity map shows imbalance. Focus on underdeveloped areas.'}
              </p>
            </div>
          </div>

          <div className={`rounded-2xl shadow-sm border p-6 ${drift.color}`}>
            <div className="flex items-center gap-2 mb-4">
              {drift.icon}
              <h2 className="font-semibold">Identity Drift Risk</h2>
            </div>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-white/70">
              {drift.label}
            </span>
            <p className="text-sm mt-3 opacity-90">{drift.desc}</p>
          </div>
        </div>

        {/* Detected Keywords */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900">Detected Language Patterns</h2>
          </div>
          <div className="space-y-3">
            {detectedKeywords.achievement.length > 0 && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Achievement Dependence</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {detectedKeywords.achievement.map((kw) => (
                    <span key={kw} className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            )}
            {detectedKeywords.selfCriticism.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Self-Criticism</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {detectedKeywords.selfCriticism.map((kw) => (
                    <span key={kw} className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            )}
            {detectedKeywords.negativeEmotion.length > 0 && (
              <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                <span className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Negative Emotion</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {detectedKeywords.negativeEmotion.map((kw) => (
                    <span key={kw} className="px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            )}
            {detectedKeywords.balance.length > 0 && (
              <div className="p-3 rounded-lg bg-success-50 border border-success-100">
                <span className="text-xs font-semibold text-success-700 uppercase tracking-wide">Balanced Identity Signals</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {detectedKeywords.balance.map((kw) => (
                    <span key={kw} className="px-2 py-1 rounded bg-success-100 text-success-700 text-xs font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detected Themes */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900">Detected Themes</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <span
                key={theme}
                className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Sentiment */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            {sentimentIcon}
            <h2 className="font-semibold text-slate-900">Sentiment Analysis</h2>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                sentiment === 'Positive'
                  ? 'bg-success-50 text-success-700'
                  : sentiment === 'Negative'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-primary-50 text-primary-700'
              }`}
            >
              {sentiment}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-3">
            {sentiment === 'Positive'
              ? 'Your entry expresses optimism, gratitude, or hope.'
              : sentiment === 'Negative'
              ? 'Your entry expresses sadness, frustration, or disappointment.'
              : 'Your entry contains a mix of positive and negative sentiments.'}
          </p>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {insights.map((insight, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  insight.type === 'warning'
                    ? 'bg-red-50 border-red-100'
                    : insight.type === 'caution'
                    ? 'bg-amber-50 border-amber-100'
                    : 'bg-success-50 border-success-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {insight.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  ) : insight.type === 'caution' ? (
                    <TrendingUp className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  ) : (
                    <Heart className="w-5 h-5 text-success-500 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{insight.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{insight.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Reflection Mirror */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900">Anchor Reflection</h2>
          </div>
          <div className="p-5 rounded-xl bg-primary-50/70 border border-primary-100">
            <p className="text-sm text-slate-700 leading-relaxed italic">
              {driftRisk === 'High'
                ? `Your recent journal entry suggests that setbacks may be influencing how you evaluate your self-worth. Achievement appears to play a significant role in your self-perception right now. Consider reflecting on strengths that exist independently of academic or competitive success — perhaps your kindness, your resilience, or the way you show up for people you care about.`
                : driftRisk === 'Medium'
                ? `Your reflection shows that achievement matters to you, which is completely natural. At the same time, there are hints that external outcomes may be starting to shape how you see yourself more than they once did. It might be worth asking: what parts of you would remain even if you never won another competition or received another grade?`
                : `Your reflection shows a healthy awareness of multiple dimensions of who you are. You seem to value things beyond just achievement — whether that is relationships, creativity, personal growth, or community. That is a strong foundation. Keep noticing and nurturing those parts of yourself.`}
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            This reflection is a mirror, not a diagnosis. It is meant to help you notice patterns in how you define yourself over time.
          </p>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900">Personalized Recommendations</h2>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
                    {rec.category}
                  </span>
                  <p className="text-sm text-slate-700 mt-1">{rec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
