import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import {
  COMPANY_PROFILES,
  getOpportunitiesForCompany,
  getAverageRating,
  getReviewsForCompany,
  type CompanyFullProfile,
} from "../../data/companyData";
import {
  Search,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  Star,
  Briefcase,
  ArrowRight,
  SlidersHorizontal,
  X,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  if (count === 0) return <span className="text-xs text-[var(--text-muted)] italic">No reviews yet</span>;
  return (
    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
      <span className="font-medium text-[var(--text-main)]">{rating.toFixed(1)}</span>
      <span>({count} review{count !== 1 ? "s" : ""})</span>
    </span>
  );
}

function CompanyInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
      {initials}
    </div>
  );
}

// ── Company Card ──────────────────────────────────────────────────────────────

function CompanyCard({ company }: { company: CompanyFullProfile }) {
  const navigate = useNavigate();
  const opportunities = getOpportunitiesForCompany(company.id);
  const avgRating = getAverageRating(company.id);
  const reviewCount = getReviewsForCompany(company.id).length;

  return (
    <Card className="hover:border-blue-300 transition-colors group flex flex-col">
      <CardContent className="p-5 flex flex-col gap-4 h-full">
        {/* Header: logo + name */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--border-main)] shrink-0 bg-[var(--bg-secondary)]">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
            ) : (
              <CompanyInitials name={company.name} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-semibold text-[var(--text-main)] leading-snug truncate">
                {company.name}
              </h3>
              {company.verified ? (
                <Badge variant="success" className="shrink-0">
                  <CheckCircle2 />
                  Verified
                </Badge>
              ) : (
                <Badge variant="warning" className="text-[10px] shrink-0">Pending</Badge>
              )}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{company.industry}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
          {company.tagline}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {company.city}, {company.country}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {company.workModel}
          </span>
        </div>

        {/* Specialties — first 3 */}
        {company.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {company.specialties.slice(0, 3).map((s) => (
              <Badge key={s} variant="blue" className="text-[10px] px-2 py-0.5">
                {s}
              </Badge>
            ))}
            {company.specialties.length > 3 && (
              <span className="text-[10px] text-[var(--text-muted)] self-center">
                +{company.specialties.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer: ratings + opportunities count + CTA */}
        <div className="mt-auto pt-3 border-t border-[var(--border-main)] flex items-center justify-between gap-2 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <StarRating rating={avgRating} count={reviewCount} />
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <Briefcase className="w-3 h-3" />
              {opportunities.length} open opportunit{opportunities.length !== 1 ? "ies" : "y"}
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/student/companies/${company.id}`)}
            className="shrink-0 group-hover:border-blue-400 transition-colors"
          >
            View Profile
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

const ALL_INDUSTRIES = Array.from(new Set(COMPANY_PROFILES.map((c) => c.industry))).sort();

export function StudentCompanies() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPANY_PROFILES.filter((c) => {
      if (verifiedOnly && !c.verified) return false;
      if (industryFilter && c.industry !== industryFilter) return false;
      if (q) {
        return (
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.specialties.some((s) => s.toLowerCase().includes(q)) ||
          c.city.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, industryFilter, verifiedOnly]);

  const activeFilterCount = (verifiedOnly ? 1 : 0) + (industryFilter ? 1 : 0);

  function clearFilters() {
    setVerifiedOnly(false);
    setIndustryFilter(null);
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Companies</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          Discover companies posting on InternMatch and explore their opportunities.
        </p>
      </div>

      {/* Search + filter bar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search companies, industries, or skills…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-[var(--border-main)] bg-[var(--bg-main)] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[var(--text-muted)]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((p) => !p)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                activeFilterCount > 0 || showFilters
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "border-[var(--border-main)] hover:bg-[var(--hover-bg)] text-[var(--text-main)]"
              }`}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="pt-3 border-t border-[var(--border-main)] space-y-3">
              {/* Verification filter */}
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                  Verification
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "All Companies", value: false },
                    { label: "Verified Only", value: true },
                  ].map(({ label, value }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setVerifiedOnly(value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        verifiedOnly === value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-[var(--border-main)] hover:bg-[var(--hover-bg)] text-[var(--text-main)]"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry filter */}
              <div>
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-2">
                  Industry
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setIndustryFilter(null)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      industryFilter === null
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-[var(--border-main)] hover:bg-[var(--hover-bg)] text-[var(--text-main)]"
                    }`}
                  >
                    All
                  </button>
                  {ALL_INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustryFilter(ind === industryFilter ? null : ind)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        industryFilter === ind
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-[var(--border-main)] hover:bg-[var(--hover-bg)] text-[var(--text-main)]"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-blue-600 hover:underline focus:outline-none focus:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Result count */}
      <p className="text-sm text-[var(--text-muted)]">
        {filtered.length} compan{filtered.length !== 1 ? "ies" : "y"}
        {search || activeFilterCount > 0 ? " found" : " on InternMatch"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
            <p className="font-semibold text-[var(--text-main)] mb-1">No companies found</p>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Try a different search or adjust your filters.
            </p>
            <button
              type="button"
              onClick={() => { setSearch(""); clearFilters(); }}
              className="text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:underline"
            >
              Clear search and filters
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
