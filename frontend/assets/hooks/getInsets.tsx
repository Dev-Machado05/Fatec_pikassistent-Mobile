import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function getInsets(side: "top" | "right" | "bottom" | "left") {
  const insets = useSafeAreaInsets();
  
  switch (side) {
    case "top":
      return insets.top;
    case "right":
      return insets.right;
    case "bottom":
      return insets.bottom;
    case "left":
      return insets.left;
  }
}
