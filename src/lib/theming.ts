import type { AllThemePropertyNames, Theme, ThemeName } from "@themillhousegroup/svelte-common-ui";

export const MY_CUSTOM_THEME_PROPERTIES = [
  "--theme-button-gradient-start",
  "--theme-button-gradient-end",
] as const;

type MyCustomThemePropertyName = (typeof MY_CUSTOM_THEME_PROPERTIES)[number];

type MyCustomThemePropertyNames = AllThemePropertyNames<Array<MyCustomThemePropertyName>>;

export const ALL_THEMES: Record<ThemeName, Theme<MyCustomThemePropertyNames>> = {
  "LIGHT": {
    "--theme-background-color": "white",
    "--theme-matte-color": "#c0c0c0c0",
    "--theme-border-color": "black",
    "--theme-color": "black",
    "--theme-button-gradient-start": "lightgrey",
    "--theme-button-gradient-end": "white",
  },
  "DARK": {
    "--theme-background-color": "black",
    "--theme-matte-color": "#30303030",
    "--theme-border-color": "#404040",
    "--theme-color": "#a0a0a0",
    "--theme-button-gradient-start": "var(--theme-background-color)",
    "--theme-button-gradient-end": "var(--theme-border-color)",
  },
}