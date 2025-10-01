// app/lib/fetch-studies.ts
import type { Study } from "@shared/schema";

export const fetchAllStudies = async (): Promise<Study[]> => {
  const manifestRes = await fetch("/data/studies/index.json");
  if (!manifestRes.ok) throw new Error("Failed to load manifest");

  const fileNames: string[] = await manifestRes.json();

  const studyPromises = fileNames.map((file) =>
    fetch(`/data/studies/${file}`).then((res) => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.json();
    })
  );

  return Promise.all(studyPromises);
};
