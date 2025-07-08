import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'

export const Route = createFileRoute('/_protected/protected')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(
      convexQuery(api.tags.listTags, {})
    )
  }
})

function RouteComponent() {
  const { data: tags, isLoading } = useQuery(convexQuery(api.tags.listTags, {}));

  return <div>
    <h1>Protected Route</h1>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      tags?.map((tag) => (
        <div key={tag._id}>{tag.name}</div>
      ))
    )}
  </div>
}
