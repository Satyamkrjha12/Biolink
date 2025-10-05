// src/lib/utils.ts
import { clsx } from "clsx"

export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
