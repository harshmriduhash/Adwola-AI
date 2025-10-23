"use client";

import { Calendar, Clock, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

interface SchedulePostDialogProps {
  postId: string;
  platform: string;
  currentScheduleTime?: string | null;
  onClose: () => void;
  onScheduled: () => void;
}

export function SchedulePostDialog({
  postId,
  platform,
  currentScheduleTime,
  onClose,
  onScheduled,
}: SchedulePostDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleTime, setScheduleTime] = useState(
    currentScheduleTime
      ? new Date(currentScheduleTime).toISOString().slice(0, 16)
      : ""
  );

  const supabase = createClient();

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduleTime) {
      toast.error("Please select a date and time");
      return;
    }

    const scheduledDate = new Date(scheduleTime);
    const now = new Date();

    if (scheduledDate <= now) {
      toast.error("Please select a future date and time");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("schedule-post", {
        body: {
          post_id: postId,
          schedule_time: scheduledDate.toISOString(),
        },
      });

      if (error) throw error;

      toast.success(`Post scheduled for ${platform}!`);
      onScheduled();
      onClose();
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to schedule post";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!currentScheduleTime) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.rpc("cancel_scheduled_post", {
        post_id: postId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      });

      if (error) throw error;

      toast.success("Scheduled post cancelled");
      onScheduled();
      onClose();
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Failed to cancel scheduled post";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule {platform} Post
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {currentScheduleTime && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Currently scheduled for: {formatDateTime(currentScheduleTime)}
              </p>
            </div>
          )}

          <form onSubmit={handleSchedule} className="space-y-4">
            <div>
              <Label htmlFor="scheduleTime" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Schedule Date & Time
              </Label>
              <Input
                id="scheduleTime"
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                min={new Date(Date.now() + 5 * 60000)
                  .toISOString()
                  .slice(0, 16)} // 5 minutes from now
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Select when you want this post to be published
              </p>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    {currentScheduleTime ? "Reschedule" : "Schedule Post"}
                  </>
                )}
              </Button>

              {currentScheduleTime && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel Schedule
                </Button>
              )}
            </div>
          </form>

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Posts will be automatically published at the scheduled time</p>
            <p>• You can reschedule or cancel anytime before publishing</p>
            <p>• Make sure your content is approved before scheduling</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
