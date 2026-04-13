'use client';

import { useApp } from '@/context/AppContext';
import FilterBar from './FilterBar';
import ClaimsTable from './ClaimsTable';

export default function ClaimsPage() {
  const { state, filteredClaims, setFilter, selectClaim } = useApp();

  return (
    <div>
      <FilterBar filter={state.filter} onFilter={setFilter} />
      <div className="card">
        <ClaimsTable claims={filteredClaims} onSelect={selectClaim} />
      </div>
    </div>
  );
}
