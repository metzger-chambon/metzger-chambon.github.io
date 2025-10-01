"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/app/components/card";
import { Slider } from "@/app/components/slider";
import { Button } from "@/app/components/button";
import { Checkbox } from "@/app/components/checkbox";

interface FilterPanelProps {
  options: {
    biologicalApplications: string[];
    sequencingPlatforms: { value: string; label: string; indent: number }[];
    years: number[];
    authors: string[];
  };
  filters: {
    biologicalApplication: string[]; // Already an array, so multiple categories can be selected
    sequencingPlatform: string[];
    yearRange: [number, number];
    author: string[];
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  totalCount: number;
  isLoading: boolean;
}

export default function FilterPanel({
  options,
  filters,
  onFilterChange,
  onClearFilters,
  totalCount,
  isLoading,
}: FilterPanelProps) {
  
  const handleYearRangeChange = (newRange: number[]) => {
    onFilterChange({
      ...filters,
      yearRange: [newRange[0], newRange[1]],
    });
  };

  const minYear = Math.min(...options.years);
  const maxYear = Math.max(...options.years);

  // Handle checkbox changes
  const handleCheckboxChange = (
    categoryKey: keyof typeof filters,
    value: string,
    checked: boolean
  ) => {
  // Do not handle yearRange here
  if (categoryKey === "yearRange") return;

  onFilterChange((prev: typeof filters) => {
    const newFilters = { ...prev };

      const categoryOptions =
        categoryKey === "sequencingPlatform" ? options.sequencingPlatforms : [];

      const children =
        categoryKey === "sequencingPlatform"
          ? categoryOptions.filter((opt) => opt.value.startsWith(`${value}/`))
          : [];

      const isParent = children.length > 0;

      if (isParent) {
        if (checked) {
          // Add parent and all children
          newFilters[categoryKey] = [
            ...new Set([
              ...newFilters[categoryKey],
              value,
              ...children.map((c) => c.value),
            ]),
          ];
        } else {
          // Remove parent and all children
          newFilters[categoryKey] = newFilters[categoryKey].filter(
            (v) => v !== value && !v.startsWith(`${value}/`)
          );
        }
      } else {
        // This is a child
        if (checked) {
          newFilters[categoryKey] = [
            ...new Set([...newFilters[categoryKey], value]),
          ];

          // Check if all siblings are selected → then check parent
          const parent = value.split("/")[0];
          const siblings = categoryOptions.filter((opt) =>
            opt.value.startsWith(`${parent}/`)
          );
          const allSelected = siblings.every((s) =>
            newFilters[categoryKey].includes(s.value)
          );
          if (allSelected) {
            newFilters[categoryKey] = [
              ...new Set([...newFilters[categoryKey], parent]),
            ];
          }
        } else {
          newFilters[categoryKey] = newFilters[categoryKey].filter(
            (v) => v !== value
          );
          const parent = value.split("/")[0];
          // Uncheck parent if any child is unchecked
          newFilters[categoryKey] = newFilters[categoryKey].filter(
            (v) => v !== parent
          );
        }
      }
      return newFilters;
    });
  };

  // Render checkbox list
  const renderCheckboxList = (
    key: keyof typeof filters,
    items: (string | { value: string; label: string; indent?: number })[]
  ) => {
    return (
      <div className="space-y-1">
        {items.map((item, index) => {
          const value = typeof item === "string" ? item : item.value;
          const label = typeof item === "string" ? item : item.label;
          const indent = typeof item === "string" ? 0 : item.indent ?? 0;

          const isStringArrayKey =
            key === "biologicalApplication" ||
            key === "sequencingPlatform" ||
            key === "author";
          return (
            <label
              key={value}
              className="flex items-center space-x-2 cursor-pointer"
              style={{ paddingLeft: `${indent * 16}px` }}
            >
              <Checkbox
                checked={isStringArrayKey ? (filters[key] as string[]).includes(value) : false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(key, value, Boolean(checked))
                }
              />
              <span className="text-(--foreground)">
                {label}
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <aside className="w-full shrink-0">
      <Card>
        <CardHeader className="border-b">
          <div className="space-y-2">
            <div className="text-sm">
              {isLoading ? "Loading..." : `Showing ${totalCount} studies`}
            </div>
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Biological Application</h3>
            {renderCheckboxList(
              "biologicalApplication", // The key remains the same
              options.biologicalApplications // Now passing the list of options
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Sequencing Platform</h3>
            {renderCheckboxList(
              "sequencingPlatform",
              options.sequencingPlatforms
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Year</h3>
            <div className="flex space-x-2 items-center">
              <Slider
                value={filters.yearRange}
                onValueChange={handleYearRangeChange}
                min={minYear}
                max={maxYear}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>{filters.yearRange[0]}</span>
              <span>{filters.yearRange[1]}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>Min: {minYear}</span>
              <span>Max: {maxYear}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Author</h3>
            {renderCheckboxList("author", options.authors)}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
