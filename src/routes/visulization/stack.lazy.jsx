import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/visulization/stack')({
  component: () => <div>Hello /visulization/stack!</div>
})