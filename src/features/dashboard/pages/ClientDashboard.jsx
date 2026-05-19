import { useState } from "react";
import { Link } from "react-router-dom";
import { getOnboardingStatus, getClientJobs } from "../../../services/clientService";
import useAuth from "../../auth/hooks/useAuth";
import useFetch from "../../../hooks/useFetch";

/**
 * ClientDashboard Page
 */

// ── Step Card ─────────────────────────────────────────────────────────────────
function StepCard({ step }) {
  return (
    <div className={`cd-step-card ${step.done ? "is-done" : "is-pending"}`}>
      <div className="cd-step-body">
        <p className="cd-step-required">{step.requiredLabel}</p>
        {step.done ? (
          <div className="cd-step-verified">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {step.actionLabel}
          </div>
        ) : (
          <Link className="cd-step-link" to={step.actionHref}>{step.actionLabel}</Link>
        )}
      </div>
      <span className="cd-step-icon" aria-hidden="true">{step.icon}</span>
    </div>
  );
}


// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const dateLabel = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString()
    : "Unknown date";

  const statItems = [
    { key: "Invited",   val: job.stats?.invitationsCount ?? "—" },
    { key: "Proposals", val: job.stats?.proposalsCount   ?? "—" },
    { key: "Hired",     val: job.stats?.hiredCount       ?? "—" },
  ];

  return (
    <div className="cd-job-card">
      <div className="cd-job-head">
        <div>
          <h3 className="cd-job-title">{job.title}</h3>
          <p className="cd-job-meta">Created {dateLabel}</p>
          <Link className="cd-btn-open" to={`/client/manage-job/${job.id}`}>
            Open job post ↗
          </Link>
        </div>
        <button className="cd-job-menu" aria-label="Job options">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
      <div className="cd-job-stats">
        {statItems.map(({ key, val }) => (
          <div className="cd-stat" key={key}>
            <span className="cd-stat-val">{val}</span>
            <span className="cd-stat-key">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


// ── Post Job Placeholder Card ─────────────────────────────────────────────────
function PostJobCard() {
  return (
    <Link to="/client/post-job" className="cd-post-job-card">
      <div className="cd-post-job-inner">
        <span className="cd-post-job-plus">+</span>
        <span>Post a job</span>
      </div>
    </Link>
  );
}


// ── Skeleton Loader ───────────────────────────────────────────────────────────
function Skeleton({ height = 120, width = "100%", radius = 10 }) {
  return (
    <div
      className="cd-skeleton"
      style={{ height, width, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}


// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function ClientDashboard() {
  const [view, setView] = useState("grid");
  const { user, loading: authLoading } = useAuth();
  
  const { 
    data: steps, 
    loading: stepsLoading, 
    error: stepsError 
  } = useFetch(getOnboardingStatus);

  const { 
    data: jobsData, 
    loading: jobsLoading, 
    error: jobsError 
  } = useFetch(getClientJobs);

  const loading = authLoading || stepsLoading || jobsLoading;
  const error = stepsError || jobsError;
  const jobs = jobsData || [];

  const stepCards = steps
    ? [
        {
          id: "billing",
          requiredLabel: "Required to hire",
          actionLabel: "Add a billing method",
          actionHref: "/client/settings#billing",
          done: steps.billingAdded,
          icon: "$",
        },
        {
          id: "email",
          requiredLabel: "Required to hire",
          actionLabel: "Email address verified",
          done: steps.emailVerified,
          icon: "✉️",
        },
        {
          id: "phone",
          requiredLabel: "Required to publish a job",
          actionLabel: "Phone number verified",
          done: steps.phoneVerified,
          icon: "📱",
        },
      ]
    : null;

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #f9f9f9;
          color: #1a1a1a;
          font-family: 'DM Sans', system-ui, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        :root {
          --cd-gold:    #C9A84C;
          --cd-gold-lt: #E5C97A;
          --cd-surface: #ffffff;
          --cd-border:  #e8e8e8;
          --cd-muted:   #888;
          --cd-success: #2e7d32;
          --cd-radius:  10px;
          --cd-text:    #1a1a1a;
        }

        .cd-main {
          flex: 1;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
          padding: 2.5rem 2rem 4rem;
        }

        /* Welcome */
        .cd-welcome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cd-welcome-title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; }
        .cd-welcome-title span { color: var(--cd-gold); }

        .cd-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, var(--cd-gold), var(--cd-gold-lt));
          color: #fff;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.6rem 1.3rem;
          border-radius: 8px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: opacity 0.18s, transform 0.15s;
        }
        .cd-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Section label */
        .cd-section-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cd-muted);
          margin-bottom: 1rem;
        }

        /* Steps */
        .cd-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 680px) { .cd-steps-grid { grid-template-columns: 1fr; } }

        .cd-step-card {
          background: var(--cd-surface);
          border: 1px solid var(--cd-border);
          border-radius: var(--cd-radius);
          padding: 1.3rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .cd-step-card.is-pending { border-color: #C9A84C55; }
        .cd-step-card.is-done    { opacity: 0.7; }

        .cd-step-required {
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--cd-muted);
          margin-bottom: 0.45rem;
        }
        .cd-step-link {
          color: var(--cd-gold);
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          transition: border-color 0.15s;
        }
        .cd-step-link:hover { border-color: var(--cd-gold); }
        .cd-step-verified {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--cd-success);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .cd-step-icon { font-size: 1.5rem; flex-shrink: 0; }

        /* Overview header */
        .cd-overview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .cd-toggle-group {
          display: flex;
          background: var(--cd-surface);
          border: 1px solid var(--cd-border);
          border-radius: 8px;
          padding: 3px;
          gap: 2px;
        }
        .cd-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--cd-muted);
          padding: 0.28rem 0.75rem;
          border-radius: 6px;
          transition: background 0.15s, color 0.15s;
        }
        .cd-toggle-btn.active {
          background: #f0ebe0;
          color: #7a6030;
          font-weight: 600;
        }

        /* Jobs */
        .cd-jobs-wrap { display: grid; gap: 1rem; }
        .cd-jobs-wrap.view-grid {
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        }
        .cd-jobs-wrap.view-list { grid-template-columns: 1fr; }

        .cd-job-card {
          background: var(--cd-surface);
          border: 1px solid var(--cd-border);
          border-radius: var(--cd-radius);
          padding: 1.4rem;
          transition: box-shadow 0.18s, transform 0.15s;
        }
        .cd-job-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .cd-job-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.3rem;
        }
        .cd-job-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem; }
        .cd-job-meta  { font-size: 0.78rem; color: var(--cd-muted); margin-bottom: 0.85rem; }
        .cd-btn-open {
          display: inline-block;
          background: #f5f0e6;
          color: #7a6030;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.32rem 0.8rem;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.15s;
        }
        .cd-btn-open:hover { background: #ede5d0; }
        .cd-job-menu {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--cd-muted);
          padding: 0.25rem;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }
        .cd-job-menu:hover { color: var(--cd-text); background: #f0f0f0; }
        .cd-job-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.4rem;
          border-top: 1px solid var(--cd-border);
          padding-top: 1.1rem;
        }
        .cd-stat { display: flex; flex-direction: column; align-items: center; gap: 0.18rem; }
        .cd-stat-val { font-size: 1.1rem; font-weight: 700; color: var(--cd-text); }
        .cd-stat-key { font-size: 0.65rem; color: var(--cd-muted); text-transform: uppercase; letter-spacing: 0.05em; }

        /* Post job card */
        .cd-post-job-card {
          background: var(--cd-surface);
          border: 1.5px dashed #d4c9a8;
          border-radius: var(--cd-radius);
          min-height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: border-color 0.18s, background 0.18s;
        }
        .cd-post-job-card:hover { border-color: var(--cd-gold); background: #fdf9f0; }
        .cd-post-job-inner {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--cd-gold);
          font-weight: 600;
          font-size: 0.95rem;
        }
        .cd-post-job-plus { font-size: 1.4rem; line-height: 1; }

        /* Skeleton */
        .cd-skeleton {
          background: linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%);
          background-size: 200% 100%;
          animation: cd-shimmer 1.4s infinite;
        }
        @keyframes cd-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Error */
        .cd-error {
          background: #fff3f3;
          border: 1px solid #fcc;
          border-radius: var(--cd-radius);
          padding: 1.25rem 1.5rem;
          color: #c00;
          font-size: 0.9rem;
        }
      `}</style>

      <main className="cd-main">

        {/* Welcome */}
        <div className="cd-welcome">
          <h1 className="cd-welcome-title">
            Welcome back,{" "}
            {loading
              ? <Skeleton height={28} width={120} radius={6} />
              : <span>{user?.firstName || user?.fullName?.split(" ")[0] || "there"}</span>
            }
          </h1>
          <a href="/client/post-job" className="cd-btn-primary">+ Post a job</a>
        </div>

        {/* Onboarding Steps */}
        <p className="cd-section-label">Last steps before you can hire</p>
        <div className="cd-steps-grid">
          {loading || !stepCards
            ? [1, 2, 3].map((i) => <Skeleton key={i} height={100} radius={10} />)
            : stepCards.map((step) => <StepCard key={step.id} step={step} />)
          }
        </div>

        {/* Overview */}
        <div className="cd-overview-header">
          <p className="cd-section-label" style={{ marginBottom: 0 }}>Overview</p>
          <div className="cd-toggle-group">
            <button className={`cd-toggle-btn ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>Grid</button>
            <button className={`cd-toggle-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>List</button>
          </div>
        </div>

        {error && <div className="cd-error">⚠ Could not load your dashboard: {error}</div>}

        {!error && (
          <div className={`cd-jobs-wrap ${view === "grid" ? "view-grid" : "view-list"}`}>
            {loading
              ? [1, 2].map((i) => <Skeleton key={i} height={200} radius={10} />)
              : jobs.map((job) => <JobCard key={job.id} job={job} />)
            }
            {!loading && <PostJobCard />}
          </div>
        )}

      </main>
    </>
  );
}
