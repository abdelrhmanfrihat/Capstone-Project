// Centralized application eligibility policy and evaluator.
// A single source of truth so every application surface produces identical results.
//
// UNRESOLVED POLICY DECISION: minMatchScore is null (not configured).
// Until a minimum match score is set, score-based eligibility cannot be determined.
// Hard blocking rules (training lock, closed opportunity, duplicate application)
// are still enforced regardless of policy state.
//
// To configure: set minMatchScore to a number (e.g. 70). This is a product decision
// that must not be made unilaterally in code — it should go through product review.

export interface EligibilityPolicy {
  /**
   * Minimum match score (0–100) required to apply.
   * null = not yet configured; a product decision is required.
   */
  minMatchScore: number | null;
}

export const ELIGIBILITY_POLICY: EligibilityPolicy = {
  minMatchScore: null,
};

export type EligibilityStatus =
  | "eligible"        // passes all checks including configured score threshold
  | "ineligible"      // fails a hard rule or configured score threshold
  | "policy_unset"    // hard rules pass but no score threshold is configured
  | "already_applied";// duplicate — same student, same opportunity

export interface EligibilityResult {
  status: EligibilityStatus;
  reasons: string[];
}

interface EvalParams {
  studentStatus: string;       // "Active" | "In Training" | etc.
  opportunityStatus: string;   // "Published" | "Closed" | etc.
  matchScore: number;
  alreadyApplied: boolean;
  policy?: EligibilityPolicy;
}

/**
 * Evaluate whether a student may apply to a specific opportunity.
 * Reuse this function at every application surface to guarantee consistency.
 *
 * Rule precedence (highest to lowest):
 *   1. already_applied   — deterministic duplicate check
 *   2. hard ineligibility — training lock, closed opportunity
 *   3. policy_unset      — score threshold not configured
 *   4. score threshold   — match score vs configured minimum
 *   5. eligible          — all checks passed
 */
export function evaluateEligibility({
  studentStatus,
  opportunityStatus,
  matchScore,
  alreadyApplied,
  policy = ELIGIBILITY_POLICY,
}: EvalParams): EligibilityResult {
  // 1. Duplicate application
  if (alreadyApplied) {
    return { status: "already_applied", reasons: [] };
  }

  // 2. Hard blocking rules (existing platform rules, reused verbatim)
  const reasons: string[] = [];

  if (studentStatus === "In Training") {
    reasons.push(
      "You are currently locked to an active training placement and cannot apply to new opportunities."
    );
  }

  if (opportunityStatus === "Closed") {
    reasons.push("This opportunity is no longer accepting applications.");
  }

  if (reasons.length > 0) {
    return { status: "ineligible", reasons };
  }

  // 3. Score policy not yet configured
  if (policy.minMatchScore === null) {
    return { status: "policy_unset", reasons: [] };
  }

  // 4. Configured score threshold
  if (matchScore < policy.minMatchScore) {
    reasons.push(
      `Your match score of ${matchScore}% is below the minimum required score of ${policy.minMatchScore}%.`
    );
    return { status: "ineligible", reasons };
  }

  // 5. All checks passed
  return { status: "eligible", reasons: [] };
}
