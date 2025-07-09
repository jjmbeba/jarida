import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from 'convex/_generated/api';
import type { Id } from 'convex/_generated/dataModel';
import JournalForm from '@/components/journal/journal-form';

export const Route = createFileRoute('/_protected/journal/$entry')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      convexQuery(api.entries.getEntry, { id: params.entry as Id<'entries'> })
    );
  },
});

function RouteComponent() {
  const { entry } = Route.useParams();
  const { data: entryData, isLoading: isLoadingEntry } = useQuery(
    convexQuery(api.entries.getEntry, { id: entry as Id<'entries'> })
  );

  if (isLoadingEntry) {
    return <div>Loading...</div>;
  }

  if (!entryData) {
    return <div>Entry not found</div>;
  }

  return (
    <div>
      <h1 className="page-title">{entryData?.title}</h1>
      <JournalForm entry={entryData} mode="view" type="update" />
    </div>
  );
}
