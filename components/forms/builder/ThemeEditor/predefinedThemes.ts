export const predefinedThemes = [
  {
    name: "Default",
    theme: {
      themeName: "default",
      colorPalette: "light",
      isPanelless: false,
      cssVariables: {
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(248, 248, 248, 1)",
        "--sjs-general-backcolor-dim": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(243, 243, 243, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-primary-backcolor": "rgba(37, 137, 229, 1)",
        "--sjs-primary-backcolor-light": "rgba(37, 137, 229, 0.1)",
        "--sjs-primary-backcolor-dark": "rgba(21, 119, 209, 1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-base-unit": "8px",
        "--sjs-corner-radius": "4px",
        "--sjs-shadow-small": "0px 0px 0px 1px rgba(0, 0, 0, 0.15)",
        "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-inner": "0px 0px 0px 1px rgba(0, 0, 0, 0.15)",
        "--sjs-border-default": "rgba(0, 0, 0, 0.15)",
        "--sjs-border-light": "rgba(0, 0, 0, 0.15)"
      }
    }
  },
  {
    name: "Sharp",
    theme: {
      themeName: "sharp",
      colorPalette: "light",
      isPanelless: false,
      cssVariables: {
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(228, 228, 228, 1)",
        "--sjs-general-backcolor-dim": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(238, 238, 238, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(220, 220, 220, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.6)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.6)",
        "--sjs-primary-backcolor": "rgba(103, 58, 176, 1)",
        "--sjs-primary-backcolor-light": "rgba(103, 58, 176, 0.1)",
        "--sjs-primary-backcolor-dark": "rgba(69, 24, 142, 1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-base-unit": "8px",
        "--sjs-corner-radius": "0",
        "--sjs-shadow-small": "0px 0px 0px 2px rgba(0, 0, 0, 0.2)",
        "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.2)",
        "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
        "--sjs-shadow-inner": "0px 0px 0px 2px rgba(0, 0, 0, 0.2)",
        "--sjs-border-default": "rgba(0, 0, 0, 0.25)",
        "--sjs-border-light": "rgba(0, 0, 0, 0.2)"
      }
    }
  },
  {
    name: "Flat",
    theme: {
      themeName: "flat",
      colorPalette: "light",
      isPanelless: true,
      cssVariables: {
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(245, 245, 245, 1)",
        "--sjs-general-backcolor-dim": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(250, 250, 250, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(240, 240, 240, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.5)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.5)",
        "--sjs-primary-backcolor": "rgba(92, 184, 92, 1)",
        "--sjs-primary-backcolor-light": "rgba(92, 184, 92, 0.1)",
        "--sjs-primary-backcolor-dark": "rgba(82, 164, 82, 1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-base-unit": "8px",
        "--sjs-corner-radius": "0",
        "--sjs-shadow-small": "none",
        "--sjs-shadow-medium": "none",
        "--sjs-shadow-large": "none",
        "--sjs-shadow-inner": "none",
        "--sjs-border-default": "rgba(0, 0, 0, 0.15)",
        "--sjs-border-light": "rgba(0, 0, 0, 0.1)"
      }
    }
  },
  {
    name: "Contrast",
    theme: {
      themeName: "contrast",
      colorPalette: "dark",
      isPanelless: false,
      cssVariables: {
        "--sjs-general-backcolor": "rgba(48, 48, 48, 1)",
        "--sjs-general-backcolor-dark": "rgba(36, 36, 36, 1)",
        "--sjs-general-backcolor-dim": "rgba(48, 48, 48, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(42, 42, 42, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(33, 33, 33, 1)",
        "--sjs-general-forecolor": "rgba(255, 255, 255, 0.91)",
        "--sjs-general-forecolor-light": "rgba(255, 255, 255, 0.5)",
        "--sjs-general-dim-forecolor": "rgba(255, 255, 255, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(255, 255, 255, 0.5)",
        "--sjs-primary-backcolor": "rgba(255, 152, 20, 1)",
        "--sjs-primary-backcolor-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-primary-backcolor-dark": "rgba(235, 132, 0, 1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-base-unit": "8px",
        "--sjs-corner-radius": "4px",
        "--sjs-shadow-small": "0px 0px 0px 1px rgba(255, 255, 255, 0.15)",
        "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.4)",
        "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.4)",
        "--sjs-shadow-inner": "0px 0px 0px 1px rgba(255, 255, 255, 0.15)",
        "--sjs-border-default": "rgba(255, 255, 255, 0.15)",
        "--sjs-border-light": "rgba(255, 255, 255, 0.15)"
      }
    }
  }
];