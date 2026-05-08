/**
 * store.ts — localStorage-backed data store
 * All data lives in the browser. No backend required.
 *
 * Keys:
 *   icgc_events          — upcoming events array
 *   icgc_gallery         — gallery sundays array
 *   icgc_submissions     — next-steps form submissions
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  featured: boolean;
  color: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  span: "normal" | "wide" | "tall";
}

export interface GallerySunday {
  id: string;
  date: string;
  theme: string;
  verse: string;
  photos: GalleryPhoto[];
  createdAt: string;
}

export interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  submittedAt: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Events ────────────────────────────────────────────────────────────────────

const EVENTS_KEY = "icgc_events";

export const CATEGORY_COLORS: Record<string, string> = {
  Worship:    "bg-primary/10 text-primary border-primary/20",
  Prayer:     "bg-gold/10 text-gold-foreground border-gold/20",
  Teaching:   "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
  Youth:      "bg-sky-500/10 text-sky-700 border-sky-500/20",
  Outreach:   "bg-orange-500/10 text-orange-700 border-orange-500/20",
  Fellowship: "bg-rose-500/10 text-rose-700 border-rose-500/20",
  Special:    "bg-purple-500/10 text-purple-700 border-purple-500/20",
};

export function getEvents(): Event[] {
  return load<Event[]>(EVENTS_KEY, []);
}

export function saveEvent(event: Omit<Event, "id" | "createdAt">): Event {
  const events = getEvents();
  const newEvent: Event = { ...event, id: uid(), createdAt: new Date().toISOString() };
  save(EVENTS_KEY, [...events, newEvent]);
  return newEvent;
}

export function updateEvent(id: string, data: Partial<Omit<Event, "id" | "createdAt">>): void {
  const events = getEvents().map((e) => (e.id === id ? { ...e, ...data } : e));
  save(EVENTS_KEY, events);
}

export function deleteEvent(id: string): void {
  save(EVENTS_KEY, getEvents().filter((e) => e.id !== id));
}

// ── Gallery ───────────────────────────────────────────────────────────────────

const GALLERY_KEY = "icgc_gallery";

export function getGallery(): GallerySunday[] {
  return load<GallerySunday[]>(GALLERY_KEY, []);
}

export function saveSunday(data: Omit<GallerySunday, "id" | "photos" | "createdAt">): GallerySunday {
  const gallery = getGallery();
  const sunday: GallerySunday = { ...data, id: uid(), photos: [], createdAt: new Date().toISOString() };
  save(GALLERY_KEY, [sunday, ...gallery]);
  return sunday;
}

export function updateSunday(id: string, data: Partial<Omit<GallerySunday, "id" | "photos" | "createdAt">>): void {
  const gallery = getGallery().map((s) => (s.id === id ? { ...s, ...data } : s));
  save(GALLERY_KEY, gallery);
}

export function deleteSunday(id: string): void {
  save(GALLERY_KEY, getGallery().filter((s) => s.id !== id));
}

export function addPhoto(sundayId: string, photo: Omit<GalleryPhoto, "id">): void {
  const gallery = getGallery().map((s) => {
    if (s.id !== sundayId) return s;
    return { ...s, photos: [...s.photos, { ...photo, id: uid() }] };
  });
  save(GALLERY_KEY, gallery);
}

export function deletePhoto(sundayId: string, photoId: string): void {
  const gallery = getGallery().map((s) => {
    if (s.id !== sundayId) return s;
    return { ...s, photos: s.photos.filter((p) => p.id !== photoId) };
  });
  save(GALLERY_KEY, gallery);
}

// ── Submissions ───────────────────────────────────────────────────────────────

const SUBMISSIONS_KEY = "icgc_submissions";

export function getSubmissions(): Submission[] {
  return load<Submission[]>(SUBMISSIONS_KEY, []);
}

export function saveSubmission(data: Omit<Submission, "id" | "submittedAt">): void {
  const submissions = getSubmissions();
  const sub: Submission = { ...data, id: uid(), submittedAt: new Date().toISOString() };
  save(SUBMISSIONS_KEY, [sub, ...submissions]);
}

export function deleteSubmission(id: string): void {
  save(SUBMISSIONS_KEY, getSubmissions().filter((s) => s.id !== id));
}
