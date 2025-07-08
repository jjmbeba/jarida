import { useConvexMutation } from '@convex-dev/react-query';
import { useMutation } from '@tanstack/react-query';
import { api } from 'convex/_generated/api';
import { toast } from 'sonner';

export const useCreateEntry = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.entries.createEntry),
        onSuccess: () => {
            toast.success('Entry created successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useDeleteEntry = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    return useMutation({
        mutationFn: useConvexMutation(api.entries.deleteEntry),
        onSuccess: () => {
            toast.success('Entry deleted successfully');
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};