import { theme as defaultTheme } from "@chakra-ui/core";

const fonts = { ...defaultTheme.fonts, mono: `'Menlo', monospace` };

const breakpoints = ["40em", "52em", "64em"];
const customIcons = {
  cart: {
    path: (
      <path
        fill="currentColor"
        d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
      />
    ),
    // If the icon's viewBox is `0 0 24 24`, you can ignore `viewBox`
    viewBox: "0 0 24 24",
  },
  icon2: {
    path: (
      <g fill="currentColor">
        <path d="..." />
      </g>
    ),
  },
};

const theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    bg1: "#ffb6b9",
    bg2: "#bbded6",
    bg3: "#61c0bf",
    bg4: "#fae3d9",
    brand: {
      900: "#ffb6b9",
      800: "#bbded6",
      700: "#61c0bf",
      600: "#fae3d9",
    },
  },
  icons: {
    // Add Chakra's icons
    ...defaultTheme.icons,
    ...customIcons,
  },
  fonts: {
    heading: "Georgia, serif",
  },
};

export default theme;
