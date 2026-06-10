import { LayoutDashboard, MessageSquareText, Package2, Palette } from "lucide-react";

export type FrameworkId = "react" | "vue";
export type UnifiedSectionId = "overview" | "ui" | "ai" | "tokens";

export const frameworks: Array<{ id: FrameworkId; label: string }> = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
];

export const unifiedSections = [
  {
    description: "完整 Assistant 页面",
    icon: LayoutDashboard,
    id: "overview",
    label: "总览",
  },
  {
    description: "基础组件",
    icon: Package2,
    id: "ui",
    label: "UI",
  },
  {
    description: "AI 场景组件",
    icon: MessageSquareText,
    id: "ai",
    label: "AI",
  },
  {
    description: "颜色和状态",
    icon: Palette,
    id: "tokens",
    label: "tokens",
  },
] satisfies Array<{
  description: string;
  icon: React.ElementType;
  id: UnifiedSectionId;
  label: string;
}>;
