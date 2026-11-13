import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LOCALE_STORAGE_KEY, useTranslation } from "../i18n";

type LanguageToggleVariant = "icon" | "compact-menu-action";

interface LanguageToggleProps {
  className?: string;
  /**
   * `icon` (default): compact icon button — suitable for headers and
   * floating chrome (e.g. the unauthenticated `/auth` page).
   * `compact-menu-action`: compact label + icon row — matches the
   * surrounding actions in `SidebarAccountMenu`.
   */
  variant?: LanguageToggleVariant;
  /**
   * Called after the language changes. Surfaces like a popover menu use
   * this to dismiss the menu once the user has acted.
   */
  onAfterToggle?: () => void;
}

/**
 * Canonical Indonesian/English toggle. Only these two languages are
 * offered here (Paperclip ships many more locale files, but this toggle
 * is deliberately ID <-> EN). The choice is persisted to localStorage
 * and read back at i18next init, so it survives reloads.
 */
export function LanguageToggle({ className, variant = "icon", onAfterToggle }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const current: "id" | "en" = i18n.language?.startsWith("id") ? "id" : "en";
  const next: "id" | "en" = current === "id" ? "en" : "id";
  // Label names the target language in its own language, so the button
  // is understandable whichever language is currently active.
  const label = next === "id" ? "Beralih ke Bahasa Indonesia" : "Switch to English";

  function handleClick() {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Ignore local storage write failures in restricted environments.
    }
    void i18n.changeLanguage(next);
    onAfterToggle?.();
  }

  if (variant === "compact-menu-action") {
    return (
      <button
        type="button"
        className={cn(
          "flex h-(--profile-popover-row-height) w-full items-center gap-(--profile-popover-row-gap) rounded-lg px-2.5 text-left text-(length:--text-compact) font-medium leading-(--profile-popover-label-line-height) text-foreground transition-colors hover:bg-accent",
          className,
        )}
        onClick={handleClick}
        aria-label={label}
      >
        <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
          <Languages className="size-4" />
        </span>
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <span className="shrink-0 text-xs font-semibold uppercase text-muted-foreground">
          {current}
        </span>
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn("text-muted-foreground", className)}
    >
      <Languages />
    </Button>
  );
}
