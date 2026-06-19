import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Star, MessageSquare, Package, ArrowLeft } from 'lucide-react';
import { useContractQuery } from '../../../hooks/useContractDelivery';
import { contractsService } from '../../../services/contractsService';
import { getChatByContract } from '../../../services/chatService';

// ── Helpers ───────────────────────────────────────────────────────────────────

function n(contract, key, ...fallbacks) {
  for (const k of [key, ...fallbacks]) {
    if (contract[k] != null) return contract[k];
  }
  return undefined;
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try { return new Date(dateStr).toLocaleDateString(); } catch { return '—'; }
}

const currencyFmt = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2,
});

function normalizeStatus(contract) {
  return (contract.status ?? contract.Status ?? '').toString().toLowerCase();
}

function isActiveStatus(s) {
  return s === 'active' || s === '1';
}

function isCompletedOrClosed(s) {
  return ['completed', 'closed', '2', '5'].includes(s);
}

// ── Spinner ───────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '40vh',
    }}>
      <div style={{
        width: 40, height: 40,
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Interactive Star Rating ───────────────────────────────────────────────────

function StarRating({ value, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = readOnly ? star <= value : star <= (hover || value);
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            style={{
              background: 'none', border: 'none', cursor: readOnly ? 'default' : 'pointer',
              padding: '0.15rem', transition: 'transform 0.15s',
              transform: !readOnly && hover === star ? 'scale(1.25)' : 'scale(1)',
            }}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              size={24}
              fill={filled ? '#f59e0b' : 'none'}
              stroke={filled ? '#f59e0b' : 'var(--text)'}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
}

// ── Review Section ────────────────────────────────────────────────────────────

function ReviewSection({ contractId, existingReview }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(existingReview ?? null);

  if (submitted) {
    return (
      <div className="feedback-section">
        <h2 className="section-title">Your Review</h2>
        <StarRating value={submitted.rating ?? submitted.Rating ?? 0} readOnly />
        <p style={{ marginTop: '0.75rem', color: 'var(--text)', fontSize: '0.9rem' }}>
          {submitted.comment ?? submitted.Comment ?? ''}
        </p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a star rating before submitting');
      return;
    }
    setSubmitting(true);
    try {
      await contractsService.submitReview(contractId, { rating, comment });
      toast.success('Review submitted!');
      setSubmitted({ rating, comment });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-section">
      <h2 className="section-title">Leave a Review</h2>
      <StarRating value={rating} onChange={setRating} />
      <textarea
        className="feedback-textarea"
        placeholder="Share your experience working with this freelancer…"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <button
        className="btn-deliver"
        onClick={handleSubmit}
        disabled={submitting}
        style={{ marginTop: '0.75rem' }}
      >
        {submitting ? 'Submitting…' : 'Submit Review'}
      </button>
    </div>
  );
}

// ── Delivery History (read-only) ──────────────────────────────────────────────

function DeliveryHistory({ deliveries }) {
  if (!deliveries || deliveries.length === 0) {
    return (
      <div>
        <h2 className="section-title">Delivery History</h2>
        <p style={{ color: 'var(--text)', fontSize: '0.9rem', padding: '1rem 0' }}>
          No deliveries submitted yet
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="section-title">Delivery History</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {deliveries.map((d, i) => {
          const id = d.id ?? d.Id ?? i;
          const status = (d.status ?? d.Status ?? 'submitted').toString().toLowerCase();
          const date = d.submittedAt ?? d.SubmittedAt ?? d.createdAt ?? d.CreatedAt;
          const note = d.note ?? d.Note ?? d.message ?? d.Message ?? '';
          return (
            <div key={id} className="contract-item" style={{ cursor: 'default' }}>
              <div className="contract-info">
                <h3>Delivery #{i + 1}</h3>
                <div className="contract-meta">
                  <span>{formatDate(date)}</span>
                  {note && <span>{note.length > 80 ? note.slice(0, 80) + '…' : note}</span>}
                </div>
              </div>
              <span className={`contract-status ${status === 'approved' ? 'status-active' : 'status-closed'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ContractDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Parallel fetch: contract + deliveries
  const { data: contract, loading: contractLoading, error: contractError } = useContractQuery(id);
  const [deliveries, setDeliveries] = useState([]);
  const [delLoading, setDelLoading] = useState(true);

  const fetchDeliveries = useCallback(async () => {
    if (!id) return;
    setDelLoading(true);
    try {
      const result = await contractsService.getDeliveries(id);
      setDeliveries(Array.isArray(result) ? result : []);
    } catch {
      setDeliveries([]);
    } finally {
      setDelLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchDeliveries(); }, [fetchDeliveries]);

  // ── Loading / Error states ─────────────────────────────────────────────────
  if (contractLoading || delLoading) return <div className="main-container"><Spinner /></div>;

  if (contractError || !contract) {
    return (
      <div className="main-container">
        <div className="content-card">
          <p style={{ color: '#d32f2f', padding: '2rem 0', textAlign: 'center' }}>
            {contractError || 'Contract not found.'}
          </p>
          <Link to="/client/contracts" style={{ color: 'var(--accent)', fontWeight: 600 }}>
            ← Back to My Contracts
          </Link>
        </div>
      </div>
    );
  }

  // ── Normalize contract fields ──────────────────────────────────────────────
  const title = n(contract, 'proposalTitle', 'jobTitle', 'title', 'Title') || 'Untitled';
  const freelancer = n(contract, 'freelancerName', 'freelancer_Name', 'FreelancerName') || 'Unknown';
  const status = normalizeStatus(contract);
  const startDate = n(contract, 'startedAt', 'startDate', 'StartedAt');
  const endDate = n(contract, 'endDate', 'EndDate', 'completedAt', 'CompletedAt');
  const rate = n(contract, 'agreedRate', 'AgreedRate') ?? 0;
  const description = n(contract, 'description', 'Description', 'scope', 'Scope') || '';
  const duration = n(contract, 'duration', 'Duration', 'estimatedDuration', 'EstimatedDuration') || '—';
  const paymentType = n(contract, 'paymentType', 'PaymentType', 'type', 'Type') || '—';
  const review = n(contract, 'review', 'Review') ?? null;

  // ── Action handlers ────────────────────────────────────────────────────────
  const handleMessageFreelancer = async () => {
    try {
      const chatObj = await getChatByContract(id);
      const chatId = chatObj?.chatId ?? chatObj?.id ?? chatObj?.ChatId ?? chatObj?.Id;
      if (!chatId) {
        toast.error('Could not open chat');
        return;
      }
      navigate(`/client/messages/${chatId}`);
    } catch {
      toast.error('Could not open chat');
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="main-container">
      <Link to="/client/contracts" className="back-link" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        color: 'var(--accent)', fontWeight: 600, fontSize: '0.88rem',
        textDecoration: 'none', marginBottom: '1.25rem',
      }}>
        <ArrowLeft size={16} /> Back to My Contracts
      </Link>

      <div className="details-card">
        {/* Header */}
        <div className="contract-header">
          <div className="header-left">
            <h1 id="contract-title" style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--text-h)' }}>
              {title}
            </h1>
            <p className="client-subtitle">{freelancer}</p>
          </div>
          <div className="header-right header-buttons">
            <button className="btn-message" onClick={handleMessageFreelancer}>
              <MessageSquare size={15} /> Message Freelancer
            </button>
            {isActiveStatus(status) && (
              <button
                className="btn-deliver"
                onClick={() => navigate(`/client/contracts/${id}/deliveries`)}
              >
                <Package size={15} /> View Delivery Portal
              </button>
            )}
          </div>
        </div>

        {/* Terms Grid */}
        <div className="section-title">Contract Terms</div>
        <div className="terms-grid">
          <div className="term-item">
            <span className="term-label">Agreed Rate</span>
            <span className="term-value">{currencyFmt.format(rate)}</span>
          </div>
          <div className="term-item">
            <span className="term-label">Payment Type</span>
            <span className="term-value">{paymentType}</span>
          </div>
          <div className="term-item">
            <span className="term-label">Start Date</span>
            <span className="term-value">{formatDate(startDate)}</span>
          </div>
          <div className="term-item">
            <span className="term-label">Duration</span>
            <span className="term-value">{duration}</span>
          </div>
          {endDate && (
            <div className="term-item">
              <span className="term-label">End Date</span>
              <span className="term-value">{formatDate(endDate)}</span>
            </div>
          )}
          <div className="term-item">
            <span className="term-label">Status</span>
            <span className="term-value">
              <span className={`contract-status ${isActiveStatus(status) ? 'status-active' : 'status-closed'}`}>
                {isActiveStatus(status) ? 'Active' : status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div>
            <h2 className="section-title">Description</h2>
            <div className="description-box">{description}</div>
          </div>
        )}

        {/* Delivery History */}
        <DeliveryHistory deliveries={deliveries} />

        {/* Review Section */}
        {isCompletedOrClosed(status) && !review && (
          <ReviewSection contractId={id} existingReview={review} />
        )}
        {review && (
          <div className="feedback-section">
            <h2 className="section-title">Your Review</h2>
            <StarRating value={review.rating ?? review.Rating ?? 0} readOnly />
            <p style={{ marginTop: '0.75rem', color: 'var(--text)', fontSize: '0.9rem' }}>
              {review.comment ?? review.Comment ?? ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
