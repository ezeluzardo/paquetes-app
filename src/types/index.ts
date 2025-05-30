export interface PackageCount {
  flex: number;
  gestionPost: number;
}

export interface DeliveryFormData {
  courierName: string;
  dateTime: string;
  flexCount: number;
  gestionPostCount: number;
  total: number;
  signature: string;
}
