import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import AddEntryButton from '@/components/journal/add-entry-btn';

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
        <h1 className='scroll-m-20 pb-2 font-semibold text-2xl tracking-tight first:mt-0 sm:text-3xl'>
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
                <div
                  className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                  key={entry._id}
                >
                  <h3 className='line-clamp-2 font-medium text-card-foreground'>
                    {entry.title}
                  </h3>
                  {entry.content && (
                    <p className='mt-2 line-clamp-3 text-muted-foreground text-sm'>
                      {entry.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className='mb-4 text-muted-foreground'>
                No journal entries yet
              </div>
              <p className='max-w-md text-muted-foreground text-sm'>
                Start your journaling journey by creating your first entry
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
