import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { industries } from "@/data/industries";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const staticRoutes = ["", "/about", "/about/leadership", "/services", "/industries", "/products", "/careers", "/contact", "/privacy-policy", "/terms"];
  const dynamic = [
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
