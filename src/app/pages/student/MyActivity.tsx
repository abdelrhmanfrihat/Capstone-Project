import React from "react";
import { useSearchParams } from "react-router";
import { StudentApplications } from "./Applications";
import { StudentInvitations } from "./Invitations";

type ActivityTab = "applications" | "invitations";

const TABS: { id: ActivityTab; label: string }[] = [
  { id: "applications", label: "Applications" },
  { id: "invitations", label: "Invitations" },
];

function resolveTab(raw: string | null): ActivityTab {
  if (raw === "invitations") return "invitations";
  return "applications";
}

export function MyActivity() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = resolveTab(searchParams.get("tab"));

  const selectTab = (tab: ActivityTab) => {
    setSearchParams({ tab }, { replace: false });
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tab: ActivityTab) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = tab === "applications" ? "invitations" : "applications";
      selectTab(next);
      (e.currentTarget.nextElementSibling as HTMLButtonElement | null)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = tab === "invitations" ? "applications" : "invitations";
      selectTab(prev);
      (e.currentTarget.previousElementSibling as HTMLButtonElement | null)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      selectTab("applications");
    } else if (e.key === "End") {
      e.preventDefault();
      selectTab("invitations");
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold shrink-0">My Activity</h1>

      {/* Tab navigation — underline style matching Feedback page */}
      <div
        role="tablist"
        aria-label="My Activity sections"
        className="flex gap-0 border-b border-[var(--border-main)] overflow-x-auto shrink-0"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {/* Applications — flex-1 lets it occupy the remaining viewport height */}
      <div
        role="tabpanel"
        id="panel-applications"
        aria-labelledby="tab-applications"
        hidden={activeTab !== "applications"}
        className="flex-1 min-h-0"
      >
        {activeTab === "applications" && <StudentApplications />}
      </div>

      <div
        role="tabpanel"
        id="panel-invitations"
        aria-labelledby="tab-invitations"
        hidden={activeTab !== "invitations"}
      >
        {activeTab === "invitations" && <StudentInvitations hideHeader />}
      </div>
    </div>
  );
}
