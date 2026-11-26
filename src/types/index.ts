export type ImageKey = string;

export interface Service {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  detail: string;
  capabilities: string[];
  image: ImageKey;
}

export interface Industry {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  image: ImageKey;
  productSlugs: string[];
}

export type ProductStatus = "Production" | "Staging" | "In Development";

export interface Product {
  slug: string;
  name: string;
  category: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  capabilities: string[];
  stack: string[];
  screenshot: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  description: string;
  location: string;
  arrangement: string;
  type: string;
  experience: string;
  openings: number;
  posted: string;
}

export interface ProcessStep {
  title: string;
  short: string;
  detail: string;
}
