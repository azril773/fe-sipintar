export default function BadgeStatus({ status }: { status: string }) {
  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
    suspended: "bg-red-100 text-red-800",
  };

  const colorClass = statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status.toUpperCase()}
    </span>
  );
}