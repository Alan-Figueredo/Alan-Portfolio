"use client";

import { ArrowDown } from "lucide-react";
import { useState, type ReactNode } from "react";

type EducationListProps = {
  children: ReactNode;
  hasMore: boolean;
  loadMoreLabel: string;
};

export function EducationList({ children, hasMore, loadMoreLabel }: EducationListProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`educationList${expanded ? " educationListExpanded" : ""}`}>
      <div className="educationGrid sectionContentOffset" id="education-items">
        {children}
      </div>
      {hasMore && !expanded && (
        <div className="educationLoadMoreWrap sectionContentOffset">
          <button
            className="educationLoadMore"
            type="button"
            aria-controls="education-items"
            aria-expanded={expanded}
            onClick={() => setExpanded(true)}
          >
            {loadMoreLabel}
            <ArrowDown aria-hidden="true" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
