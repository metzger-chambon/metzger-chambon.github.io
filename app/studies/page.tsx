//app/studies/page.tsx
"use client";

import { useState } from "react";
import StudyCard from "./study-card";
import FilterPanel from "./filter-panel";
import { Button } from "@/app/components/button";
import type { Study } from "@shared/schema";
import { fetchAllStudies } from "@/app/lib/fetch-studies";
import { useQuery } from "@tanstack/react-query";

export default function Studies() {

  const [filters, setFilters] = useState({
    biologicalApplication: "",
    sequencingPlatform: "",
    year: "",
    author: "",
  });

  const {
    data: allStudies = [],
    isLoading,
    error,
  } = useQuery<Study[]>({
    queryKey: ['studies'],
    queryFn: fetchAllStudies,
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      biologicalApplication: "",
      sequencingPlatform: "",
      year: "",
      author: "",
    });
  };

  if (error) {
    return (
      <div className="text-center text-red-600 py-20">
        <p>Error loading studies: {(error as Error).message}</p>
      </div>
    );
  }
  
  const unique = <T>(arr: T[]) => [...new Set(arr)];
  
  function buildPlatformOptions(studies: Study[]) {
    const hierarchy: Record<string, Set<string>> = {};

    for (const study of studies) {
      const platform = study.categories?.sequencingPlatform;
      if (!platform?.name) continue;

      const name = platform.name;
      const sub = platform.sub;

      if (!hierarchy[name]) {
        hierarchy[name] = new Set();
      }

      if (sub) {
        hierarchy[name].add(sub);
      }
    }

    // Now flatten hierarchy into SelectItems
    const options: {
      value: string;
      label: string;
      indent: number;
    }[] = [];

    for (const [name, subSet] of Object.entries(hierarchy)) {
      if (subSet.size === 0) {
        options.push({
          value: name,
          label: name,
          indent: 0,
        });
      } else {
        // Parent label (non-selectable if you want, but for now we’ll make it selectable)
        options.push({
          value: name,
          label: name,
          indent: 0,
        });

        for (const sub of Array.from(subSet)) {
          options.push({
            value: `${name}/${sub}`,
            label: sub,
            indent: 1,
          });
        }
      }
    }

    return options;
  };

    
  const options = {
    biologicalApplications: unique(
      allStudies.map(s => s.categories?.biologicalApplication).filter(Boolean)
    ),
    sequencingPlatforms: buildPlatformOptions(allStudies),
    years: unique(allStudies.map(s => String(s.year))).sort((a, b) => Number(b) - Number(a)),
    authors: unique(allStudies.flatMap(s => s.authors)).filter(Boolean),
  };

  
  const studies =
    allStudies.filter((study) => {
      if (
        filters.biologicalApplication &&
        !study.categories?.biologicalApplication
          ?.toLowerCase()
          .includes(filters.biologicalApplication.toLowerCase())
      ) {
        return false;
      }

      if (filters.sequencingPlatform) {
        const [filterName, filterSub] = filters.sequencingPlatform.split("/");

        const platform = study.categories?.sequencingPlatform;
        if (!platform?.name || platform.name !== filterName) return false;
        if (filterSub && platform.sub !== filterSub) return false;
      }


      if (filters.year && study.year !== parseInt(filters.year)) {
        return false;
      }

      if (filters.author) {
        const hasAuthor = Array.isArray(study.authors)
          ? study.authors.some((author) =>
              author.toLowerCase().includes(filters.author.toLowerCase())
            )
          : study.authors.toLowerCase().includes(filters.author.toLowerCase());
        if (!hasAuthor) return false;
      }

      return true;
    }) || [];

  return (
    <section className="py-16 bg-(--background)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-(--foreground) mb-4">
            Studies & Datasets
          </h1>
          <p className="text-lg text-(--foreground) max-w-2xl mx-auto">
            Explore our published research and available datasets from
            computational biology studies
          </p>
        </div>

        {/* Filters */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalCount={studies?.length || 0}
          isLoading={isLoading}
          options={options}
        />

        {/* Studies Grid */}
        {studies.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {studies.map((study) => (
              <StudyCard key={study.id} study={study} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-(--foreground) mb-2">
              No studies found
            </h3>
            <p className="text-(--foreground) mb-4">
              Try adjusting your filters or add more studies to the data list.
            </p>
            {Object.values(filters).some(Boolean) && (
              <Button variant="outline" onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            )} 
          </div>
        )}
      </div>
    </section>
  );
}
