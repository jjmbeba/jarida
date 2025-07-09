import { useForm } from '@tanstack/react-form';
import type { Id } from 'convex/_generated/dataModel';
import { TagInput } from 'emblor';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
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
        tags: {
            text: string;
            id: string;
        }[];
        createdAt: number;
        updatedAt: number;
        encrypted: boolean;
    };
    mode: 'update' | 'view';
};

type Props = createEntryProps | updateEntryProps;

const JournalForm = ({ type, ...props }: Props) => {
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
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
                    : ('entry' in props ? props.entry.content : ''),
            tags: type === 'create' ? [] : ('entry' in props ? props.entry.tags : []),
        },
        onSubmit: ({ value }) => {
            if (type === 'create') {
                createEntry(value);
            } else {
                updateEntry({
                    id: ('entry' in props ? props.entry._id : '') as Id<'entries'>,
                    title: value.title,
                    content: value.content,
                    tags: value.tags,
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
            <div className="flex items-center gap-2 *:w-1/2">
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
                <form.Field name="tags">
                    {(field) => (
                        <div className="space-y-2">
                            <Label className="font-medium text-sm" htmlFor="title">
                                Tags
                            </Label>
                            <TagInput
                                activeTagIndex={activeTagIndex}
                                id={'tags'}
                                placeholder="Add a tag"
                                setActiveTagIndex={setActiveTagIndex}
                                setTags={(newTags) => {
                                    field.handleChange(newTags);
                                }}
                                styleClasses={{
                                    inlineTagsContainer:
                                        'border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1',
                                    input: 'w-full min-w-[80px] shadow-none px-2 h-7',
                                    tag: {
                                        body: 'h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7',
                                        closeButton:
                                            'absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground',
                                    },
                                }}
                                tags={field.state.value}
                            />
                        </div>
                    )}
                </form.Field>
            </div>
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
                        disabled={
                            !canSubmit || isSubmitting || isCreatingEntry || isUpdatingEntry
                        }
                        type="submit"
                    >
                        {canSubmit ? (
                            isSubmitting || isCreatingEntry || isUpdatingEntry ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>
                                        {type === 'create' ? 'Creating...' : 'Updating...'}
                                    </span>
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
