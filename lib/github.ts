export const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? 'dhananjayverma';

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#0ea5e9',
  JavaScript: '#f59e0b',
  Python: '#22c55e',
  CSS: '#8b5cf6',
  HTML: '#f97316',
  Shell: '#64748b',
  Java: '#ea580c',
  Go: '#06b6d4',
  Ruby: '#ef4444',
  PHP: '#a855f7',
  'C++': '#f43f5e',
  C: '#78716c',
  Swift: '#f97316',
  Kotlin: '#8b5cf6',
  Rust: '#f97316',
  Dart: '#38bdf8',
};

export function languageColor(name: string | null | undefined): string {
  if (!name) return '#94a3b8';
  return LANGUAGE_COLORS[name] ?? '#64748b';
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface RepoStat {
  name: string;
  stars: number;
  forks: number;
  language: string;
  color: string;
  description: string;
  url: string;
}

export interface GitHubAnalyticsData {
  username: string;
  profileUrl: string;
  totalContributions: number;
  currentStreak: number;
  publicRepos: number;
  totalStars: number;
  contributions: ContributionDay[];
  languages: LanguageStat[];
  repos: RepoStat[];
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
}

interface ContributionsApiResponse {
  total: { lastYear: number };
  contributions: ContributionDay[];
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-github-analytics',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchAllRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;

  while (page <= 10) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
      { headers: githubHeaders(), next: { revalidate: 3600 } }
    );

    if (!response.ok) break;

    const batch = (await response.json()) as GitHubRepo[];
    if (!Array.isArray(batch) || batch.length === 0) break;

    repos.push(...batch.filter((repo) => !repo.fork));
    if (batch.length < 100) break;
    page += 1;
  }

  return repos;
}

function buildLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const counts = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }

  const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0);
  if (total === 0) return [];

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      color: languageColor(name),
    }))
    .sort((a, b) => b.percentage - a.percentage);
}

function calculateStreak(contributions: ContributionDay[]): number {
  if (contributions.length === 0) return 0;

  const sorted = [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  let expectedDate: Date | null = null;

  for (const day of sorted) {
    const current = new Date(`${day.date}T00:00:00`);

    if (day.count === 0) {
      if (streak === 0) continue;
      break;
    }

    if (!expectedDate) {
      streak = 1;
      expectedDate = new Date(current);
      expectedDate.setDate(expectedDate.getDate() - 1);
      continue;
    }

    const diffDays = Math.round(
      (expectedDate.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      streak += 1;
      expectedDate.setDate(expectedDate.getDate() - 1);
      continue;
    }

    break;
  }

  return streak;
}

export async function fetchGitHubAnalytics(
  username = GITHUB_USERNAME
): Promise<GitHubAnalyticsData> {
  const [userResponse, contributionsResponse, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    }),
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
    }),
    fetchAllRepos(username),
  ]);

  if (!userResponse.ok) {
    throw new Error(`Failed to fetch GitHub user: ${userResponse.status}`);
  }

  const user = (await userResponse.json()) as {
    public_repos: number;
    html_url: string;
  };

  let contributions: ContributionDay[] = [];
  let totalContributions = 0;

  if (contributionsResponse.ok) {
    const contributionData = (await contributionsResponse.json()) as ContributionsApiResponse;
    contributions = contributionData.contributions ?? [];
    totalContributions = contributionData.total?.lastYear ?? 0;
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const allRepos = [...repos]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime() ||
        a.name.localeCompare(b.name)
    )
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language ?? 'Other',
      color: languageColor(repo.language),
      description: repo.description ?? 'No description provided',
      url: repo.html_url,
    }));

  return {
    username,
    profileUrl: user.html_url,
    totalContributions,
    currentStreak: calculateStreak(contributions),
    publicRepos: user.public_repos,
    totalStars,
    contributions,
    languages: buildLanguageStats(repos),
    repos: allRepos,
  };
}
