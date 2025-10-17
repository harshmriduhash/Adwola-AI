"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Copy,
  Edit,
  Eye,
  Grid,
  Heart,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Share,
  Star,
  Trash2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DataTable, RowActions } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedSearch } from "@/hooks/use-debounce";
import { useBreakpoint } from "@/hooks/use-responsive";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  platform: string[];
  content: string;
  variables: string[];
  performance: {
    usage_count: number;
    average_engagement: number;
    conversion_rate: number;
  };
  ratings: {
    average: number;
    count: number;
  };
  author: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  created_at: string;
  updated_at: string;
  tags: string[];
  is_favorite: boolean;
  is_premium: boolean;
  price?: number;
}

interface TemplateManagerProps {
  templates: Template[];
  onTemplateSelect?: (template: Template) => void;
  onTemplateEdit?: (template: Template) => void;
  onTemplateDelete?: (template: Template) => void;
  onTemplateFavorite?: (template: Template) => void;
  onTemplateUse?: (template: Template) => void;
  onCreateNew?: () => void;
  loading?: boolean;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Product Launch Announcement",
    description:
      "Engaging template for announcing new product launches across social platforms",
    category: "Product Marketing",
    platform: ["LinkedIn", "Twitter", "Facebook"],
    content:
      "🚀 Excited to announce {{product_name}}! {{description}} Available now at {{link}}",
    variables: ["product_name", "description", "link"],
    performance: {
      usage_count: 245,
      average_engagement: 8.7,
      conversion_rate: 4.2,
    },
    ratings: {
      average: 4.8,
      count: 32,
    },
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
      verified: true,
    },
    created_at: "2024-01-15",
    updated_at: "2024-03-10",
    tags: ["product", "launch", "announcement"],
    is_favorite: true,
    is_premium: false,
  },
  {
    id: "2",
    title: "Thought Leadership Post",
    description:
      "Professional template for sharing industry insights and establishing thought leadership",
    category: "Thought Leadership",
    platform: ["LinkedIn"],
    content:
      "{{insight_hook}} Here's what I've learned about {{topic}}: {{main_points}} What's your experience with {{topic}}?",
    variables: ["insight_hook", "topic", "main_points"],
    performance: {
      usage_count: 156,
      average_engagement: 12.3,
      conversion_rate: 2.8,
    },
    ratings: {
      average: 4.6,
      count: 28,
    },
    author: {
      name: "Marcus Rodriguez",
      verified: true,
    },
    created_at: "2024-02-01",
    updated_at: "2024-03-15",
    tags: ["thought leadership", "insights", "professional"],
    is_favorite: false,
    is_premium: true,
    price: 9.99,
  },
];

const categories = [
  "All Categories",
  "Product Marketing",
  "Thought Leadership",
  "Customer Success",
  "Company Updates",
  "Educational Content",
  "Promotional",
  "Events",
];

const platforms = [
  "All Platforms",
  "LinkedIn",
  "Twitter",
  "Facebook",
  "Instagram",
  "TikTok",
];

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "recent", label: "Recently Added" },
  { value: "performance", label: "Best Performance" },
  { value: "alphabetical", label: "A-Z" },
];

const TemplateCard = ({
  template,
  onUse,
  onEdit,
  onDelete,
  onFavorite,
  onView,
}: {
  template: Template;
  onUse?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onFavorite?: () => void;
  onView?: () => void;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg leading-tight truncate">
                  {template.title}
                </h3>
                {template.is_premium && (
                  <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  >
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {template.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {template.category}
                </Badge>
                {template.platform.slice(0, 2).map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-xs">
                    {platform}
                  </Badge>
                ))}
                {template.platform.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{template.platform.length - 2}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onFavorite}
                className="p-1.5"
              >
                <Heart
                  size={16}
                  className={cn(
                    "transition-colors",
                    template.is_favorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  )}
                />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1.5">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onView}>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
            <p className="text-sm font-mono text-gray-600 dark:text-gray-300 line-clamp-3">
              {template.content}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-blue-600 dark:text-blue-400">
                {template.performance.usage_count}
              </div>
              <div className="text-muted-foreground">Uses</div>
            </div>
            <div>
              <div className="font-semibold text-green-600 dark:text-green-400">
                {template.performance.average_engagement}%
              </div>
              <div className="text-muted-foreground">Engagement</div>
            </div>
            <div className="flex items-center justify-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-semibold">{template.ratings.average}</span>
              <span className="text-muted-foreground ml-1">
                ({template.ratings.count})
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={template.author.avatar} />
                <AvatarFallback className="text-xs">
                  {template.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                {template.author.name}
              </span>
              {template.author.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>

            <Button
              onClick={onUse}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Use Template
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export function EnhancedTemplateManager({
  templates = mockTemplates,
  onTemplateSelect,
  onTemplateEdit,
  onTemplateDelete,
  onTemplateFavorite,
  onTemplateUse,
  onCreateNew,
  loading = false,
}: TemplateManagerProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { isMobile } = useBreakpoint();

  const {
    searchTerm,
    setSearchTerm,
    results: searchResults,
    loading: searching,
  } = useDebouncedSearch(async (term: string) => {
    // Simulate API search
    return templates.filter(
      (template) =>
        template.title.toLowerCase().includes(term.toLowerCase()) ||
        template.description.toLowerCase().includes(term.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(term.toLowerCase())
        )
    );
  }, 300);

  const filteredTemplates = useMemo(() => {
    let filtered = searchTerm ? searchResults || [] : templates;

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (selectedPlatform !== "All Platforms") {
      filtered = filtered.filter((t) => t.platform.includes(selectedPlatform));
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter((t) => t.is_favorite);
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.performance.usage_count - a.performance.usage_count;
        case "rating":
          return b.ratings.average - a.ratings.average;
        case "recent":
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        case "performance":
          return (
            b.performance.average_engagement - a.performance.average_engagement
          );
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    templates,
    searchResults,
    searchTerm,
    selectedCategory,
    selectedPlatform,
    showFavoritesOnly,
    sortBy,
  ]);

  const handleTemplateAction = useCallback(
    (action: string, template: Template) => {
      switch (action) {
        case "use":
          onTemplateUse?.(template);
          break;
        case "edit":
          onTemplateEdit?.(template);
          break;
        case "delete":
          onTemplateDelete?.(template);
          break;
        case "favorite":
          onTemplateFavorite?.(template);
          break;
        case "view":
          onTemplateSelect?.(template);
          break;
      }
    },
    [
      onTemplateUse,
      onTemplateEdit,
      onTemplateDelete,
      onTemplateFavorite,
      onTemplateSelect,
    ]
  );

  const tableColumns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Template",
        cell: ({ row }: { row: { original: Template } }) => {
          const template = row.original;
          return (
            <div className="flex items-center gap-3">
              <div>
                <div className="font-semibold">{template.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-1">
                  {template.description}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "platform",
        header: "Platforms",
        cell: ({ row }: { row: { getValue: (key: string) => string[] } }) => {
          const platforms = row.getValue("platform") as string[];
          return (
            <div className="flex gap-1">
              {platforms.slice(0, 2).map((platform: string) => (
                <Badge key={platform} variant="secondary" className="text-xs">
                  {platform}
                </Badge>
              ))}
              {platforms.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{platforms.length - 2}
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "performance.usage_count",
        header: "Usage",
        cell: ({ row }: { row: { getValue: (key: string) => number } }) => {
          const count = row.getValue("performance.usage_count") as number;
          return <span className="font-semibold">{count}</span>;
        },
      },
      {
        accessorKey: "ratings.average",
        header: "Rating",
        cell: ({ row }: { row: { getValue: (key: string) => number } }) => {
          const rating = row.getValue("ratings.average") as number;
          return (
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating}</span>
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }: { row: { original: Template } }) => {
          const template = row.original;
          return (
            <RowActions
              row={template}
              onView={() => handleTemplateAction("view", template)}
              onEdit={() => handleTemplateAction("edit", template)}
              onDelete={() => handleTemplateAction("delete", template)}
              additionalActions={[
                {
                  label: "Use Template",
                  onClick: () => handleTemplateAction("use", template),
                  icon: <Plus className="w-4 h-4" />,
                },
                {
                  label: template.is_favorite
                    ? "Remove from Favorites"
                    : "Add to Favorites",
                  onClick: () => handleTemplateAction("favorite", template),
                  icon: <Heart className="w-4 h-4" />,
                },
              ]}
            />
          );
        },
      },
    ],
    [handleTemplateAction]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Template Library</h2>
          <p className="text-muted-foreground">
            Choose from {templates.length} professionally crafted templates
          </p>
        </div>

        <Button onClick={onCreateNew} className="sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {platforms.map((platform) => (
                <SelectItem key={platform} value={platform}>
                  {platform}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            size="sm"
          >
            <Heart className="w-4 h-4 mr-2" />
            Favorites
          </Button>

          {!isMobile && (
            <div className="flex border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {loading || searching ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg" />
              </div>
            ))}
          </motion.div>
        ) : viewMode === "grid" || isMobile ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUse={() => handleTemplateAction("use", template)}
                onEdit={() => handleTemplateAction("edit", template)}
                onDelete={() => handleTemplateAction("delete", template)}
                onFavorite={() => handleTemplateAction("favorite", template)}
                onView={() => handleTemplateAction("view", template)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DataTable
              columns={tableColumns}
              data={filteredTemplates}
              searchKey="title"
              searchPlaceholder="Search templates..."
              enablePagination
              enableSorting
              enableColumnVisibility
              enableExport
              onExport={(data) => {
                // Handle export
                console.log("Exporting templates:", data);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!loading && !searching && filteredTemplates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or create a new template
          </p>
          <Button onClick={onCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </motion.div>
      )}
    </div>
  );
}
