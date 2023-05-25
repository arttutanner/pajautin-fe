import { Workshop } from "../types/Workshop";

export function getUniqueKeywords(workshops: Workshop[]): string[] {
    let keywords: string[] = [];
    workshops.forEach((ws) => {
      if (!(ws.keywords == null))
        ws.keywords.split(",").forEach((kw) => {
          kw = kw.trim().toLowerCase();
          if (kw != null && kw.length > 0) keywords.push(kw);
        });
    });
  
    return [...new Set(keywords)].sort();
  }
  