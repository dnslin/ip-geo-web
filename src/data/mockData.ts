import { IPInfo } from "../types/ip";

export const ipv4Data: IPInfo = {
  address: "152.70.58.216",
  type: "ipv4",
  flag: "https://dl.wjy.me/flags/nl.svg",
  organization: "ORACLE-BMC-31898",
  location: {
    continent: "欧洲 (EU)",
    country: "荷兰 (NL)",
    province: "北荷兰省",
    city: "阿姆斯特丹",
    longitude: "4.9392",
    latitude: "52.352",
    timezone: "Europe/Amsterdam",
  },
  network: {
    asn: "31898",
    asnName: "ORACLE-BMC-31898",
    isp: "ORACLE-BMC-31898",
    cidr: "152.70.58.0/24",
    startIP: "152.70.58.0",
    endIP: "152.70.58.255",
    totalIPs: "256",
  },
};

export const ipv6Data: IPInfo = {
  address: "240e:36f:d59:d191::b05",
  type: "ipv6",
  flag: "https://dl.wjy.me/flags/cn.svg",
  organization: "中国电信 · 宽带",
  location: {
    continent: "亚洲 (AS)",
    country: "中国 (CN)",
    province: "湖北省武汉市",
    city: "洪山区",
    longitude: "114.2681",
    latitude: "30.589",
    timezone: "Asia/Shanghai",
  },
  network: {
    asn: "4134",
    asnName: "Chinanet",
    isp: "中国电信",
    cidr: "240e:36f:d59:d191::/64",
    startIP: "240e:36f:d59:d191::",
    endIP: "240e:36f:d59:d191:ffff:ffff:ffff:ffff",
    totalIPs: "9,223,372,036,854,775,808",
  },
};
