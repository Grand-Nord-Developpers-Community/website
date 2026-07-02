export type ImageAdjustments = {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
};

export type FilterPreset = {
  id: string;
  label: string;
  adjustments: Partial<ImageAdjustments>;
};

export const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
};

export const FILTER_PRESETS: FilterPreset[] = [
  { id: "original", label: "Original", adjustments: {} },
  {
    id: "vivid",
    label: "Vif",
    adjustments: { saturation: 135, contrast: 110 },
  },
  {
    id: "warm",
    label: "Chaud",
    adjustments: { sepia: 35, saturation: 115, brightness: 105 },
  },
  {
    id: "cool",
    label: "Froid",
    adjustments: { hueRotate: 15, saturation: 90, contrast: 105 },
  },
  {
    id: "mono",
    label: "Noir & blanc",
    adjustments: { grayscale: 100, contrast: 110 },
  },
  {
    id: "sepia",
    label: "Sépia",
    adjustments: { sepia: 80, contrast: 95 },
  },
  {
    id: "fade",
    label: "Doux",
    adjustments: { brightness: 108, contrast: 88, saturation: 85 },
  },
  {
    id: "dramatic",
    label: "Dramatique",
    adjustments: { contrast: 130, saturation: 80, brightness: 95 },
  },
];
