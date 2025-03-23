import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { SFSymbol, SymbolView } from "expo-symbols";
import { convertToHex } from "@/lib/colors";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof MaterialCommunityIcons>;
const iconsMap: Record<string, SFSymbol> = {
  "calendar-clock": "calendar.badge.clock",
  "format-list-text": "list.bullet",
  "cog-outline": "gearshape",
  "human-male-board": "inset.filled.rectangle.and.person.filled",
  "hammer-screwdriver": "wrench.and.screwdriver.fill",
  alert: "exclamationmark.triangle.fill",
  "fire-circle": "fireplace",
  "book-multiple": "book.pages",
  "calendar-account": "calendar.and.person",
  web: "network",
  "map-marker": "map.fill",
  "school-outline": "graduationcap",
  "folder-outline": "folder.badge.person.crop",
  "calendar-import": "calendar.badge.plus",
  restart: "restart.circle",
  "dots-horizontal-circle": "ellipsis.circle.fill",
  check: "checkmark",
};

export const GlobalIcon = ({
  icon,
  size = 20,
  color,
}: {
  icon: Props["name"];
  size: number;
  color?: string;
}) => {
  if (!["ios", "macos"].includes(Platform.OS)) {
    return <MaterialCommunityIcons name={icon} size={size} color={color} />;
  }
  const finalColor = color ? convertToHex(color) : undefined;

  return (
    <SymbolView
      name={iconsMap[icon]}
      tintColor={finalColor}
      size={size}
      type="monochrome"
    />
  );
};
