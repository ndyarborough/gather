const SideBar = ({ setActivePage }: { setActivePage: (page: "Profile" | "Inbox" | "CreateEvent" | "Events") => void }) => {
  return (
    <div className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer" onClick={() => setActivePage("Profile")}>Profile</li>
        <li className="cursor-pointer" onClick={() => setActivePage("Inbox")}>Inbox</li>
        <li className="cursor-pointer" onClick={() => setActivePage("CreateEvent")}>Create Event</li>
        <li className="cursor-pointer" onClick={() => setActivePage("Events")}>Events</li>
      </ul>
    </div>
  );
};

export default SideBar;
