import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/protected')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/protected"!</div>
}
