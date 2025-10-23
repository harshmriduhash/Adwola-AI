"use client";

import {
  Calendar,
  CheckSquare,
  Copy,
  Download,
  Send,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GeneratedPost {
  id: string;
  platform: string;
  generated_text: string;
  status: string;
  schedule_time: string | null;
}

interface ContentBrief {
  id: string;
  topic: string;
  goal: string;
  status: string;
  created_at: string;
  brands: { brand_name: string; logo_url?: string };
  generated_posts: GeneratedPost[];
}

interface BulkOperationsProps {
  briefs: ContentBrief[];
  onBulkSchedule?: (postIds: string[], scheduleTime: Date) => void;
  onBulkDelete?: (postIds: string[]) => void;
  onBulkDuplicate?: (postIds: string[]) => void;
  onBulkPublish?: (postIds: string[]) => void;
}

export function BulkOperations({
  briefs,
  onBulkSchedule,
  onBulkDelete,
  onBulkDuplicate,
  onBulkPublish,
}: BulkOperationsProps) {
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [bulkScheduleDate, setBulkScheduleDate] = useState("");
  const [bulkScheduleTime, setBulkScheduleTime] = useState("");

  // Get all posts from all briefs
  const allPosts = briefs.flatMap((brief) =>
    brief.generated_posts.map((post) => ({
      ...post,
      brief,
      briefTopic: brief.topic,
      brandName: brief.brands?.brand_name,
    }))
  );

  const handleSelectPost = (postId: string, checked: boolean) => {
    const newSelected = new Set(selectedPosts);
    if (checked) {
      newSelected.add(postId);
    } else {
      newSelected.delete(postId);
    }
    setSelectedPosts(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(new Set(allPosts.map((post) => post.id)));
    } else {
      setSelectedPosts(new Set());
    }
  };

  const handleBulkSchedule = () => {
    if (bulkScheduleDate && bulkScheduleTime) {
      const scheduleDateTime = new Date(
        `${bulkScheduleDate}T${bulkScheduleTime}`
      );
      onBulkSchedule?.(Array.from(selectedPosts), scheduleDateTime);
      setSelectedPosts(new Set());
      setScheduleDialogOpen(false);
      setBulkScheduleDate("");
      setBulkScheduleTime("");
    }
  };

  const handleBulkAction = (action: "delete" | "duplicate" | "publish") => {
    const postIds = Array.from(selectedPosts);

    switch (action) {
      case "delete":
        onBulkDelete?.(postIds);
        break;
      case "duplicate":
        onBulkDuplicate?.(postIds);
        break;
      case "publish":
        onBulkPublish?.(postIds);
        break;
    }

    setSelectedPosts(new Set());
  };

  const isAllSelected =
    allPosts.length > 0 && selectedPosts.size === allPosts.length;
  const isPartiallySelected =
    selectedPosts.size > 0 && selectedPosts.size < allPosts.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Bulk Operations
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                className={
                  isPartiallySelected
                    ? "data-[state=checked]:bg-orange-500"
                    : ""
                }
              />
              <Label htmlFor="select-all" className="text-sm">
                Select All ({selectedPosts.size}/{allPosts.length})
              </Label>
            </div>
          </div>
        </div>

        {selectedPosts.size > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Dialog
              open={scheduleDialogOpen}
              onOpenChange={setScheduleDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule ({selectedPosts.size})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bulk Schedule Posts</DialogTitle>
                  <DialogDescription>
                    Schedule {selectedPosts.size} selected posts for a specific
                    date and time.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulk-date">Date</Label>
                      <Input
                        id="bulk-date"
                        type="date"
                        value={bulkScheduleDate}
                        onChange={(e) => setBulkScheduleDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bulk-time">Time</Label>
                      <Input
                        id="bulk-time"
                        type="time"
                        value={bulkScheduleTime}
                        onChange={(e) => setBulkScheduleTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setScheduleDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBulkSchedule}
                    disabled={!bulkScheduleDate || !bulkScheduleTime}
                  >
                    Schedule Posts
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("duplicate")}
            >
              <Copy className="h-4 w-4 mr-1" />
              Duplicate
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("publish")}
            >
              <Send className="h-4 w-4 mr-1" />
              Publish Now
            </Button>

            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleBulkAction("delete")}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {allPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No posts available for bulk operations
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  selectedPosts.has(post.id)
                    ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <Checkbox
                  checked={selectedPosts.has(post.id)}
                  onCheckedChange={(checked) =>
                    handleSelectPost(post.id, checked as boolean)
                  }
                  className="mt-1"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {post.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {post.status}
                    </Badge>
                    {post.schedule_time && (
                      <span className="text-xs text-gray-500">
                        {new Date(post.schedule_time).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                    {post.generated_text}
                  </p>

                  <div className="text-xs text-gray-500">
                    {post.briefTopic} • {post.brandName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
