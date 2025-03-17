import { COLORS, GRADIENTS } from "./colors";
import { SHADOWS } from "./effects";
import { SIZES } from "./sizes";
import { BORDER_RADIUS, SPACING } from "./spacings";
import { FONT_SIZES, FONT_WEIGHTS, FONTS } from "./typography";

const theme = {
  color: COLORS,
  gradient: GRADIENTS,
  spacing: SPACING,
  fontSize: FONT_SIZES,
  fontWeight: FONT_WEIGHTS,
  font: FONTS,
  borderRadius: BORDER_RADIUS,
  shadow: SHADOWS,
  size: SIZES,
};

export type Theme = typeof theme;

export default theme;
