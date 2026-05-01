import type { MenuItem } from "../data/menuData";

export function getCartKey(item: MenuItem, selectedFormat?: string, selectedMeat?: string) {
  return `${item.id}::${selectedFormat ?? "none"}::${selectedMeat ?? "none"}`;
}

export function getSelectedOptionsLabel(selectedFormat?: string, selectedMeat?: string) {
  return [selectedFormat, selectedMeat].filter(Boolean).join(" | ");
}
