import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import AddEntryButton from '@/components/journal/add-entry-btn';
import DeleteEntryButton from '@/components/journal/delete-entry-btn';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/_protected/journal')({
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
        <h1 className="scroll-m-20 pb-2 font-semibold text-2xl tracking-tight first:mt-0 sm:text-3xl">
          Journal
        </h1>
        <AddEntryButton />
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
                        {entry.title}
                        <Badge variant="outline">tag</Badge>
                      </div>
                      <DeleteEntryButton entryId={entry._id} />
                    </CardTitle>
                  </CardHeader>
                  {entry.content && (
                    <CardContent>
                      <p className="line-clamp-3 text-sm">{entry.content}</p>
                    </CardContent>
                  )}
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
