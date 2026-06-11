import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getClientProposals } from '../../../services/clientService';
import ProposalsList from '../components/ProposalsList';

const JobProposalsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId'); // null = show all

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const data = await getClientProposals();
        setProposals(data);
      } catch (err) {
        setError('Failed to load proposals. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  const handleAccept = (proposal) => {
    console.log('Accept proposal:', proposal.id);
  };

  const handleReject = (proposal) => {
    console.log('Reject proposal:', proposal.id);
  };

  const filtered = jobId
    ? proposals.filter((p) => p.jobPostId === jobId)
    : proposals;

  const totalCount = filtered.length;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 3rem' }}>
      <button
        onClick={() => navigate('/client/dashboard')}
        style={{
          fontSize: '13px', color: 'var(--color-text-secondary)',
          display: 'flex', alignItems: 'center', gap: '4px',
          marginBottom: '1rem', background: 'none',
          border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        ← Back to dashboard
      </button>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '500', color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
          Job proposals
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
          {totalCount} {totalCount === 1 ? 'proposal' : 'proposals'}
          {jobId ? ' for this job' : ' across all your job posts'}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
          Loading proposals...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-danger)', fontSize: '14px' }}>
          {error}
        </div>
      ) : (
        <ProposalsList
          proposals={filtered}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default JobProposalsPage;