import type { Id } from 'convex/_generated/dataModel';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useDeleteEntry } from '@/hooks/entries';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button, buttonVariants } from '../ui/button';

const DeleteEntryButton = ({ entryId }: { entryId: Id<'entries'> }) => {
    const { mutate: deleteEntry, isPending: isDeleting } = useDeleteEntry();
    const [open, setOpen] = useState(false);

    return (
        <AlertDialog onOpenChange={setOpen} open={open}>
            <AlertDialogTrigger asChild>
                <Button size={'icon'} variant="outline">
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        journal entry from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={cn(buttonVariants({ variant: 'destructive' }))}
                        onClick={() => {
                            deleteEntry({ id: entryId });
                            setOpen(false);
                        }}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteEntryButton;
