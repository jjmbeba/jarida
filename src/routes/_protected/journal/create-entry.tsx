import { createFileRoute } from '@tanstack/react-router';
import JournalForm from '@/components/journal/journal-form';

export const Route = createFileRoute('/_protected/journal/create-entry')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="page-title">Create Entry</h1>
      <JournalForm mode="create" type="create" />
    </div>
  );
}
