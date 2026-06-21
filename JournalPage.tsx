import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth-context';
import Layout from '../components/Layout';
import { PenLine, Sparkles, ArrowRight, Lightbulb, Wand2 } from 'lucide-react';

const ACHIEVEMENT_KEYWORDS = ['competition', 'grade', 'score', 'win', 'lose', 'rank', 'test', 'exam', 'gpa', 'college', 'application', 'rejected', 'accepted', 'award', 'trophy', 'medal', 'first place', 'second place', 'failed', 'passed', 'marks', 'percentage', 'percentile', 'sat', 'act', 'scholarship'];
const SELF_CRITICISM_KEYWORDS = ['not good enough', 'worthless', 'failure', 'stupid', 'idiot', 'disappoint', 'let down', 'useless', 'inadequate', 'inferior', 'pathetic', 'loser', 'waste', 'should have', 'could have', 'if only', 'messed up', 'ruined', 'terrible', 'awful', 'pathetic'];
const NEGATIVE_EMOTION_KEYWORDS = ['sad', 'depressed', 'hopeless', 'anxious', 'stressed', 'overwhelmed', 'exhausted', 'burned out', 'burnt out', 'empty', 'numb', 'dread', 'panic', 'cry', 'crying', 'tears', 'hate myself', 'hate my life', 'no point', 'give up', 'quit', 'isolated', 'lonely', 'alone', 'rejected', 'abandoned'];
const BALANCE_KEYWORDS = ['friend', 'family', 'hobby', 'passion', 'joy', 'grateful', 'thankful', 'appreciate', 'love', 'care', 'support', 'help', 'together', 'community', 'connect', 'meaning', 'purpose', 'growth', 'learning', 'curious', 'excited', 'hopeful', 'proud', 'confident', 'kind', 'creative', 'fun', 'laugh', 'smile', 'relax', 'calm', 'peaceful', 'nature', 'music', 'art', 'sport', 'exercise', 'healthy', 'rest', 'sleep'];

function detectKeywords(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw.toLowerCase()));
}

function calculateSentiment(lower: string): string {
  const positive = ['happy', 'excited', 'grateful', 'thankful', 'proud', 'confident', 'joy', 'love', 'hopeful', 'optimistic', 'calm', 'peaceful', 'relaxed', 'good', 'great', 'amazing', 'wonderful', 'fantastic', 'excellent'];
  const negative = ['sad', 'depressed', 'hopeless', 'miserable', 'terrible', 'awful', 'horrible', 'devastated', 'crushed', 'broken', 'empty', 'numb', 'angry', 'frustrated', 'disappointed', 'ashamed', 'guilty', 'scared', 'terrified', 'worried', 'anxious', 'stressed', 'overwhelmed'];
  const posCount = positive.filter((w) => lower.includes(w)).length;
  const negCount = negative.filter((w) => lower.includes(w)).length;
  if (posCount > negCount + 1) return 'Positive';
  if (negCount > posCount + 1) return 'Negative';
  return 'Mixed';
}

function calculateDriftRisk(achievementCount: number, selfCriticismCount: number, negativeCount: number, balanceCount: number): string {
  const riskScore = achievementCount * 2 + selfCriticismCount * 3 + negativeCount * 1.5 - balanceCount * 1;
  if (riskScore >= 8) return 'High';
  if (riskScore >= 4) return 'Medium';
  return 'Low';
}

function generateInsight(_achievementCount: number, selfCriticismCount: number, negativeCount: number, balanceCount: number, driftRisk: string, _content: string): { title: string; text: string; type: string }[] {
  const insights: { title: string; text: string; type: string }[] = [];

  if (driftRisk === 'High') {
    insights.push({
      title: 'Achievement Dependence: High',
      text: 'Your self-worth appears strongly linked to external outcomes. When achievement becomes the primary measure of who you are, setbacks feel like personal failures rather than learning moments.',
      type: 'warning',
    });
  } else if (driftRisk === 'Medium') {
    insights.push({
      title: 'Achievement Dependence: Moderate',
      text: 'You value achievement, which is healthy. However, there are signs that performance outcomes are starting to influence how you see yourself more than they should.',
      type: 'caution',
    });
  } else {
    insights.push({
      title: 'Achievement Dependence: Low',
      text: 'You maintain a healthy perspective on achievement. Your identity seems rooted in multiple sources of meaning.',
      type: 'positive',
    });
  }

  if (selfCriticismCount >= 2) {
    insights.push({
      title: 'Self-Criticism Detected',
      text: 'The language you used toward yourself is harsh. Research shows that self-compassion leads to better resilience than self-criticism. Try speaking to yourself as you would to a good friend.',
      type: 'warning',
    });
  }

  if (negativeCount >= 3 && balanceCount <= 2) {
    insights.push({
      title: 'Emotional Imbalance',
      text: 'Your reflection contains significant emotional distress with few balancing signals. This is a moment to reach out — to a friend, family member, or counselor.',
      type: 'warning',
    });
  }

  if (balanceCount >= 3) {
    insights.push({
      title: 'Balanced Identity Signals',
      text: 'Great — you referenced relationships, hobbies, or values outside of achievement. These are your anchors. Keep nurturing them.',
      type: 'positive',
    });
  }

  return insights;
}

export default function JournalPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const loadDemo = () => {
    setContent('I got rejected from a competition and now feel like I am not good enough. I worked so hard for months and now it feels like all that effort was wasted. My parents are going to be so disappointed. I do not know what I am worth if I cannot win.');
  };

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setAnalyzing(true);
    setError('');

    try {
      const lower = content.toLowerCase();
      const achievementWords = detectKeywords(content, ACHIEVEMENT_KEYWORDS);
      const selfCriticismWords = detectKeywords(content, SELF_CRITICISM_KEYWORDS);
      const negativeEmotionWords = detectKeywords(content, NEGATIVE_EMOTION_KEYWORDS);
      const balanceWords = detectKeywords(content, BALANCE_KEYWORDS);

      const themes: string[] = [];
      if (achievementWords.length > 0) themes.push('Achievement');
      if (selfCriticismWords.length > 0) themes.push('Self-Criticism');
      if (negativeEmotionWords.length > 0) themes.push('Emotional Distress');
      if (balanceWords.length > 0) themes.push('Balanced Identity');
      if (lower.includes('friend') || lower.includes('social') || lower.includes('alone')) themes.push('Social/Relationships');
      if (lower.includes('parent') || lower.includes('mom') || lower.includes('dad') || lower.includes('family')) themes.push('Family Expectations');
      if (themes.length === 0) themes.push('General Reflection');

      const sentiment = calculateSentiment(lower);
      const driftRisk = calculateDriftRisk(achievementWords.length, selfCriticismWords.length, negativeEmotionWords.length, balanceWords.length);

      const insights = generateInsight(
        achievementWords.length,
        selfCriticismWords.length,
        negativeEmotionWords.length,
        balanceWords.length,
        driftRisk,
        content
      );

      const recommendations = [
        ...(driftRisk === 'High'
          ? [
              { category: 'Immediate Action', text: 'Take 10 minutes away from any achievement-related task. Write 3 things you value about yourself that have nothing to do with winning or performance.' },
              { category: 'Reframe', text: 'Your worth is not defined by one outcome. Months of effort built skills, discipline, and resilience — those stay with you regardless of the result.' },
            ]
          : []),
        ...(driftRisk === 'Medium'
          ? [
              { category: 'Balance', text: 'This week, schedule one activity purely for enjoyment — no competition, no scoring, no performance metric.' },
            ]
          : []),
        { category: 'Reflection Prompt', text: 'What strengths do you have that are completely unrelated to competitions, grades, or awards?' },
        { category: 'Support', text: 'Consider talking to a school counselor or trusted adult about how you are feeling. You do not have to process this alone.' },
      ];

      // Get current identity map
      const { data: mapData } = await supabase
        .from('identity_maps')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      // Calculate new identity score
      const currentMap = mapData ?? {
        achievement: 30,
        relationships: 30,
        creativity: 30,
        wellness: 30,
        growth: 30,
        community: 30,
      };

      // Adjust identity map based on journal analysis
      const newAchievement = Math.max(20, Math.min(95, currentMap.achievement + (driftRisk === 'High' ? 8 : driftRisk === 'Medium' ? 4 : -2)));
      const newRelationships = Math.max(20, Math.min(95, currentMap.relationships + (balanceWords.filter((w) => w.includes('friend') || w.includes('family')).length > 0 ? 3 : -1)));
      const newCreativity = Math.max(20, Math.min(95, currentMap.creativity + (balanceWords.filter((w) => w.includes('art') || w.includes('music') || w.includes('creative')).length > 0 ? 3 : 0)));
      const newWellness = Math.max(20, Math.min(95, currentMap.wellness + (negativeEmotionWords.length >= 3 ? -3 : 1)));
      const newGrowth = Math.max(20, Math.min(95, currentMap.growth + (selfCriticismWords.length >= 2 ? 2 : 3)));
      const newCommunity = Math.max(20, Math.min(95, currentMap.community + (balanceWords.filter((w) => w.includes('community') || w.includes('help') || w.includes('together')).length > 0 ? 3 : 0)));

      const newScore = Math.round((newAchievement + newRelationships + newCreativity + newWellness + newGrowth + newCommunity) / 6);

      // Update identity map
      await supabase.from('identity_maps').upsert({
        user_id: user?.id,
        achievement: newAchievement,
        relationships: newRelationships,
        creativity: newCreativity,
        wellness: newWellness,
        growth: newGrowth,
        community: newCommunity,
      });

      // Save score history
      await supabase.from('identity_scores').insert({
        user_id: user?.id,
        score: newScore,
        achievement: newAchievement,
        relationships: newRelationships,
        creativity: newCreativity,
        wellness: newWellness,
        growth: newGrowth,
        community: newCommunity,
      });

      // Update profile score
      await supabase.from('profiles').update({ identity_score: newScore }).eq('id', user?.id);

      // Save journal entry
      const { error: insertError } = await supabase.from('journal_entries').insert({
        user_id: user?.id,
        content: content.trim(),
        themes,
        sentiment,
        drift_risk: driftRisk,
        identity_score: newScore,
        recommendations,
      });

      if (insertError) throw insertError;

      navigate('/analysis', {
        state: {
          themes,
          sentiment,
          driftRisk,
          recommendations,
          insights,
          content: content.trim(),
          identityScore: newScore,
          achievementDependence: driftRisk,
          detectedKeywords: {
            achievement: achievementWords,
            selfCriticism: selfCriticismWords,
            negativeEmotion: negativeEmotionWords,
            balance: balanceWords,
          },
        },
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PenLine className="w-6 h-6 text-primary-500" />
            Journal
          </h1>
          <p className="text-slate-500 mt-1">Write freely. Our AI analyzes your reflection for identity drift patterns.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="journal" className="block text-sm font-medium text-slate-700">
              Today's Reflection
            </label>
            <button
              onClick={loadDemo}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              Load Demo Case
            </button>
          </div>
          <textarea
            id="journal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="I got rejected from a competition and now feel like I am not good enough..."
            className="w-full h-64 px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-slate-900 resize-none text-base leading-relaxed"
          />

          <div className="mt-4 p-4 rounded-xl bg-primary-50 border border-primary-100 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-primary-900">Tip</p>
              <p className="text-sm text-primary-700 mt-0.5">
                Be honest about your feelings. The more specific you are, the better our AI can detect subtle identity drift patterns.
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!content.trim() || analyzing}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Reflection
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
