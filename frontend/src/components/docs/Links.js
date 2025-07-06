

import PdfLinks from "./PdfLinks";
import { Link } from "react-router-dom";

const Links = ( { doc, selectedVersion, versionNumber }) => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/doc">
        <button className="btn-link mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Link>

      <PdfLinks
        doc={doc}
        version={selectedVersion}
        versionNumber={versionNumber}
      />

      {/* Version Selector */}
    </div>
  );
};

export default Links;
