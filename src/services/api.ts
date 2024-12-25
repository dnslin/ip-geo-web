import axios from "axios";
import { IPResponse } from "../types/ip";

// API域名配置
const API_DOMAINS = {
  dual: "https://ip.dnsl.in", // 双栈域名
  v4: "https://v4.dnsl.in", // 仅IPv4域名
  v6: "https://v6.dnsl.in", // 仅IPv6域名
} as const;

// 创建axios实例
const createAxiosInstance = (baseURL: string) => {
  return axios.create({
    baseURL,
    timeout: 5000, // 设置超时时间
    headers: {
      Accept: "application/json",
    },
  });
};

// 创建不同版本的API客户端
const dualStackAPI = createAxiosInstance(API_DOMAINS.dual);
const ipv4API = createAxiosInstance(API_DOMAINS.v4);
const ipv6API = createAxiosInstance(API_DOMAINS.v6);

export const ipAPI = {
  // 获取当前IP信息 - 自动选择最佳域名
  getCurrentIP: async (): Promise<IPResponse> => {
    try {
      const response = await dualStackAPI.get<IPResponse>("/");
      return response.data;
    } catch (error) {
      console.error("双栈API请求失败，尝试IPv4...", error);
      try {
        const response = await ipv4API.get<IPResponse>("/");
        return response.data;
      } catch (error) {
        console.error("IPv4 API请求失败，尝试IPv6...", error);
        const response = await ipv6API.get<IPResponse>("/");
        return response.data;
      }
    }
  },

  // 查询指定IP信息 - 根据IP类型选择对应域名
  queryIP: async (ip: string): Promise<IPResponse> => {
    // 简单的IP版本检测
    const isIPv6 = ip.includes(":");
    const api = isIPv6 ? ipv6API : ipv4API;

    try {
      const response = await api.get<IPResponse>(`/ip/${ip}`);
      return response.data;
    } catch (error) {
      // 如果专用API失败，尝试使用双栈API
      console.error(
        `${isIPv6 ? "IPv6" : "IPv4"} API请求失败，尝试双栈API...`,
        error
      );
      const response = await dualStackAPI.get<IPResponse>(`/ip/${ip}`);
      return response.data;
    }
  },

  // 获取当前IPv4信息
  getCurrentIPv4: async (): Promise<IPResponse> => {
    const response = await ipv4API.get<IPResponse>("/");
    return response.data;
  },

  // 获取当前IPv6信息
  getCurrentIPv6: async (): Promise<IPResponse> => {
    const response = await ipv6API.get<IPResponse>("/");
    return response.data;
  },
};
