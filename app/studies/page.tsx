"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Study } from "@shared/schema";
import { fetchAllStudies } from "@/app/lib/fetch-studies";
import StudyCard from "./study-card";
import FilterPanel from "./filter-panel";
import { Button } from "@/app/components/button";

export default function StudiesPage() {
  const [filters, setFilters] = useState({
    biologicalApplication: [] as string[],
    sequencingPlatform: [] as string[],
    yearRange: [2000, new Date().getFullYear()] as [number, number], // Changed here
    author: [] as string[],
  });

  const {
    data: allStudies = [],
    isLoading,
    error,
  } = useQuery<Study[]>({
    queryKey: ["studies"],
    queryFn: fetchAllStudies,
  });

  const unique = <T,>(arr: T[]) => [...new Set(arr)];

  const buildPlatformOptions = (studies: Study[]) => {
    const hierarchy: Record<string, Set<string>> = {};

    for (const study of studies) {
      const platform = study.categories?.sequencingPlatform;
      if (!platform?.name) continue;

      const name = platform.name;
      const sub = platform.sub;

      if (!hierarchy[name]) hierarchy[name] = new Set();
      if (sub) hierarchy[name].add(sub);
    }

    const options: { value: string; label: string; indent: number }[] = [];
    for (const [name, subSet] of Object.entries(hierarchy)) {
      options.push({ value: name, label: name, indent: 0 });
      for (const sub of Array.from(subSet)) {
        options.push({ value: `${name}/${sub}`, label: sub, indent: 1 });
      }
    }

    return options;
  };

  const options = useMemo(() => {
    return {
      biologicalApplications: unique(
        allStudies.flatMap((s) => s.categories?.biologicalApplication || [])
      ),
      sequencingPlatforms: buildPlatformOptions(allStudies),
      years:  unique(allStudies.map((s) => s.year)).sort((a, b) => a - b),
      authors: unique(allStudies.flatMap((s) => s.authors)).filter(Boolean),
    };
  }, [allStudies]);

  // Set initial yearRange once options.years is ready
  useEffect(() => {
    if (options.years.length > 0) {
      setFilters((prev) => ({
        ...prev,
        yearRange: [options.years[0], options.years[options.years.length - 1]],
      }));
    }
  }, [options.years]);

  const handleToggle = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const handleClearFilters = () =>
    setFilters({
      biologicalApplication: [],
      sequencingPlatform: [],
      yearRange: [options.years[0], options.years[options.years.length - 1]], // Reset to full range
      author: [],
    });

  const handleFilterChange = (newFilters: typeof filters) =>
    setFilters(newFilters);

  const studies = useMemo(
    () =>
      allStudies.filter((study) => {
        // Biological Application
        if (
          filters.biologicalApplication.length > 0 &&
          !filters.biologicalApplication.some((filter) =>
            study.categories?.biologicalApplication?.includes(filter)
          )
        )
          return false;

        // Sequencing Platform
        if (filters.sequencingPlatform.length > 0) {
          const platform = study.categories?.sequencingPlatform;
          if (!platform?.name) return false;

          const fullValue = platform.sub
            ? `${platform.name}/${platform.sub}`
            : platform.name;
          const matches = filters.sequencingPlatform.some((selected) => {
            if (!selected.includes("/"))
              return (
                fullValue === selected || fullValue.startsWith(`${selected}/`)
              );
            return fullValue === selected;
          });
          if (!matches) return false;
        }

        // Year range filter
        if (
          filters.yearRange &&
          (study.year < filters.yearRange[0] || study.year > filters.yearRange[1])
        )
          return false;

        // Author
        if (filters.author.length > 0) {
          const studyAuthors = Array.isArray(study.authors)
            ? study.authors
            : [study.authors];
          if (!studyAuthors.some((a) => filters.author.includes(a))) return false;
        }

        return true;
      }),
    [allStudies, filters]
  );

  if (error)
    return (
      <div className="text-center text-red-600 py-20">
        <p>Error loading studies: {(error as Error).message}</p>
      </div>
    );

  return (
    <section className="py-16 bg-(--background)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-(--foreground) mb-4">
            Studies & Datasets
          </h1>
          <p className="text-lg text-(--foreground) max-w-4xl mx-auto">
            Explore our published research and available datasets
          </p>
        </div>

        <div className="flex flex-col md:flex-row-reverse md:flex-row gap-8">
          {/* Filter Panel */}
          <div className="md:w-64 w-full md:self-start flex justify-center">
            <FilterPanel
              options={options}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              totalCount={studies.length}
              isLoading={isLoading}
            />
          </div>

          {/* Studies List */}
          <div className="flex-1 overflow-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {studies.length > 0 ? (
                studies.map((study) => (
                  <StudyCard key={study.id} study={study} />
                ))
              ) : (
                <div className="text-center py-12 md:col-span-2">
                  <h3 className="text-lg font-semibold text-(--foreground) mb-2">
                    No studies found
                  </h3>
                  <p className="text-(--foreground) mb-4">
                    Try adjusting your filters or add more studies to the data
                    list.
                  </p>
                  {Object.values(filters).some((arr) => arr.length > 0) && (
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
