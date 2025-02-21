import { FC } from "react";

interface UserTabsProps {
  activeTab: "hosting" | "rsvps" | "interested";
  setActiveTab: (tab: "hosting" | "rsvps" | "interested") => void;
}

const UserTabs: FC<UserTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="divide-x flex flex-row border-b-1">
      {["hosting", "rsvps", "interested"].map((tab) => (
        <button
          key={tab}
          className={`w-full p-2 ${activeTab === tab ? "bg-gray-300" : ""}`}
          onClick={() => setActiveTab(tab as "hosting" | "rsvps" | "interested")}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default UserTabs;
