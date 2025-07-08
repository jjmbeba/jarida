import { useForm } from '@tanstack/react-form';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const JournalForm = () => {
    const form = useForm({
        validators: {
            onSubmit: z.object({
                title: z.string().min(1, 'Title is required'),
                content: z.string().min(1, 'Content is required'),
            }),
        },
        defaultValues: {
            title: '',
            content: '',
        },
        onSubmit: ({ value }) => {
            console.log(value);
            //Do something
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
                            <Textarea
                                className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                id="content"
                                onChange={(e) => field.handleChange(e.target.value)}
                                placeholder="Write your thoughts..."
                                rows={6}
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
                    <Button disabled={!canSubmit} type="submit">
                        {canSubmit ? (
                            isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Saving...</span>
                                </div>
                            ) : (
                                'Save Entry'
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
