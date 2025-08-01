import { Card, CardContent } from "@/app/components/card";
import { Button } from "@/app/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/select";

interface FilterPanelProps {
  filters: {
    biologicalApplication: string;
    sequencingPlatform: string;
    year: string;
    author: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  totalCount: number;
  isLoading: boolean;
  options: {
    biologicalApplications: string[];
    sequencingPlatforms: { value: string; label: string; indent: number }[];
    years: string[];
    authors: string[];
  };
}

export default function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  totalCount,
  isLoading,
  options,
}: FilterPanelProps) {
  const handleFilterUpdate = (key: string, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value === "all" ? "" : value,
    });
  };

  /*
  const biologicalApplications = [
    "Cancer Genomics",
    "Developmental Biology",
    "Immunology",
    "Neuroscience",
  ];

  const sequencingPlatform = [
    { value: "scRNA-seq", label: "scRNA-seq", indent: 0 },
    { value: "scRNA-seq/10x-v3", label: "10x Genomics v3", indent: 1 },
    { value: "scRNA-seq/10x-v2", label: "10x Genomics v2", indent: 1 },
    { value: "scRNA-seq/smart-seq2", label: "Smart-seq2", indent: 1 },
    { value: "Bulk RNA-seq", label: "Bulk RNA-seq", indent: 0 },
    { value: "ATAC-seq", label: "ATAC-seq", indent: 0 },
    { value: "ChIP-seq", label: "ChIP-seq", indent: 0 },
  ];

  const years = ["2024", "2023", "2022", "2021", "2020"];

  const authors = [
    "Dr. Sarah Chen",
    "Dr. Maria Rodriguez",
    "Dr. Emily Watson",
    "James Kim",
  ];
*/
  const filteredCount = totalCount;

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Biological Application Filter */}
          <div>
            <label className="block text-sm font-medium text-(--forground) mb-2">
              Biological Application
            </label>
            <Select
              value={filters.biologicalApplication}
              onValueChange={(value) =>
                handleFilterUpdate("biologicalApplication", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Applications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                {options.biologicalApplications.map((app) => (
                  <SelectItem key={app} value={app}>
                    {app}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sequencing Platform Filter */}
          <div>
            <label className="block text-sm font-medium text-(--forground) mb-2">
              Sequencing Platform
            </label>
            <Select
              value={filters.sequencingPlatform}
              onValueChange={(value) =>
                handleFilterUpdate("sequencingPlatform", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {options.sequencingPlatforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    <span style={{ paddingLeft: `${platform.indent * 16}px` }}>
                      {platform.indent > 0 ? "└─ " : ""}
                      {platform.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-(--forground) mb-2">
              Year
            </label>
            <Select
              value={filters.year}
              onValueChange={(value) => handleFilterUpdate("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {options.years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author Filter */}
          <div>
            <label className="block text-sm font-medium text-(--forground) mb-2">
              Author
            </label>
            <Select
              value={filters.author}
              onValueChange={(value) => handleFilterUpdate("author", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Authors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                {options.authors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-(--forground)">
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Showing <span className="font-medium">{filteredCount}</span>{" "}
                studies
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={onClearFilters}
              variant="outline"
              disabled={!Object.values(filters).some(Boolean)}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
