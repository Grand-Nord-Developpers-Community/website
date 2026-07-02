"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import {
  Contrast,
  Loader2,
  Palette,
  RotateCcw,
  RotateCw,
  Sparkles,
  Sun,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  DEFAULT_ADJUSTMENTS,
  FILTER_PRESETS,
  type ImageAdjustments,
} from "@/lib/image-editor/types";
import {
  blobToFile,
  buildFilterCss,
  createPreviewUrl,
  mergeAdjustments,
  renderEditedImage,
} from "@/lib/image-editor/utils";

type ProfileImageEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  fileName: string;
  onApply: (file: File) => void;
};

type EditorSliderProps = {
  label: string;
  icon: React.ReactNode;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

function EditorSlider({
  label,
  icon,
  value,
  min = 0,
  max = 200,
  onChange,
}: EditorSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2 font-medium">
          {icon}
          {label}
        </span>
        <span className="text-muted-foreground tabular-nums">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-secondary"
      />
    </div>
  );
}

export default function ProfileImageEditorDialog({
  open,
  onOpenChange,
  imageSrc,
  fileName,
  onApply,
}: ProfileImageEditorDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [adjustments, setAdjustments] =
    useState<ImageAdjustments>(DEFAULT_ADJUSTMENTS);
  const [activePreset, setActivePreset] = useState("original");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const filterCss = useMemo(() => buildFilterCss(adjustments), [adjustments]);

  const resetEditor = useCallback(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setAdjustments(DEFAULT_ADJUSTMENTS);
    setActivePreset("original");
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
  }, []);

  useEffect(() => {
    if (!open) {
      resetEditor();
    }
  }, [open, resetEditor]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  useEffect(() => {
    if (!open || !croppedAreaPixels) return;

    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setIsPreviewLoading(true);
      try {
        const nextPreview = await createPreviewUrl(
          imageSrc,
          croppedAreaPixels,
          rotation,
          adjustments,
        );
        if (cancelled) {
          URL.revokeObjectURL(nextPreview);
          return;
        }
        setPreviewUrl((current) => {
          if (current) URL.revokeObjectURL(current);
          return nextPreview;
        });
      } catch {
        if (!cancelled) {
          setPreviewUrl(null);
        }
      } finally {
        if (!cancelled) {
          setIsPreviewLoading(false);
        }
      }
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [open, imageSrc, croppedAreaPixels, rotation, adjustments]);

  const handleRotateLeft = () => {
    setRotation((current) => current - 90);
  };

  const handleRotateRight = () => {
    setRotation((current) => current + 90);
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = FILTER_PRESETS.find((item) => item.id === presetId);
    if (!preset) return;

    setActivePreset(presetId);
    setAdjustments(mergeAdjustments(DEFAULT_ADJUSTMENTS, preset.adjustments));
  };

  const handleAdjustmentChange = (
    key: keyof ImageAdjustments,
    value: number,
  ) => {
    setActivePreset("custom");
    setAdjustments((current) => ({ ...current, [key]: value }));
  };

  const handleResetAdjustments = () => {
    setActivePreset("original");
    setAdjustments(DEFAULT_ADJUSTMENTS);
  };

  const handleApply = async () => {
    if (!croppedAreaPixels) return;

    setIsApplying(true);
    try {
      const blob = await renderEditedImage(
        imageSrc,
        croppedAreaPixels,
        rotation,
        adjustments,
      );
      onApply(blobToFile(blob, fileName));
      onOpenChange(false);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Modifier la photo de profil</DialogTitle>
          <DialogDescription>
            Recadrez, tournez et appliquez des filtres avant de valider.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="crop" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="crop">Recadrer</TabsTrigger>
            <TabsTrigger value="filters">Filtres</TabsTrigger>
          </TabsList>

          <TabsContent value="crop" className="space-y-4">
            <div className="relative h-[320px] overflow-hidden rounded-xl bg-muted">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    borderRadius: "0.75rem",
                  },
                  cropAreaStyle: {
                    border: "2px solid hsl(var(--secondary))",
                  },
                }}
              />
            </div>

            <div className="space-y-3">
              <EditorSlider
                label="Zoom"
                icon={<Sparkles className="size-4" />}
                value={Math.round(zoom * 100)}
                min={100}
                max={300}
                onChange={(value) => setZoom(value / 100)}
              />

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRotateLeft}
                >
                  <RotateCcw className="mr-2 size-4" />
                  Tourner à gauche
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRotateRight}
                >
                  <RotateCw className="mr-2 size-4" />
                  Tourner à droite
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <div className="flex items-center justify-center rounded-xl border bg-muted/40 p-6">
              <div className="relative size-40 overflow-hidden rounded-full border-4 border-background shadow-lg">
                {isPreviewLoading ? (
                  <div className="flex size-full items-center justify-center">
                    <Loader2 className="size-6 animate-spin text-muted-foreground" />
                  </div>
                ) : previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Aperçu de la photo de profil"
                    className="size-full object-cover"
                  />
                ) : (
                  <img
                    src={imageSrc}
                    alt="Aperçu de la photo de profil"
                    className="size-full object-cover"
                    style={{ filter: filterCss }}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FILTER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition-colors",
                    activePreset === preset.id
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "hover:bg-muted",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="space-y-4 rounded-xl border p-4">
              <EditorSlider
                label="Luminosité"
                icon={<Sun className="size-4" />}
                value={adjustments.brightness}
                onChange={(value) =>
                  handleAdjustmentChange("brightness", value)
                }
              />
              <EditorSlider
                label="Contraste"
                icon={<Contrast className="size-4" />}
                value={adjustments.contrast}
                onChange={(value) => handleAdjustmentChange("contrast", value)}
              />
              <EditorSlider
                label="Saturation"
                icon={<Palette className="size-4" />}
                value={adjustments.saturation}
                onChange={(value) =>
                  handleAdjustmentChange("saturation", value)
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResetAdjustments}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isApplying}
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            disabled={isApplying || !croppedAreaPixels}
          >
            {isApplying ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Application...
              </>
            ) : (
              "Appliquer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
