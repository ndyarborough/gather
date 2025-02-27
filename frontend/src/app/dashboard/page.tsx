import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <p className="mb-4">Select a section to get started:</p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Link
          href="/dashboard/profile"
          className="p-4 border rounded-lg text-center hover:bg-gray-100 transition"
        >
          Profile
        </Link>
        <Link
          href="/dashboard/messages"
          className="p-4 border rounded-lg text-center hover:bg-gray-100 transition"
        >
          Messages
        </Link>
        <Link
          href="/dashboard/events"
          className="p-4 border rounded-lg text-center hover:bg-gray-100 transition"
        >
          Events
        </Link>
        <Link
          href="/dashboard/events/create"
          className="p-4 border rounded-lg text-center hover:bg-gray-100 transition"
        >
          Create Event
        </Link>
      </div>
    </div>
  );
}
