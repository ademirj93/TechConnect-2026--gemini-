export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  track: string;
}

export interface Speaker {
  id: string;
  name: string;
  specialty: string;
  role: string;
  initials: string;
  accentColor: "blue" | "purple";
}

export interface RegistrationFormData {
  fullName: string;
  email: string;
  courseOrArea: string;
}

export interface RegistrationFormErrors {
  fullName?: string;
  email?: string;
  courseOrArea?: string;
}

export type DeviceType = "mobile" | "tablet" | "desktop";
