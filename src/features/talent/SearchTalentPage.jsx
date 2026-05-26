import { useState } from "react";
import TalentSearchBar from "./components/TalentSearchBar";
import TalentCard from "./components/TalentCard";

/**
 * SearchTalentPage
 * Main page for browsing and searching freelancers.
 *
 * State is ready for API integration:
 *   - Replace `talents` with data from your API call
 *   - Wire `search` value into your API query params
 *   - Wire `onFilter` to open a filter sidebar/modal when ready
 *   - Wire `onInvite` to your invite-to-job API call
 */
export default function SearchTalentPage() {
    const [search, setSearch] = useState("");

    // ── Placeholder: replace with API data ──────────────────────────────────────
    const talents = [];
    const loading = false;
    // ────────────────────────────────────────────────────────────────────────────

    const handleFilter = () => {
        // TODO: open filter sidebar or modal
    };

    const handleInvite = (talentId) => {
        // TODO: call invite-to-job API with talentId
        console.log("Invite clicked for talent:", talentId);
    };

    return (
        <>
            <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --st-gold:    #C9A84C;
          --st-gold-lt: #E5C97A;
          --st-bg:      #f5f4f1;
          --st-border:  #e6e4df;
          --st-muted:   #9a9590;
          --st-text:    #1c1a17;
          --st-radius:  12px;
        }

        .st-page {
          min-height: 100vh;
          background: var(--st-bg);
          font-family: 'DM Sans', system-ui, sans-serif;
          color: var(--st-text);
        }

        /* ── Hero ── */
        .st-hero {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          padding: 3.5rem 2rem 2rem;
          overflow: hidden;
        }

        /* decorative gold triangle */
        .st-hero-deco {
          position: absolute;
          right: 0;
          top: 10px;
          width: 180px;
          height: 180px;
          pointer-events: none;
          opacity: 0.25;
        }

        .st-hero-title {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 0.75rem;
        }

        .st-hero-sub {
          font-size: 0.95rem;
          color: var(--st-muted);
          max-width: 360px;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        /* ── Cards list ── */
        .st-list {
          max-width: 860px;
          margin: 0 auto;
          padding: 1.5rem 2rem 5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* ── Empty / Loading states ── */
        .st-state {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--st-muted);
          font-size: 0.95rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .st-state svg { opacity: 0.35; }

        /* ── Skeleton card ── */
        .st-skeleton {
          background: #ffffff;
          border: 1px solid var(--st-border);
          border-radius: var(--st-radius);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .st-skel-line {
          border-radius: 6px;
          background: linear-gradient(90deg, #eae8e4 25%, #f2f0ec 50%, #eae8e4 75%);
          background-size: 200% 100%;
          animation: st-shimmer 1.5s infinite;
        }
        @keyframes st-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 520px) {
          .st-hero, .st-list { padding-left: 1rem; padding-right: 1rem; }
        }
      `}</style>

            <div className="st-page">

                {/* Hero */}
                <div className="st-hero">
                    {/* Decorative triangle */}
                    <svg className="st-hero-deco" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="90,10 170,170 10,170" fill="none" stroke="#C9A84C" strokeWidth="2" />
                    </svg>

                    <h1 className="st-hero-title">Find Your Perfect<br />Talent</h1>
                    <p className="st-hero-sub">
                        Connect with top-rated freelancers and agencies for your next project.
                    </p>

                    <TalentSearchBar
                        value={search}
                        onChange={setSearch}
                        onFilter={handleFilter}
                    />
                </div>

                {/* Cards */}
                <div className="st-list">

                    {/* Loading skeletons */}
                    {loading && [1, 2, 3].map((i) => (
                        <div key={i} className="st-skeleton">
                            <div className="st-skel-line" style={{ height: 20, width: "40%" }} />
                            <div className="st-skel-line" style={{ height: 14, width: "70%" }} />
                            <div className="st-skel-line" style={{ height: 14, width: "55%" }} />
                            <div className="st-skel-line" style={{ height: 60 }} />
                            <div className="st-skel-line" style={{ height: 14, width: "80%" }} />
                            <div className="st-skel-line" style={{ height: 14, width: "60%" }} />
                        </div>
                    ))}

                    {/* Empty state */}
                    {!loading && talents.length === 0 && (
                        <div className="st-state">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9a9590" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <span>No talent found. Results will appear here once the API is connected.</span>
                        </div>
                    )}

                    {/* Talent cards */}
                    {!loading && talents.map((talent) => (
                        <TalentCard
                            key={talent.id}
                            talent={talent}
                            onInvite={handleInvite}
                        />
                    ))}

                </div>
            </div>
        </>
    );
}