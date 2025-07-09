import { useForm } from '@tanstack/react-form';
import type { Id } from 'convex/_generated/dataModel';
import { Loader2 } from 'lucide-react';
import { entryDefaultValue } from '@/constants';
import { useCreateEntry, useUpdateEntry } from '@/hooks/entries';
import { createEntrySchema } from '@/schemas/entries';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import JournalEditor from './journal-editor';

type createEntryProps = {
    type: 'create';
    mode: 'create';
};

type updateEntryProps = {
    type: 'update';
    entry: {
        _id: Id<'entries'>;
        _creationTime: number;
        content: string;
        title: string;
        userId: string;
        tags: string[];
        createdAt: number;
        updatedAt: number;
        encrypted: boolean;
    };
    mode: 'update' | 'view';
};

type Props = createEntryProps | updateEntryProps;

const JournalForm = ({ type, ...props }: Props) => {
    const { mutate: createEntry, isPending: isCreatingEntry } = useCreateEntry();
    const { mutate: updateEntry, isPending: isUpdatingEntry } = useUpdateEntry();
    const form = useForm({
        validators: {
            onSubmit: createEntrySchema,
        },
        defaultValues: {
            title: type === 'create' ? '' : ('entry' in props ? props.entry.title : ''),
            content:
                type === 'create'
                    ? JSON.stringify(entryDefaultValue)
                    : ('entry' in props
                        ? props.entry.content
                        : ''),
        },
        onSubmit: ({ value }) => {
            if (type === 'create') {
                createEntry(value);
            } else {
                updateEntry({
                    id: ('entry' in props ? props.entry._id : '') as Id<'entries'>,
                    title: value.title,
                    content: value.content,
                });
            }
        },
    });

    return (
        <form
            className="space-y-4"
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
        >
            <form.Field name="title">
                {(field) => (
                    <>
                        <div className="space-y-2">
                            <Label className="font-medium text-sm" htmlFor="title">
                                Title
                            </Label>
                            <Input
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                id="title"
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Enter entry title..."
                                value={field.state.value}
                            />
                        </div>
                        {field.state.meta.errors.map((error) => (
                            <div className="error" key={error?.message}>
                                {error?.message}
                            </div>
                        ))}
                    </>
                )}
            </form.Field>
            <form.Field name="content">
                {(field) => (
                    <>
                        <div className="space-y-2">
                            <Label className="font-medium text-sm" htmlFor="content">
                                Content
                            </Label>
                            <JournalEditor
                                mode={props.mode}
                                onChange={field.handleChange}
                                value={field.state.value}
                            />
                        </div>
                        {field.state.meta.errors.map((error) => (
                            <div className="error" key={error?.message}>
                                {error?.message}
                            </div>
                        ))}
                    </>
                )}
            </form.Field>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
                {([canSubmit, isSubmitting]) => (
                    <Button
                        disabled={!canSubmit || isSubmitting || isCreatingEntry || isUpdatingEntry}
                        type="submit"
                    >
                        {canSubmit ? (
                            isSubmitting || isCreatingEntry || isUpdatingEntry ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>{type === 'create' ? 'Creating...' : 'Updating...'}</span>
                                </div>
                            ) : (
                                type === 'create' ? 'Create Entry' : 'Update Entry'
                            )
                        ) : (
                            'Please fill in all fields'
                        )}
                    </Button>
                )}
            </form.Subscribe>
        </form>
    );
};

export default JournalForm;