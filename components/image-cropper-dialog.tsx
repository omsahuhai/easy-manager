"use client";

import { useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Loader2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageCropperDialogProps {
  open: boolean;
  imageSrc: string | null;
  isUploading: boolean;
  onClose: () => void;
  onConfirmCrop: (croppedAreaPixels: Area) => Promise<void>;
}

export function ImageCropperDialog({
  open,
  imageSrc,
  isUploading,
  onClose,
  onConfirmCrop,
}: ImageCropperDialogProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleApply = async () => {
    if (!croppedAreaPixels) return;
    await onConfirmCrop(croppedAreaPixels);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !isUploading) {
          handleReset();
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crop Profile Image</DialogTitle>
          <DialogDescription>
            Drag to reposition and zoom. The image will be cropped to a 1:1 square for your avatar.
          </DialogDescription>
        </DialogHeader>

        {imageSrc ? (
          <div className="space-y-4 py-2">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-lg bg-neutral-950">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_croppedArea, pixelCrop) => {
                  setCroppedAreaPixels(pixelCrop);
                }}
              />
            </div>

            <div className="flex items-center gap-3 px-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(1, +(z - 0.2).toFixed(2)))}
                disabled={isUploading || zoom <= 1}
                className="text-muted-foreground transition hover:text-foreground disabled:opacity-40"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>

              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                disabled={isUploading}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary disabled:cursor-not-allowed"
                aria-label="Image zoom"
              />

              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(2)))}
                disabled={isUploading || zoom >= 3}
                className="text-muted-foreground transition hover:text-foreground disabled:opacity-40"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleReset}
                disabled={isUploading || (crop.x === 0 && crop.y === 0 && zoom === 1)}
                title="Reset crop"
                aria-label="Reset crop"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ) : null}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              handleReset();
              onClose();
            }}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            disabled={isUploading || !croppedAreaPixels}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Apply & Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
