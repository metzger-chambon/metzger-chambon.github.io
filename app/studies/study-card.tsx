import { Card, CardContent } from "@/app/components/card";
import { Badge } from "@/app/components/badge";
import { ExternalLink } from "lucide-react";
import type { Study, Dataset } from "@shared/schema";

interface StudyCardProps {
  study: Study;
}

export default function StudyCard({ study }: StudyCardProps) {
  const getImageUrl = (study: Study) => {
    if (study.imageUrl) return study.imageUrl;

    // Default images based on biological application

    /* Modify to image code the categories
    const defaultImages = {
      "Cancer Genomics": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200",
      "Neuroscience": "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200",
      "Developmental Biology": "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200",
      "Immunology": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200"
    };
    */

    return (
      defaultImages[
        study.biologicalApplication as keyof typeof defaultImages
      ] ||
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200"
    );
  };

  const getBiologicalApplicationColor = (app: string) => {
    const colors: { [key: string]: string } = {
      /* Modify to color code the categories
      "Cancer Genomics": "bg-(--foreground) text-(--background)",
      "Developmental Biology": "bg-(--foreground) text-(--background)",
      Immunology: "bg-(--foreground) text-(--background)",
      Neuroscience: "bg-(--foreground) text-(--background)",
      */
    };
    return colors[app] || "bg-(--foreground) text-(--background)";
  };

  const getPlatformNameColor = (platform: string) => {
    /* Modify to color code the categories
    if (platform.includes("scRNA-seq")) return "bg-blue-100 text-blue-800";
    if (platform.includes("Bulk RNA-seq")) return "bg-orange-100 text-orange-800";
    if (platform.includes("ATAC-seq")) return "bg-green-100 text-green-800";
    if (platform.includes("ChIP-seq")) return "bg-yellow-100 text-yellow-800";
    */
    return "bg-(--foreground) text-(--background)";
  };

  const getPlatformSubColor = (platform: string) => {
    /* Modify to color code the categories
    if (platform.includes("scRNA-seq")) return "bg-blue-100 text-blue-800";
    if (platform.includes("Bulk RNA-seq")) return "bg-orange-100 text-orange-800";
    if (platform.includes("ATAC-seq")) return "bg-green-100 text-green-800";
    if (platform.includes("ChIP-seq")) return "bg-yellow-100 text-yellow-800";
    */
    return "bg-(--foreground) text-(--background)";
  };

  const handleAuthorClick = (authorName: string) => {
    // Navigate to members page - could be enhanced to scroll to specific member
    window.location.href = "/members";
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={getImageUrl(study)}
        alt={study.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Badge
            className={getBiologicalApplicationColor(
              study.categories.biologicalApplication
            )}
          >
            {study.categories.biologicalApplication}
          </Badge>
          <Badge
            className={getPlatformNameColor(
              study.categories.sequencingPlatform.name
            )}
          >
            {study.categories.sequencingPlatform.name}
          </Badge>
          {study.categories.sequencingPlatform.sub && (
            <Badge
              className={getPlatformSubColor(
                study.categories.sequencingPlatform.sub
              )}
            >
              {study.categories.sequencingPlatform.sub}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
        <p className="text-(--foreground) mb-4 line-clamp-3">
          {study.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-(--forground) mb-2">
            Available Datasets:
          </h4>
          <div className="space-y-1">
            {Array.isArray(study.datasets) &&
              study.datasets.map((dataset: Dataset, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-(--foreground)">{dataset.name}</span>
                  <a
                    href={dataset.downloadUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
              ))}
          </div>
        </div>

        <div className="flex text-sm items-center justify-between pt-4 border-t border-(--forground)">
          <div className="flex items-center space-x-3">
            {Array.isArray(study.authors) ? study.authors[0] : study.authors} | 
            {study.year}
          </div>
          <div className="flex items-center space-x-2">{study.doi}</div>
        </div>
      </CardContent>
    </Card>
  );
}
