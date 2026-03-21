import { Dimensions } from "react-native";

const getScreenSize = (option: "height" | "width") => {
  if (option == "height") {
    return Dimensions.get("window").height;
  } else {
    return Dimensions.get("window").width;
  }
};

export default getScreenSize;
