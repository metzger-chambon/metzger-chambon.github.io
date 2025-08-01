"use client";

import { Card, CardContent, CardHeader } from "@/app/components/card";
import { Button } from "@/app/components/button";
import { Checkbox } from "@/app/components/checkbox";
import { cn } from "@/app/components/utils";

interface FilterPanelProps {
  options: {
    biologicalApplications: string[];
    sequencingPlatforms: { value: string; label: string; indent: number }[];
    years: string[];
    authors: string[];
  };
  filters: {
    biologicalApplication: string[];
    sequencingPlatform: string[];
    year: string[];
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
  /**
   * Handle checkbox changes with parent-child linking logic.
   */
  const handleCheckboxChange = (
    categoryKey: keyof typeof filters,
    value: string,
    checked: boolean
  ) => {
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

  /**
   * Render checkbox list with optional hierarchy markers
   */
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

          return (
            <label
              key={value}
              className="flex items-center space-x-2 cursor-pointer"
              style={{ paddingLeft: `${indent * 16}px` }}
            >
              <Checkbox
                checked={filters[key].includes(value)}
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
    <aside className="w-64 shrink-0">
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
              "biologicalApplication",
              options.biologicalApplications
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
            {renderCheckboxList("year", options.years)}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Authors</h3>
            {renderCheckboxList("author", options.authors)}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
