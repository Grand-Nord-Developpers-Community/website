// app/preferences/notification-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/actions/notification.action";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useUserSettings } from "../(common)/user-setting-context";
import { NotificationPreferences } from "@/lib/db/schema";
import { useNotificationPermission } from "@/hooks/useNotification";
import { subscribeUser } from "@/actions/webpush.action";
import { NotificationBanner } from "@/components/bannerNotification";

const notificationFormSchema = z.object({
  // Email
  emailBlogUpdates: z.boolean().default(true),
  emailForumsQuestion: z.boolean().default(true),
  emailNewsHebdomadaire: z.boolean().default(true),
  emailLeaderboardHebdomadaire: z.boolean().default(true),

  // Notifications
  notifBlogUpdates: z.boolean().default(true),
  notifForumsQuestion: z.boolean().default(true),
  notifNewsHebdomadaire: z.boolean().default(true),
  notifLeaderboardHebdomadaire: z.boolean().default(true),
  notifUpvote: z.boolean().default(true),
  notifComment: z.boolean().default(true),
  notifBlogLike: z.boolean().default(true),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
export default function PreferencesPage({
  preferences,
}: {
  preferences: NotificationPreferences;
}) {
  const router = useRouter();
  const { user } = useUserSettings();
  const [submit, submitting] = useState(false);
  const { permission, handlePermission, isServiceWorkerReady } =
    useNotificationPermission();
  const [allowedNotifications, setIsAllowedNotifications] = useState(
    permission === "granted" ? true : false
  );
  const [showBanner, setShowBanner] = useState(
    permission === "denied" ? true : false
  );
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailBlogUpdates: preferences?.emailBlogUpdates,
      emailForumsQuestion: preferences?.emailForumsQuestion,
      emailNewsHebdomadaire: preferences?.emailNewsHebdomadaire,
      emailLeaderboardHebdomadaire: preferences?.emailLeaderboardHebdomadaire,
      notifBlogUpdates: preferences?.notifBlogUpdates,
      notifForumsQuestion: preferences?.notifForumsQuestion,
      notifNewsHebdomadaire: preferences?.notifNewsHebdomadaire,
      notifLeaderboardHebdomadaire: preferences?.notifLeaderboardHebdomadaire,
      notifUpvote: preferences?.notifUpvote,
      notifComment: preferences?.notifComment,
      notifBlogLike: preferences?.notifBlogLike,
    },
  });
  useEffect(() => {
    const subscribeToPush = async () => {
      if (isServiceWorkerReady) {
        toast.promise(
          async () => {
            const registration = await navigator.serviceWorker.ready;
            const sub = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: VAPID_PUBLIC_KEY,
            });
            localStorage.setItem(
              "pendingPushSubscription",
              JSON.stringify(sub)
            );

            const res = await subscribeUser(sub.toJSON());
            console.log("Subscription successful:", res.success);
          },
          {
            loading: "activation en cours !",
            error: (r) => "Une erreur est survenue lors de l'activation.",
            success: "Vos notification ont été activé avec sucess.",
          }
        );
      }
    };

    subscribeToPush();
  }, [isServiceWorkerReady]);
  useEffect(() => {
    if (permission === "granted") {
      setIsAllowedNotifications(true);
    }
    if (permission === "denied") {
      setShowBanner(true);
    }
  }, [permission]);
  // État de chargement

  // Si pas de préférences après le chargement
  if (!preferences) {
    return null; // Le redirect est déjà géré dans useEffect
  }

  async function onSubmit(data: NotificationFormValues) {
    submitting(true);
    toast
      .promise(
        async () => {
          await updateNotificationPreferences(data, user?.id!);
        },
        {
          loading: "modification en cours !",
          error: (r) => "Une erreur est survenue lors de la mise à jour.",
          success: "Vos préférences de notification ont été mises à jour.",
        }
      )
      .finally(() => submitting(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
        {/* Section Notifications In-App */}
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Notifications de l&apos;application
              </h3>
              <p className="text-sm text-muted-foreground">
                Gérez vos notifications dans l&apos;application
              </p>
            </div>
            <Switch
              checked={allowedNotifications}
              onCheckedChange={async (v) => {
                if (permission === "denied") {
                  toast.error(
                    "Notification pas permis , reactivez dans vos paramètre"
                  );
                  return;
                }
                await handlePermission();
              }}
              disabled={allowedNotifications}
            />
          </div>

          <Separator />

          {allowedNotifications ? (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="notifBlogUpdates"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Mises à jour du blog
                      </FormLabel>
                      <FormDescription>
                        Notifications dans l&apos;application pour les nouveaux
                        articles
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifForumsQuestion"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Questions du forum
                      </FormLabel>
                      <FormDescription>
                        Notifications pour les nouvelles questions
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifNewsHebdomadaire"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Newsletter hebdomadaire
                      </FormLabel>
                      <FormDescription>
                        Notifications pour le résumé hebdomadaire
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifLeaderboardHebdomadaire"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Classement hebdomadaire
                      </FormLabel>
                      <FormDescription>
                        Notifications pour le classement
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifUpvote"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Votes positifs
                      </FormLabel>
                      <FormDescription>
                        Recevoir une notification quand quelqu&apos;un vote pour
                        votre contenu
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifComment"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Commentaires</FormLabel>
                      <FormDescription>
                        Recevoir une notification pour les nouveaux commentaires
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notifBlogLike"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        J&apos;aime sur les blogs
                      </FormLabel>
                      <FormDescription>
                        Recevoir une notification quand quelqu&apos;un aime
                        votre article
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!allowedNotifications}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <>
              <p>activer vos notifications d&apos;abord</p>
            </>
          )}
        </div>
        {/* Section Email */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Notifications par Email</h3>
            <p className="text-sm text-muted-foreground">
              Choisissez les notifications que vous souhaitez recevoir par email
            </p>
          </div>
          <Separator />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="emailBlogUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Mises à jour du blog
                    </FormLabel>
                    <FormDescription>
                      Recevoir les notifications des nouveaux articles de blog
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailForumsQuestion"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Questions du forum
                    </FormLabel>
                    <FormDescription>
                      Recevoir les notifications des nouvelles questions du
                      forum
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailNewsHebdomadaire"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Newsletter hebdomadaire
                    </FormLabel>
                    <FormDescription>
                      Recevoir un résumé hebdomadaire des actualités
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailLeaderboardHebdomadaire"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Classement hebdomadaire
                    </FormLabel>
                    <FormDescription>
                      Recevoir le classement hebdomadaire des contributeurs
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={submit}>
          Enregistrer les préférences
        </Button>
      </form>
      <NotificationBanner show={showBanner} />
    </Form>
  );
}
