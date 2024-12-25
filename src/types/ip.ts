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

export interface IPResponse {
  ip: string;
  version: string;
  asn: {
    number: number;
    name: string;
    info: string;
  };
  network: {
    cidr: string;
    start_ip: string;
    end_ip: string;
    total_ips: number;
    type: string;
  };
  location: {
    continent: {
      code: string;
      name: string;
    };
    country: {
      code: string;
      name: string;
    };
    region: {
      code: string;
      name: string;
    };
    city: {
      name: string;
    };
    location: {
      latitude: number;
      longitude: number;
      accuracy_radius: number;
      timezone: string;
    };
  };
  isp: {
    name: string;
    type: string;
  };
}
