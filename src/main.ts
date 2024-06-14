import '@/style.css'
import registerComponents from "@/components/_components.ts"

registerComponents()

// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <x-board>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
    <x-card></x-card>
  </x-board>
`

