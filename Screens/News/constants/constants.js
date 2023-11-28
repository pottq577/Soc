import { styles, dynamicImageStyle } from "../../../Styles/newsStyles";
import { SCREEN_WIDTH } from "../../../constants/dimensions";
import { SERVER_ADDRESS } from "../../../constants/config";

const IMAGES = {
  BACK: require("../../../../constants/icons/back-button.png"),
  NO_IMAGE: require("../../../../constants/image_not_found.png"),
};
const NO_IMAGE_TEXT = "No Image";
const LOADING_MESSAGE = "뉴스를 불러오는 중입니다.";

export {
  styles,
  dynamicImageStyle,
  SCREEN_WIDTH,
  SERVER_ADDRESS,
  IMAGES,
  NO_IMAGE_TEXT,
  LOADING_MESSAGE,
};
