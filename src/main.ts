import '@/style.css'
import registerComponents from "@/components/_components.ts"

registerComponents()

// language=HTML
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <x-timer-container>
      <x-start-button time="30">30s</x-start-button>
      <x-start-button time="60">60s</x-start-button>
      <x-start-button time="90">90s</x-start-button>
  </x-timer-container>
  <x-popup></x-popup>
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
  <x-scores-container>
  </x-scores-container>
`

