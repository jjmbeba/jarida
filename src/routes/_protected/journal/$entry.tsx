import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/journal/$entry')({
  component: RouteComponent,
})

function RouteComponent() {
  const { entry } = Route.useParams();
  return <div>Hello {entry}</div>
}
