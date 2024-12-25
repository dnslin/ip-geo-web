import { TabType } from "../types/ip";

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["ipv4", "ipv6"] as const).map((tab) => (
        <button
          key={tab}
          className={`px-4 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            activeTab === tab
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
