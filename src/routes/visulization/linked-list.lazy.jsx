import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/visulization/linked-list')({
  component: () => <div>Hello /visulization/linked-list!</div>
})