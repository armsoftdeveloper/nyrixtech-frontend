import { Navigate } from "react-router-dom";

// Projects and Reference Projects are the same concept for a newly launched company —
// redirect to the canonical page rather than maintaining two parallel, near-duplicate listings.
export default function ProjectsPage() {
  return <Navigate to="/case-studies" replace />;
}
