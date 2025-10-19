
interface Option {
  value: string;
  label: string;
}

export const POSE_STYLES: Option[] = [
  { value: "Standing Confidently", label: "Confident Standing" },
  { value: "Sitting Elegantly", label: "Elegant Sitting" },
  { value: "Dynamic Action Pose", label: "Dynamic Action" },
  { value: "Candid Laughter", label: "Candid Laughter" },
  { value: "Thoughtful Profile", label: "Thoughtful Profile" },
  { value: "Reclining Gracefully", label: "Graceful Reclining" },
  { value: "Playful Twirl", label: "Playful Twirl" },
];

export const LIGHTING_STYLES: Option[] = [
  { value: "Soft Studio Lighting", label: "Soft Studio" },
  { value: "Golden Hour Natural Light", label: "Golden Hour" },
  { value: "Dramatic Rembrandt Lighting", label: "Dramatic Rembrandt" },
  { value: "Cinematic Neon Glow", label: "Cinematic Neon" },
  { value: "High-Key Bright and Airy", label: "High-Key Airy" },
  { value: "Low-Key Mysterious Shadows", label: "Low-Key Shadows" },
  { value: "Backlit with a soft halo", label: "Soft Backlight" },
];

export const ASPECT_RATIOS: Option[] = [
  { value: "1:1", label: "Square (1:1)" },
  { value: "16:9", label: "Widescreen (16:9)" },
  { value: "9:16", label: "Portrait (9:16)" },
  { value: "4:3", label: "Landscape (4:3)" },
  { value: "3:4", label: "Tall (3:4)" },
];
   