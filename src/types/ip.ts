export type TabType = "ipv4" | "ipv6";

export interface LocationInfo {
  continent: string;
  country: string;
  province: string;
  city: string;
  longitude: string;
  latitude: string;
  timezone: string;
}

export interface NetworkInfo {
  asn: string;
  asnName: string;
  isp: string;
  cidr: string;
  startIP: string;
  endIP: string;
  totalIPs: string;
}

export interface IPInfo {
  address: string;
  type: TabType;
  flag: string;
  organization: string;
  location: LocationInfo;
  network: NetworkInfo;
}
