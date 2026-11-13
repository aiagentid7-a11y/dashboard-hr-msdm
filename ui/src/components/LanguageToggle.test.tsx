// @vitest-environment jsdom

import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageToggle } from "./LanguageToggle";

const mockChangeLanguage = vi.hoisted(() => vi.fn());
const mockLanguage = vi.hoisted(() => ({ value: "en" }));

vi.mock("../i18n", () => ({
  LOCALE_STORAGE_KEY: "paperclip.locale",
  useTranslation: () => ({
    i18n: {
      language: mockLanguage.value,
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

async function flushReact() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe("LanguageToggle", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    mockLanguage.value = "en";
    window.localStorage.clear();
  });

  afterEach(() => {
    container.remove();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("offers Indonesian when current language is English and persists the choice", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(<LanguageToggle />);
    });
    await flushReact();

    const button = container.querySelector("button");
    expect(button).not.toBeNull();
    expect(button?.getAttribute("aria-label")).toBe("Beralih ke Bahasa Indonesia");

    await act(async () => {
      button?.click();
    });
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith("id");
    expect(window.localStorage.getItem("paperclip.locale")).toBe("id");

    await act(async () => root.unmount());
  });

  it("offers English when current language is Indonesian", async () => {
    mockLanguage.value = "id";
    const root = createRoot(container);
    await act(async () => {
      root.render(<LanguageToggle variant="compact-menu-action" />);
    });
    await flushReact();

    const button = container.querySelector("button");
    expect(button?.getAttribute("aria-label")).toBe("Switch to English");

    await act(async () => {
      button?.click();
    });
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    expect(window.localStorage.getItem("paperclip.locale")).toBe("en");

    await act(async () => root.unmount());
  });
});
