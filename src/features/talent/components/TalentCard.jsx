import { useState } from "react";
import TalentBadge from "./TalentBadge";
import SkillTags from "./SkillTags";

/**
 * TalentCard
 * Displays a single freelancer's profile card.
 *
 * Props:
 *   talent: {
 *     id:           string
 *     initials:     string           — e.g. "JD"
 *     avatarColor:  string           — hex background for initials avatar
 *     avatarUrl:    string | null    — if set, shows image instead of initials
 *     name:         string
 *     isVerified:   boolean
 *     badge:        "top-rated" | "rising-talent" | null
 *     title:        string           — e.g. "Senior Fullstack Developer"
 *     trustScore:   number           — e.g. 98.5
 *     rating:       number           — e.g. 4.9
 *     ratingCount:  number           — e.g. 14
 *     hourlyRate:   number           — e.g. 75
 *     bio:          string
 *     skills:       Array<{ name: string, level: "Exp"|"Int"|"Beg"|null }>
 *     availability: "Full-time" | "Part-time" | "Not available"
 *     isOnline:     boolean
 *     profileUrl:   string           — route to profile page
 *   }
 *   onInvite:  (talentId) => void    — called when "Invite to Job" is clicked
 */
export default function TalentCard({ talent = {}, onInvite }) {
    const [bookmarked, setBookmarked] = useState(false);

    const {
        id,
        initials = "?",
        avatarColor = "#888",
        avatarUrl = null,
        name = "—",
        isVerified = false,
        badge = null,
        title = "—",
        trustScore = null,
        rating = null,
        ratingCount = null,
        hourlyRate = null,
        bio = "",
        skills = [],
        availability = null,
        isOnline = false,
        profileUrl = "#",
    } = talent;

    const availabilityColors = {
        "Full-time": { color: "#2e7d32", bg: "#f0faf0" },
        "Part-time": { color: "#7a5c1e", bg: "#fdf8ee" },
        "Not available": { color: "#9a9590", bg: "#f4f4f4" },
    };
    const availStyle = availability ? availabilityColors[availability] : null;

    return (
        <>
            <style>{`
        .tc-card {
          background: #ffffff;
          border: 1px solid #e6e4df;
          border-radius: 12px;
          padding: 1.5rem;
          transition: box-shadow 0.2s, transform 0.18s;
          font-family: 'DM Sans', system-ui, sans-serif;
          color: #1c1a17;
        }
        .tc-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        /* ── Top row ── */
        .tc-top {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.1rem;
        }

        .tc-avatar {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          letter-spacing: 0.04em;
          overflow: hidden;
        }
        .tc-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .tc-info { flex: 1; min-width: 0; }

        .tc-name-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 0.2rem;
        }
        .tc-name {
          font-size: 1rem;
          font-weight: 700;
          color: #1c1a17;
        }

        .tc-title {
          font-size: 0.85rem;
          color: #9a9590;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }

        .tc-online-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #9a9590;
        }
        .tc-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tc-dot.online  { background: #43a047; }
        .tc-dot.offline { background: #ccc; }

        /* ── Right actions ── */
        .tc-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .tc-bookmark-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #ccc;
          padding: 0.2rem;
          display: flex;
          align-items: center;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }
        .tc-bookmark-btn:hover { color: #e57373; background: #fff5f5; }
        .tc-bookmark-btn.active { color: #e57373; }

        .tc-invite-btn {
          background: linear-gradient(135deg, #C9A84C, #E5C97A);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(201,168,76,0.25);
          transition: opacity 0.15s, transform 0.15s;
        }
        .tc-invite-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── Stats row ── */
        .tc-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0.9rem 0;
          border-top: 1px solid #e6e4df;
          border-bottom: 1px solid #e6e4df;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .tc-stat { display: flex; flex-direction: column; gap: 0.12rem; }
        .tc-stat-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1c1a17;
        }
        .tc-stat-key {
          font-size: 0.62rem;
          color: #9a9590;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 500;
        }

        .tc-rating-stars {
          display: flex;
          align-items: center;
          gap: 0.2rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1c1a17;
        }
        .tc-star { color: #C9A84C; }
        .tc-rating-count {
          font-size: 0.78rem;
          color: #9a9590;
          font-weight: 400;
        }

        /* ── Bio ── */
        .tc-bio {
          font-size: 0.85rem;
          color: #9a9590;
          line-height: 1.6;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Footer ── */
        .tc-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tc-availability {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          border-radius: 6px;
          padding: 0.28rem 0.65rem;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .tc-view-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 600;
          color: #C9A84C;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0;
          transition: opacity 0.15s;
          text-decoration: none;
        }
        .tc-view-btn:hover { opacity: 0.75; }
      `}</style>

            <div className="tc-card">

                {/* Top row */}
                <div className="tc-top">

                    {/* Avatar */}
                    <div className="tc-avatar" style={{ background: avatarColor }}>
                        {avatarUrl
                            ? <img src={avatarUrl} alt={name} />
                            : initials
                        }
                    </div>

                    {/* Info */}
                    <div className="tc-info">
                        <div className="tc-name-row">
                            <span className="tc-name">{name}</span>
                            {isVerified && <TalentBadge type="verified" />}
                            {badge && <TalentBadge type={badge} />}
                        </div>
                        <p className="tc-title">{title}</p>
                        <div className="tc-online-row">
                            <span className={`tc-dot ${isOnline ? "online" : "offline"}`} />
                            <span>{isOnline ? "Online" : "Offline"}</span>
                        </div>
                    </div>

                    {/* Bookmark + Invite */}
                    <div className="tc-actions">
                        <button
                            className={`tc-bookmark-btn ${bookmarked ? "active" : ""}`}
                            onClick={() => setBookmarked((p) => !p)}
                            aria-label="Bookmark freelancer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                            </svg>
                        </button>
                        <button className="tc-invite-btn" onClick={() => onInvite?.(id)}>
                            Invite to Job
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="tc-stats">
                    {trustScore !== null && (
                        <div className="tc-stat">
                            <span className="tc-stat-val">{trustScore}%</span>
                            <span className="tc-stat-key">Trust Score</span>
                        </div>
                    )}
                    {rating !== null && (
                        <div className="tc-stat">
                            <div className="tc-rating-stars">
                                <span className="tc-star">★</span>
                                {rating}
                                {ratingCount !== null && (
                                    <span className="tc-rating-count">({ratingCount})</span>
                                )}
                            </div>
                            <span className="tc-stat-key">Rating</span>
                        </div>
                    )}
                    {hourlyRate !== null && (
                        <div className="tc-stat">
                            <span className="tc-stat-val">${hourlyRate}.00 / hr</span>
                            <span className="tc-stat-key">Rate</span>
                        </div>
                    )}
                </div>

                {/* Bio */}
                {bio && <p className="tc-bio">{bio}</p>}

                {/* Skills */}
                <SkillTags skills={skills} max={4} />

                {/* Footer */}
                <div className="tc-footer">
                    {availability && availStyle && (
                        <span
                            className="tc-availability"
                            style={{ color: availStyle.color, background: availStyle.bg }}
                        >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {availability}
                        </span>
                    )}
                    <a className="tc-view-btn" href={profileUrl}>
                        View Profile
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>

            </div>
        </>
    );
}