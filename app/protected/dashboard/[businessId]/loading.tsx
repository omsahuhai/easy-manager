export default function WorkspaceLoading() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Quick actions skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-lg bg-muted/60" />
        ))}
      </div>

      {/* Metric cards skeleton */}
      <div>
        <div className="h-6 w-48 bg-muted/60 rounded mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-lg bg-muted/60" />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 rounded-lg bg-muted/60" />
        <div className="h-64 rounded-lg bg-muted/60" />
      </div>
    </div>
  );
}
