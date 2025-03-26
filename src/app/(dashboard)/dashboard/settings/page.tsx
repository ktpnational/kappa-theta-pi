'use client';

// TODO: NEXT_AUTH
import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useGlobalStore } from '@/providers';
import { SettingsSchema } from '@/schemas';
import { Role } from '@prisma/client';

import { settings } from '@/actions/settings';
import { FormError } from '@/components/form-error';
import { FormSucess } from '@/components/form-sucess';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

/**
 * SettingsPage Component
 *
 * A form component that allows users to modify their account settings including:
 * - Name
 * - Email (for non-OAuth users)
 * - Password (for non-OAuth users)
 * - Role selection
 * - Two-factor authentication toggle (for non-OAuth users)
 *
 * @component
 * @returns {React.JSX.Element} The rendered settings page component
 */
const SettingsPage = () => {
  const {
    error,
    success,
    isPending,
    setError,
    setSuccess,
    setIsPending,
    // @ts-expect-error TODO: Fix this
    reset: resetSettings,
  } = useGlobalStore((state) => state.settings);

  const [, startTransition] = useTransition();

  /** Hook to access and update session data */
  const { update } = useSession();

  /** Hook to access current user data */
  const user = useCurrentUser();

  /**
   * Form initialization using react-hook-form with zod schema validation
   * Prepopulates form fields with current user data where available
   */
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: (user?.role as Exclude<Role, 'GUEST'>) || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  /**
   * Handles form submission
   * Updates user settings and manages success/error states
   *
   * @param {z.infer<typeof SettingsSchema>} values - The form values to be submitted
   */
  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      setIsPending(true);
      settings(values)
        .then((data) => {
          setError(data.error);
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Something went wrong!'))
        .finally(() => setIsPending(false));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="john.doe@example.com"
                            type="email"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="123456"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="123456"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Role.SPONSOR}>Sponsor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
