import { useState, useEffect } from "react";
import { IPCard } from "./components/IPCard";
import { TabSelector } from "./components/TabSelector";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTheme } from "./hooks/useTheme";
import { TabType, IPResponse } from "./types/ip";
import { ipAPI } from "./services/api";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("ipv4");
  const { isDark, toggleDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [ipv4Data, setIpv4Data] = useState<IPResponse | null>(null);
  const [ipv6Data, setIpv6Data] = useState<IPResponse | null>(null);

  useEffect(() => {
    const fetchIPData = async () => {
      setLoading(true);
      try {
        const [v4Response, v6Response] = await Promise.allSettled([
          ipAPI.getCurrentIPv4(),
          ipAPI.getCurrentIPv6(),
        ]);

        // 处理IPv4响应
        if (v4Response.status === "fulfilled") {
          setIpv4Data(v4Response.value);
        }

        // 处理IPv6响应
        if (v6Response.status === "fulfilled") {
          setIpv6Data(v6Response.value);
        }

        // 根据可用的网络类型设置 activeTab
        if (
          v4Response.status === "rejected" &&
          v6Response.status === "fulfilled"
        ) {
          setActiveTab("ipv6");
        } else if (
          v4Response.status === "fulfilled" &&
          v6Response.status === "rejected"
        ) {
          setActiveTab("ipv4");
        }
      } catch (error) {
        console.error("获取IP信息失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIPData();
  }, []);

  // 转换IPResponse为IPInfo
  const convertToIPInfo = (data: IPResponse, type: TabType) => {
    return {
      address: data.ip,
      type,
      flag: `https://dl.wjy.me/flags/${data.location.country.code.toLowerCase()}.svg`,
      organization: `${data.isp.name} · ${data.network.type}`,
      location: {
        continent: `${data.location.continent.name} (${data.location.continent.code})`,
        country: `${data.location.country.name} (${data.location.country.code})`,
        province: data.location.region.name,
        city: data.location.city.name,
        longitude: String(data.location.location.longitude),
        latitude: String(data.location.location.latitude),
        timezone: data.location.location.timezone,
      },
      network: {
        asn: String(data.asn.number),
        asnName: data.asn.name,
        isp: data.isp.name,
        cidr: data.network.cidr,
        startIP: data.network.start_ip,
        endIP: data.network.end_ip,
        totalIPs: String(data.network.total_ips),
      },
    };
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-transparent to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            {loading ? (
              <div className="px-4 sm:px-8 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300">
                正在检测网络...
              </div>
            ) : ipv4Data && ipv6Data ? (
              <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
            ) : (
              <div className="px-4 sm:px-8 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300">
                {ipv4Data ? "IPv4网络" : ipv6Data ? "IPv6网络" : "网络检测失败"}
              </div>
            )}
            <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            {ipv4Data && activeTab === "ipv4" && (
              <IPCard data={convertToIPInfo(ipv4Data, "ipv4")} />
            )}
            {ipv6Data && activeTab === "ipv6" && (
              <IPCard data={convertToIPInfo(ipv6Data, "ipv6")} />
            )}
            {!ipv4Data && !ipv6Data && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                未检测到可用网络
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
