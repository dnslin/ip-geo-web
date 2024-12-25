import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { MapModal } from "./MapModal";
import { IPInfo } from "../types/ip";
import { Toast } from "./Toast";
import { useToast } from "../hooks/useToast";

export function IPCard({ data }: { data: IPInfo }) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { isOpen, message, showToast, hideToast } = useToast();

  const copyToClipboard = async (
    text: string,
    successMessage: string = "IP地址已复制到剪贴板"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMessage);
    } catch (err) {
      console.error("复制失败:", err);
      showToast("复制失败，请重试");
    }
  };

  useEffect(() => {
    // 确保在组件挂载时也执行一次高亮
    Prism.highlightAll();
  }, [isFlipped, data]);

  return (
    <>
      <div className="animate-fadeIn space-y-8">
        <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="absolute top-[74px] right-6 z-20 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title={isFlipped ? "显示卡片正面" : "显示JSON数据"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isFlipped
                    ? "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    : "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                }
              />
            </svg>
          </button>

          <div className="card-face card-front">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src={data.flag}
                    alt="Flag"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h1
                    className="text-xl sm:text-2xl font-semibold mb-2 truncate cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => copyToClipboard(data.address)}
                    title="点击复制IP地址"
                  >
                    {data.address}
                  </h1>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                      {data.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {data.organization}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-8">
                {/* 位置信息 */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 h-full">
                  <h2 className="text-lg font-semibold mb-6 pb-2 border-b-2 border-blue-500">
                    位置信息
                  </h2>
                  <div className="divide-y divide-gray-200 dark:divide-gray-600 h-[calc(100%-4rem)]">
                    {Object.entries(data.location).reduce(
                      (acc: JSX.Element[], [key, value], _, array) => {
                        const totalItems = array.length - 1; // 减1是因为我们合并了经纬度
                        const itemHeight = `calc((100%) / ${totalItems})`;

                        if (key === "longitude") {
                          const latitude = array.find(
                            ([k]) => k === "latitude"
                          )?.[1];
                          return [
                            ...acc,
                            <div
                              key={key}
                              className="grid grid-cols-2 gap-4 hover:bg-white dark:hover:bg-gray-700 transition-colors lg:h-[var(--item-height)] cursor-pointer group"
                              style={
                                {
                                  "--item-height": itemHeight,
                                } as React.CSSProperties
                              }
                              onClick={() => setIsMapOpen(true)}
                            >
                              <span className="text-gray-600 dark:text-gray-400 font-medium text-sm my-auto py-3 lg:py-0">
                                经纬度
                                <svg
                                  className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors inline-block ml-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                  />
                                </svg>
                              </span>
                              <span className="text-sm my-auto py-3 lg:py-0 text-blue-500 group-hover:text-blue-600 dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors">
                                {value}, {latitude}
                              </span>
                            </div>,
                          ];
                        } else if (key === "latitude") {
                          return acc;
                        }
                        return [
                          ...acc,
                          <div
                            key={key}
                            className="grid grid-cols-2 gap-4 hover:bg-white dark:hover:bg-gray-700 transition-colors lg:h-[var(--item-height)]"
                            style={
                              {
                                "--item-height": itemHeight,
                              } as React.CSSProperties
                            }
                          >
                            <span className="text-gray-600 dark:text-gray-400 font-medium text-sm my-auto py-3 lg:py-0">
                              {key === "continent"
                                ? "大洲"
                                : key === "country"
                                ? "国家/地区"
                                : key === "province"
                                ? "省/州"
                                : key === "city"
                                ? "城市"
                                : "时区"}
                            </span>
                            <span className="text-sm my-auto py-3 lg:py-0">
                              {value}
                            </span>
                          </div>,
                        ];
                      },
                      []
                    )}
                  </div>
                </div>

                {/* 网络信息 */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-6 pb-2 border-b-2 border-blue-500">
                    网络信息
                  </h2>
                  <div className="space-y-4 mb-6">
                    {["asn", "asnName", "isp"].map((key) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {key === "asn"
                            ? "ASN"
                            : key === "asnName"
                            ? "ASN名称"
                            : "ISP"}
                        </span>
                        <span className="break-all">
                          {data.network[key as keyof typeof data.network]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-600">
                          <tr>
                            <th
                              className="p-3 text-left text-sm text-gray-600 dark:text-gray-300 font-medium rounded"
                              style={{ width: "100px" }}
                            >
                              网段信息
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {["cidr", "startIP", "endIP", "totalIPs"].map(
                            (key) => (
                              <tr
                                key={key}
                                className="hover:bg-white dark:hover:bg-gray-700 transition-colors"
                              >
                                <td className="p-3 text-sm whitespace-nowrap">
                                  {key === "cidr"
                                    ? "CIDR"
                                    : key === "startIP"
                                    ? "起始IP"
                                    : key === "endIP"
                                    ? "结束IP"
                                    : "IP总数"}
                                </td>
                                <td className="p-3 text-sm break-words">
                                  {
                                    data.network[
                                      key as keyof typeof data.network
                                    ]
                                  }
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-face card-back">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              {/* 标题栏 */}
              <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-t-xl border-b border-gray-200 dark:border-gray-600">
                {/* 左侧窗口按钮 */}
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>

                {/* 中间标题 */}
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    JSON Data
                  </span>
                </div>

                {/* 右侧复制按钮 */}
                <button
                  onClick={() => {
                    const jsonString = JSON.stringify(data, null, 2);
                    copyToClipboard(jsonString, "JSON数据已复制到剪贴板");
                  }}
                  className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center gap-1.5 text-sm"
                  title="复制JSON数据"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  复制
                </button>
              </div>

              {/* JSON内容区域 */}
              <div className="relative">
                <pre className="text-left overflow-auto max-h-[650px] bg-gray-50 dark:bg-gray-900 rounded-b-xl custom-scrollbar">
                  <code className="language-json block px-8 py-4">
                    {JSON.stringify(data, null, 2)}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        latitude={data.location.latitude}
        longitude={data.location.longitude}
      />
      <Toast isOpen={isOpen} message={message} onClose={hideToast} />
    </>
  );
}
