/**
 * Tournament dialogue — the design contract every tournament page/component follows.
 * Import from here instead of inventing layout, status, or accent classes inline.
 */
import type { GameTitle, TournamentStatus } from '../types/tournament'

export const tournamentDialogue = {
  page: {
    shell: 'w-full max-w-7xl mx-auto flex-1 flex flex-col px-4 py-12 sm:px-6 lg:px-8',
    shellNarrow: 'flex w-full flex-1 min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-12 text-center sm:px-6',
    header: 'mb-8',
    title: 'font-display text-3xl font-bold text-ink-900 sm:text-4xl dark:text-white',
    sectionTitle: 'font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white',
    subtitle: 'mt-2 max-w-xl text-sm text-ink-700 dark:text-slate-400',
    sectionSubtitle: 'mt-1 text-sm text-ink-700 dark:text-slate-400',
  },

  surface: {
    panel:
      'clip-panel relative overflow-hidden rounded-xl border border-crystal-border bg-crystal-surface shadow-lg shadow-ink-900/5 dark:bg-ink-800',
    glass:
      'rounded-xl border border-crystal-border bg-crystal-glass p-12 text-center backdrop-blur-sm',
    muted: 'rounded-md border border-crystal-border bg-ink-900/[0.02] p-6 dark:bg-white/5',
    row: 'rounded-lg border border-crystal-border bg-crystal-surface p-4 dark:bg-ink-800',
    skeleton:
      'clip-panel h-80 animate-pulse rounded-xl border border-crystal-border bg-ink-900/5 dark:bg-white/5',
    skeletonRow:
      'h-20 animate-pulse rounded-lg border border-crystal-border bg-ink-900/5 dark:bg-white/5',
    metaCell: 'rounded-md bg-ink-900/[0.03] py-2 dark:bg-white/5',
  },

  type: {
    cardTitle: 'font-display text-lg font-bold leading-snug text-ink-900 dark:text-white',
    rowTitle: 'font-display text-sm font-bold text-ink-900 sm:text-base dark:text-white',
    meta: 'text-xs text-ink-700 dark:text-slate-400',
    body: 'text-sm text-ink-700 dark:text-slate-400',
    emphasis: 'text-sm font-semibold text-ink-900 dark:text-white',
    icon: 'text-crystal-primary dark:text-crystal-glow',
  },

  layout: {
    cardGrid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
    metaGrid: 'mt-4 grid grid-cols-3 gap-2 text-center',
    filterBar: 'flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4',
    sectionHeader:
      'mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between',
  },

  status: {
    live: {
      label: 'LIVE NOW',
      filterLabel: 'Live',
      className:
        'flex items-center gap-1.5 rounded bg-white/15 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm',
      dot: 'h-1.5 w-1.5 animate-pulse-live rounded-full bg-crystal-live',
    },
    upcoming: {
      label: 'UPCOMING',
      filterLabel: 'Upcoming',
      className:
        'rounded bg-white/15 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm',
      dot: '',
    },
    'registration-open': {
      label: 'REGISTRATION OPEN',
      filterLabel: 'Registration Open',
      className:
        'rounded bg-white/15 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm',
      dot: '',
    },
  } satisfies Record<
    TournamentStatus,
    { label: string; filterLabel: string; className: string; dot: string }
  >,

  gameBadge:
    'rounded bg-ink-900/30 px-2 py-1 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm',
  formatBadge: 'rounded bg-white/15 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm',
  gameChip:
    'rounded bg-crystal-primary/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-crystal-primary dark:bg-crystal-glow/10 dark:text-crystal-glow',

  /** Tailwind gradient fragments for card hero bands — keyed by game. */
  gameAccent: {
    FreeFire: 'from-crystal-primary to-crystal-glow',
    PUBG: 'from-crystal-deep to-crystal-primary',
  } satisfies Record<GameTitle, string>,

  /** Extra gradient variants for mock lists — always Crystal tokens. */
  accentVariants: [
    'from-crystal-primary to-crystal-glow',
    'from-crystal-deep to-crystal-primary',
    'from-crystal-glow to-crystal-primary',
    'from-crystal-primary to-crystal-deep',
    'from-crystal-glow to-crystal-deep',
    'from-crystal-deep to-crystal-glow',
  ] as const,

  cta: {
    primary:
      'block w-full rounded-md bg-crystal-primary py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-crystal-primary-hover dark:bg-crystal-glow dark:text-ink-900 dark:hover:bg-crystal-glow/80',
    link: 'flex items-center gap-2 text-sm font-semibold text-crystal-primary hover:underline dark:text-crystal-glow',
    textLink: 'text-sm font-semibold text-crystal-primary hover:underline dark:text-crystal-glow',
  },

  form: {
    input:
      'w-full rounded-md border border-crystal-border-strong bg-crystal-surface py-2.5 pl-9 pr-3 text-sm text-ink-900 focus:border-crystal-primary dark:bg-ink-800 dark:text-white dark:focus:border-crystal-glow',
    select:
      'rounded-md border border-crystal-border-strong bg-crystal-surface px-3 py-2.5 text-sm text-ink-900 focus:border-crystal-primary dark:bg-ink-800 dark:text-white dark:focus:border-crystal-glow',
  },

  empty: {
    icon: 'text-ink-700/40 dark:text-slate-500',
    title: 'text-sm font-semibold text-ink-900 dark:text-white',
  },
} as const

export type TournamentDialogue = typeof tournamentDialogue

/** Resolve a game’s Crystal accent gradient class. */
export function gameAccent(game: GameTitle): string {
  return tournamentDialogue.gameAccent[game]
}

/** Resolve status badge copy + classes from the dialogue. */
export function statusDialogue(status: TournamentStatus) {
  return tournamentDialogue.status[status]
}
