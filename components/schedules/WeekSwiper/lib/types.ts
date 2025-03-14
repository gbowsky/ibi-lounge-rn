import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
export interface CalendarProps extends DefaultProps, CalendarHeaderProps {}

export type WeekItemProps = Pick<DefaultProps, "date"> & {
  isToday: boolean;
};

export type DefaultProps = {
  date: Date;
  selectedColor?: string;
  onDatePress: (d: Date) => void;
  onWeekSwitch: (d: Date) => void;
  showMonth?: boolean;
};

export type CalendarHeaderProps = {
  language?: Language;
};

export type Language = "ja" | "en" | "ko" | "es";

export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;
