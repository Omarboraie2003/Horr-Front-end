import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { contractsService } from '../../../services/contractsService';
import Pagination from '../components/Pagination';
import { Briefcase } from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Normalize inconsistent casing coming from the API */
function normalize(c) {
  return {
    id: c.id ?? c.Id,
    title: c.proposalTitle ?? c.jobTitle ?? c.title ?? c.Title ?? 'Untitled',
    freelancerName: c.freelancerName ?? c.freelancer_Name ?? c.FreelancerName ?? 'Unknown',
    startedAt: c.startedAt ?? c.startDate ?? c.StartedAt ?? null,
    agreedRate: c.agreedRate ?? c.AgreedRate ?? 0,
    status: (c.status ?? c.Status ?? '').toString().toLowerCase(),
  };
}

function isActive(status) {
  return status === 'active' || status === '1';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return '—';
  }
}

const currencyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function statusLabel(status) {
  if (isActive(status)) return 'Active';
  if (status === 'completed' || status === '2') return 'Completed';
  if (status === 'cancelled' || status === '3') return 'Cancelled';
  if (status === 'closed' || status === '4') return 'Closed';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClass(status) {
  if (isActive(status)) return 'status-active';
  return 'status-closed';
}

// ── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="contract-item" style={{ pointerEvents: 'none' }}>
      <div className="contract-info">
        <div
          style={{
            height: 16,
            width: '60%',
            borderRadius: 6,
            background: 'linear-gradient(90deg, #eae8e4 25%, #f2f0ec 50%, #eae8e4 75%)',
            backgroundSize: '200% 100%',
            animation: 'cd-shimmer 1.5s infinite',
            marginBottom: 10,
          }}
        />
        <div
          style={{
            height: 12,
            width: '40%',
            borderRadius: 4,
            background: 'linear-gradient(90deg, #eae8e4 25%, #f2f0ec 50%, #eae8e4 75%)',
            backgroundSize: '200% 100%',
            animation: 'cd-shimmer 1.5s infinite',
          }}
        />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MyContractsPage() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('active'); // 'active' | 'history'

  const fetchContracts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await contractsService.getMyContracts({ page, limit: 10 });
      // API may return { items, totalPages } or an array directly
      if (Array.isArray(result)) {
        setContracts(result.map(normalize));
        setTotalPages(1);
      } else {
        setContracts((result?.items ?? result?.data ?? []).map(normalize));
        setTotalPages(result?.totalPages ?? result?.TotalPages ?? 1);
      }
    } catch (err) {
      console.error('[MyContractsPage] fetch error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load contracts.');
      setContracts([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  // ── Client-side tab filtering ──────────────────────────────────────────────
  const filtered =
    tab === 'active'
      ? contracts.filter((c) => isActive(c.status))
      : contracts.filter((c) => !isActive(c.status));

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="main-container mx-auto">
      <div className="content-card">
        {/* Tabs */}
        <div className="tabs-header">
          <button
            className={`tab-btn ${tab === 'active' ? 'active' : ''}`}
            onClick={() => setTab('active')}
          >
            Active
          </button>
          <button
            className={`tab-btn ${tab === 'history' ? 'active' : ''}`}
            onClick={() => setTab('history')}
          >
            History
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{ color: '#d32f2f', padding: '1rem 0', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {/* Content */}
        <div className="tab-content active">
          <h1 className="page-title">
            {tab === 'active' ? 'Active Contracts' : 'Closed Contracts'}
          </h1>

          <div className="contract-list">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <Briefcase size={48} strokeWidth={1.4} />
                <p>
                  {tab === 'active'
                    ? 'No active contracts yet'
                    : 'No contract history yet'}
                </p>
              </div>
            ) : (
              filtered.map((c) => {
                const clickable = isActive(c.status);
                return (
                  <div
                    key={c.id}
                    className="contract-item"
                    style={{ cursor: clickable ? 'pointer' : 'default' }}
                    onClick={clickable ? () => navigate(`/client/contracts/${c.id}`) : undefined}
                  >
                    <div className="contract-info">
                      <h3>{c.title}</h3>
                      <div className="client-info">Freelancer: {c.freelancerName}</div>
                      <div className="date-range">Started: {formatDate(c.startedAt)}</div>
                    </div>
                    <div className="contract-meta">
                      <div className="contract-rate">{currencyFmt.format(c.agreedRate)}</div>
                      <span className={`contract-status ${statusClass(c.status)}`}>
                        {statusLabel(c.status)}
                      </span>
                      {clickable && (
                        <button
                          className="view-details-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/client/contracts/${c.id}`);
                          }}
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
              );
            })
          )}
        </div>
      </div>
    </div>

    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
  </div>
);
}
