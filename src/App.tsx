import { useState } from "react";
import { IPCard } from "./components/IPCard";
import { TabSelector } from "./components/TabSelector";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import { TabType } from "./types/ip";
import { ipv4Data, ipv6Data } from "./data/mockData";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("ipv4");
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-transparent to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
          </div>
        </div>

        {activeTab === "ipv4" ? (
          <IPCard data={ipv4Data} />
        ) : (
          <IPCard data={ipv6Data} />
        )}
      </div>
    </>
  );
}

export default App;
