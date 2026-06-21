import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';
import Layout from '../components/Layout';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  BookOpen,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Activity,
  Calendar,
  Anchor,
  Compass,
  Heart,
  Info,
} from 'lucide-react';

interface IdentityMap {
  achievement: number;
  relationships: number;
  creativity: number;
  wellness: number;
  growth: number;
  community: number;
}

interface ScoreHistoryItem {
  score: number;
  achievement: number;
  relationships: number;
  creativity: number;
  wellness: number;
  growth: number;
  community: number;
  created_at: string;
}

interface JournalEntry {
  id: string;
  content: string;
  themes: string[];
  sentiment: string;
  drift_risk: string;
  identity_score: number;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [identityMap, setIdentityMap] = useState<IdentityMap | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [scoreHistory, setScoreHistory] = useState<ScoreHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [driftRisk, setDriftRisk] = useState<string>('Low');
  const [trend, setTrend] = useState<'Improving' | 'Stable' | 'At Risk'>('Stable');
  const [weeklySummary, setWeeklySummary] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const { data: mapData } = await supabase
        .from('identity_maps')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (mapData) {
        setIdentityMap(mapData);
      }
      const { data: entriesData } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      setEntries(entriesData ?? []);

      const { data: scoresData } = await supabase
        .from('identity_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(10);
      setScoreHistory(scoresData ?? []);

      const latestEntry = entriesData?.[0];
      if (latestEntry) {
        setDriftRisk(latestEntry.drift_risk || 'Low');
      }

      if (scoresData && scoresData.length >= 2) {
        const first = scoresData[0].score;
        const last = scoresData[scoresData.length - 1].score;
        if (last > first + 5) setTrend('Improving');
        else if (last < first - 5) setTrend('At Risk');
        else setTrend('Stable');
      }

      if (entriesData && entriesData.length > 0) {
        const allThemes = entriesData.flatMap((e) => e.themes || []);
        const themeCounts: Record<string, number> = {};
        allThemes.forEach((t) => {
          themeCounts[t] = (themeCounts[t] || 0) + 1;
        });
        const topThemes = Object.entries(themeCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([t]) => t);
        const missingThemes = ['Creativity', 'Relationships', 'Community'].filter(
          (t) => !allThemes.some((at) => at.includes(t))
        );
        if (topThemes.length > 0) {
          setWeeklySummary(
            `This week your journal entries focused on ${topThemes.join(', ')}. ${
              missingThemes.length > 0
                ? `Consider reflecting on ${missingThemes.join(' and ')} to build a more balanced identity.`
                : 'Great variety in your reflections!'
            }`
          );
        } else {
          setWeeklySummary('Write your first journal entry to get a weekly summary!');
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [user]);

  const radarData = identityMap
    ? [
        { subject: 'Achievement', A: identityMap.achievement, fullMark: 100 },
        { subject: 'Relationships', A: identityMap.relationships, fullMark: 100 },
        { subject: 'Creativity', A: identityMap.creativity, fullMark: 100 },
        { subject: 'Wellness', A: identityMap.wellness, fullMark: 100 },
        { subject: 'Growth', A: identityMap.growth, fullMark: 100 },
        { subject: 'Community', A: identityMap.community, fullMark: 100 },
      ]
    : [];

  const barData = identityMap
    ? [
        { name: 'Achievement', value: identityMap.achievement },
        { name: 'Relationships', value: identityMap.relationships },
        { name: 'Creativity', value: identityMap.creativity },
        { name: 'Wellness', value: identityMap.wellness },
        { name: 'Growth', value: identityMap.growth },
        { name: 'Community', value: identityMap.community },
      ]
    : [];

  const lineData = scoreHistory.map((s, i) => ({
    name: `Entry ${i + 1}`,
    score: s.score,
  }));

  const journeyData = scoreHistory.map((s, i) => ({
    week: `W${i + 1}`,
    Achievement: s.achievement,
    Relationships: s.relationships,
    Creativity: s.creativity,
    Wellness: s.wellness,
    Growth: s.growth,
    Community: s.community,
  }));

  const getDriftConfig = (risk: string) => {
    if (risk === 'High')
      return {
        color: 'bg-red-50 border-red-100 text-red-700',
        icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
        label: 'High Risk',
      };
    if (risk === 'Medium')
      return {
        color: 'bg-amber-50 border-amber-100 text-amber-700',
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        label: 'Medium Risk',
      };
    return {
      color: 'bg-success-50 border-success-100 text-success-700',
      icon: <CheckCircle2 className="w-5 h-5 text-success-500" />,
      label: 'Low Risk',
    };
  };

  const getTrendConfig = (t: string) => {
    if (t === 'Improving')
      return {
        color: 'bg-success-50 border-success-100 text-success-700',
        icon: <TrendingUp className="w-5 h-5 text-success-500" />,
        label: 'Improving',
        desc: 'Your identity balance is getting stronger over time.',
      };
    if (t === 'At Risk')
      return {
        color: 'bg-red-50 border-red-100 text-red-700',
        icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
        label: 'At Risk',
        desc: 'Your identity balance is declining. Take action soon.',
      };
    return {
      color: 'bg-primary-50 border-primary-100 text-primary-700',
      icon: <Activity className="w-5 h-5 text-primary-500" />,
      label: 'Stable',
      desc: 'Your identity balance is holding steady.',
    };
  };

  const driftConfig = getDriftConfig(driftRisk);
  const trendConfig = getTrendConfig(trend);

  // Anchor Strength calculation
  const getAnchorStrength = (map: IdentityMap | null) => {
    if (!map) return { strong: [], growing: [], attention: [] };
    const dims = [
      { name: 'Achievement', value: map.achievement },
      { name: 'Relationships', value: map.relationships },
      { name: 'Creativity', value: map.creativity },
      { name: 'Wellness', value: map.wellness },
      { name: 'Growth', value: map.growth },
      { name: 'Community', value: map.community },
    ];
    return {
      strong: dims.filter((d) => d.value >= 70),
      growing: dims.filter((d) => d.value >= 50 && d.value < 70),
      attention: dims.filter((d) => d.value < 50),
    };
  };

  const anchorStrength = getAnchorStrength(identityMap);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Your identity wellness at a glance</p>
        </div>

        {/* Mirror not judge message */}
        <div className="bg-primary-50 rounded-2xl border border-primary-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-primary-900">A mirror, not a judge</h2>
              <p className="text-sm text-primary-700 mt-1 leading-relaxed">
                Anchor AI is designed to help you notice patterns in how you define yourself over time. It does not diagnose, judge, or measure your worth. Think of it as a gentle mirror that helps you see yourself more clearly.
              </p>
            </div>
          </div>
        </div>

        {/* Anchor Strength + Drift Risk + Trend */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Anchor Strength */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Anchor Strength</h2>
            </div>
            <div className="space-y-4">
              {anchorStrength.strong.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-success-600 uppercase tracking-wide mb-2">Strong Anchors</h3>
                  <div className="space-y-1.5">
                    {anchorStrength.strong.map((dim) => (
                      <div key={dim.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{dim.name}</span>
                        <span className="font-semibold text-success-600">{dim.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {anchorStrength.growing.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">Growing Anchors</h3>
                  <div className="space-y-1.5">
                    {anchorStrength.growing.map((dim) => (
                      <div key={dim.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{dim.name}</span>
                        <span className="font-semibold text-primary-600">{dim.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {anchorStrength.attention.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-warning-600 uppercase tracking-wide mb-2">Needs Attention</h3>
                  <div className="space-y-1.5">
                    {anchorStrength.attention.map((dim) => (
                      <div key={dim.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">{dim.name}</span>
                        <span className="font-semibold text-warning-600">{dim.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {identityMap && anchorStrength.strong.length === 0 && anchorStrength.growing.length === 0 && anchorStrength.attention.length === 0 && (
                <p className="text-sm text-slate-500">Complete onboarding to see your anchor strengths.</p>
              )}
              {!identityMap && (
                <p className="text-sm text-slate-500">Complete onboarding to see your anchor strengths.</p>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Strong anchors are dimensions where your identity is well-developed. Growing anchors are developing. Needs attention means that dimension could use more focus.
            </p>
          </div>

          <div className={`rounded-2xl shadow-sm border p-6 ${driftConfig.color}`}>
            <div className="flex items-center gap-2 mb-4">
              {driftConfig.icon}
              <h2 className="font-semibold">Identity Drift Risk</h2>
            </div>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-white/70">
              {driftConfig.label}
            </span>
            <p className="text-sm mt-3 opacity-90">
              {driftRisk === 'High'
                ? 'Your self-worth is heavily tied to achievement. Immediate attention recommended.'
                : driftRisk === 'Medium'
                ? 'Some achievement-identity linkage detected. Build non-performance anchors.'
                : 'Your identity is well-balanced across multiple sources of self-worth.'}
            </p>
          </div>

          <div className={`rounded-2xl shadow-sm border p-6 ${trendConfig.color}`}>
            <div className="flex items-center gap-2 mb-4">
              {trendConfig.icon}
              <h2 className="font-semibold">Identity Trend</h2>
            </div>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-white/70">
              {trendConfig.label}
            </span>
            <p className="text-sm mt-3 opacity-90">{trendConfig.desc}</p>
          </div>
        </div>

        {/* Who Am I Becoming? + Score Trend */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Who Am I Becoming?</h2>
            </div>
            <div className="h-72">
              {identityMap ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Identity"
                      dataKey="A"
                      stroke="#6366F1"
                      fill="#6366F1"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Complete onboarding to generate your identity map
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Score Trend</h2>
            </div>
            <div className="h-72">
              {lineData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#6366F1"
                      strokeWidth={3}
                      dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Write multiple journal entries to see your trend over time
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Identity Journey */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary-500" />
            <h2 className="font-semibold text-slate-900">My Identity Journey</h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            See how your identity dimensions have evolved over time as you have journaled.
          </p>
          <div className="h-80">
            {journeyData.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={journeyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="week" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                  />
                  <Area type="monotone" dataKey="Achievement" stroke="#6366F1" fill="#6366F1" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="Relationships" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="Creativity" stroke="#A855F7" fill="#A855F7" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="Wellness" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="Growth" stroke="#22C55E" fill="#22C55E" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="Community" stroke="#EC4899" fill="#EC4899" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                <div className="text-center">
                  <Info className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                  <p>Write multiple journal entries to see your identity journey unfold.</p>
                  <p className="text-sm mt-1">Each entry shapes your evolving identity map.</p>
                </div>
              </div>
            )}
          </div>
          {journeyData.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { label: 'Achievement', color: 'bg-[#6366F1]' },
                { label: 'Relationships', color: 'bg-[#14B8A6]' },
                { label: 'Creativity', color: 'bg-[#A855F7]' },
                { label: 'Wellness', color: 'bg-[#F59E0B]' },
                { label: 'Growth', color: 'bg-[#22C55E]' },
                { label: 'Community', color: 'bg-[#EC4899]' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dimension Breakdown + Weekly Summary */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Dimension Breakdown</h2>
            </div>
            <div className="h-72">
              {identityMap ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#475569', fontSize: 12 }} width={100} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                    />
                    <Bar dataKey="value" fill="#6366F1" radius={[0, 6, 6, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Complete onboarding to see your dimensions
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Weekly Reflection Summary</h2>
            </div>
            <div className="p-5 rounded-xl bg-primary-50 border border-primary-100">
              <p className="text-sm text-slate-700 leading-relaxed">{weeklySummary}</p>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">Recent Entry Themes</h3>
              {entries.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(entries.flatMap((e) => e.themes || []))).slice(0, 8).map((theme) => (
                    <span
                      key={theme}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No entries yet. Start writing!</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Journal Entries */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-500" />
              <h2 className="font-semibold text-slate-900">Recent Journal Entries</h2>
            </div>
            <Link
              to="/journal"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600"
            >
              Write new entry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {entries.length > 0 ? (
            <div className="space-y-3">
              {entries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-sm text-slate-700 line-clamp-2">{entry.content}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                    {entry.sentiment && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 font-medium">
                        {entry.sentiment}
                      </span>
                    )}
                    {entry.drift_risk && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          entry.drift_risk === 'High'
                            ? 'bg-red-100 text-red-700'
                            : entry.drift_risk === 'Medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-success-100 text-success-700'
                        }`}
                      >
                        Drift: {entry.drift_risk}
                      </span>
                    )}
                    {entry.identity_score && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        Score: {entry.identity_score}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 mb-4">No journal entries yet. Start reflecting today!</p>
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600"
              >
                Write your first entry
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
