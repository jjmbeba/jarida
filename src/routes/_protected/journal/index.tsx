import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import { PlusIcon } from 'lucide-react';
import DeleteEntryButton from '@/components/journal/delete-entry-btn';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/_protected/journal/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      convexQuery(api.entries.listEntries, {})
    );
  },
});

function RouteComponent() {
  const { data: entries, isLoading } = useQuery(
    convexQuery(api.entries.listEntries, {})
  );
  return (
    <div className="mt-4 sm:mt-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="page-title">Journal</h1>
        <Link
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          to="/journal/create-entry"
        >
          <PlusIcon className="h-4 w-4" />
          Create Entry
        </Link>
      </div>

      {isLoading ? (
        <div className="mt-6 flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading entries...</div>
        </div>
      ) : (
        <div className="mt-6">
          {entries && entries.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <Card
                  className="transition-shadow hover:shadow-md"
                  key={entry._id}
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link
                          className={cn(
                            buttonVariants({ variant: 'link' }),
                            'pl-0'
                          )}
                          params={{ entry: entry._id }}
                          to="/journal/$entry"
                        >
                          {entry.title}
                        </Link>
                        <Badge variant="outline">tag</Badge>
                      </div>
                      <DeleteEntryButton entryId={entry._id} />
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 text-muted-foreground">
                No journal entries yet
              </div>
              <p className="max-w-md text-muted-foreground text-sm">
                Start your journaling journey by creating your first entry
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}