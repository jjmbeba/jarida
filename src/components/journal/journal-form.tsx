import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const JournalForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }

        setIsSubmitting(true);

        // TODO: Implement form submission logic
        // Simulate async operation
        setTimeout(() => {
            // Reset form
            setTitle('');
            setContent('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label className='font-medium text-sm' htmlFor="title">
                    Title
                </Label>
                <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter entry title..."
                    required
                    type="text"
                    value={title}
                />
            </div>

            <div className="space-y-2">
                <Label className='font-medium text-sm' htmlFor="content">
                    Content
                </Label>
                <textarea
                    className='w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your thoughts..."
                    rows={6}
                    value={content}
                />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                    className="w-full sm:w-auto"
                    disabled={isSubmitting || !title.trim()}
                    type="submit"
                >
                    {isSubmitting ? 'Saving...' : 'Save Entry'}
                </Button>
            </div>
        </form>
    );
};

export default JournalForm;
