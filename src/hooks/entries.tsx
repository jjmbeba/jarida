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
        onError: () => {
            toast.error('Failed to create entry');
        },
    });
};
