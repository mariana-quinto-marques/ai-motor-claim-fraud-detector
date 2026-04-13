'use client';

import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import { CLAIMS as INITIAL_CLAIMS } from '@/data/mockClaims';
import type { Claim, ClaimStatus, RiskLevel } from '@/types/claim';

export type PageId = 'dashboard' | 'claims' | 'fraud' | 'reports';

interface FilterState {
  type: 'all' | 'risk' | 'status';
  value: string | null;
}

interface AppState {
  activePage: PageId;
  selectedClaimId: string | null;
  filter: FilterState;
  searchQuery: string;
  claims: Claim[];
  toastMessage: string | null;
}

type Action =
  | { type: 'SET_PAGE'; page: PageId }
  | { type: 'SELECT_CLAIM'; id: string | null }
  | { type: 'SET_FILTER'; filter: FilterState }
  | { type: 'SEARCH'; query: string }
  | { type: 'UPDATE_CLAIM_STATUS'; id: string; status: ClaimStatus }
  | { type: 'SHOW_TOAST'; message: string }
  | { type: 'HIDE_TOAST' };

const initialState: AppState = {
  activePage: 'dashboard',
  selectedClaimId: null,
  filter: { type: 'all', value: null },
  searchQuery: '',
  claims: INITIAL_CLAIMS,
  toastMessage: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, activePage: action.page };
    case 'SELECT_CLAIM':
      return { ...state, selectedClaimId: action.id };
    case 'SET_FILTER':
      return { ...state, filter: action.filter };
    case 'SEARCH':
      return { ...state, searchQuery: action.query };
    case 'UPDATE_CLAIM_STATUS':
      return {
        ...state,
        claims: state.claims.map(c =>
          c.id === action.id ? { ...c, status: action.status } : c
        ),
      };
    case 'SHOW_TOAST':
      return { ...state, toastMessage: action.message };
    case 'HIDE_TOAST':
      return { ...state, toastMessage: null };
    default:
      return state;
  }
}

const PAGE_META: Record<PageId, [string, string]> = {
  dashboard: ['Overview', 'Claims Intelligence'],
  claims: ['All Claims', '24 active · Updated 2 min ago'],
  fraud: ['Fraud Hub', '7 flagged for action'],
  reports: ['Reports', 'Monthly performance overview'],
};

interface AppContextValue {
  state: AppState;
  pageMeta: [string, string];
  goPage: (page: PageId) => void;
  selectClaim: (id: string | null) => void;
  setFilter: (type: 'all' | 'risk' | 'status', value: string | null) => void;
  search: (query: string) => void;
  updateClaimStatus: (id: string, status: ClaimStatus) => void;
  toast: (message: string) => void;
  filteredClaims: Claim[];
  selectedClaim: Claim | null;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const goPage = useCallback((page: PageId) => {
    dispatch({ type: 'SET_PAGE', page });
    dispatch({ type: 'SET_FILTER', filter: { type: 'all', value: null } });
  }, []);

  const selectClaim = useCallback((id: string | null) => {
    dispatch({ type: 'SELECT_CLAIM', id });
  }, []);

  const setFilter = useCallback((type: 'all' | 'risk' | 'status', value: string | null) => {
    dispatch({ type: 'SET_FILTER', filter: { type, value } });
  }, []);

  const search = useCallback((query: string) => {
    dispatch({ type: 'SEARCH', query });
  }, []);

  const updateClaimStatus = useCallback((id: string, status: ClaimStatus) => {
    dispatch({ type: 'UPDATE_CLAIM_STATUS', id, status });
    const msgs: Record<string, string> = {
      Approved: `Claim ${id} approved`,
      Review: `${id} sent for independent review`,
      Investigating: `${id} escalated to SIU`,
      Rejected: `${id} rejected`,
    };
    dispatch({ type: 'SHOW_TOAST', message: msgs[status] || `${id} updated` });
  }, []);

  const toast = useCallback((message: string) => {
    dispatch({ type: 'SHOW_TOAST', message });
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (state.toastMessage) {
      const t = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3000);
      return () => clearTimeout(t);
    }
  }, [state.toastMessage]);

  // Filter + search
  const filteredClaims = state.claims.filter(c => {
    const lq = state.searchQuery.toLowerCase();
    if (lq && !c.name.toLowerCase().includes(lq) && !c.id.toLowerCase().includes(lq) && !c.type.toLowerCase().includes(lq)) {
      return false;
    }
    if (state.filter.type === 'risk' && c.risk !== state.filter.value) return false;
    if (state.filter.type === 'status' && c.status !== state.filter.value) return false;
    return true;
  });

  const selectedClaim = state.selectedClaimId
    ? state.claims.find(c => c.id === state.selectedClaimId) || null
    : null;

  const pageMeta = PAGE_META[state.activePage];

  return (
    <AppContext.Provider value={{
      state,
      pageMeta,
      goPage,
      selectClaim,
      setFilter,
      search,
      updateClaimStatus,
      toast,
      filteredClaims,
      selectedClaim,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
