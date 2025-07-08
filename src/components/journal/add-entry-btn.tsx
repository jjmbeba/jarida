import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import JournalForm from './journal-form';

const AddEntryButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" size="sm" variant="outline">
                    <PlusIcon className="size-4" />
                    <span className="ml-2">New Entry</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md sm:w-full">
                <DialogHeader>
                    <DialogTitle>New Journal Entry</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <JournalForm />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddEntryButton;
