<template>
  <Stepper orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      v-slot="{ state }"
      class="relative flex w-full items-start gap-6"
      :step="step.step"
    >
      <StepperSeparator
        v-if="step.step !== steps[steps.length - 1].step"
        class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />

      <StepperTrigger as-child>
        <Button
          :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
          size="icon"
          class="z-10 rounded-full shrink-0"
          :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
        >
          <Check v-if="state === 'completed'" class="size-5" />
          <Circle v-if="state === 'active'" />
          <Dot v-if="state === 'inactive'" />
        </Button>
      </StepperTrigger>

      <div class="flex flex-col gap-1">
        <StepperTitle
          :class="[state === 'active' && 'text-primary']"
          class="text-sm font-semibold transition lg:text-base"
        >
          {{ step.title }}
        </StepperTitle>
        <StepperDescription
          :class="[state === 'active' && 'text-primary']"
          class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
        >
          <span class="font-bold">{{ step.company }}</span>
          {{ step.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </Stepper>
</template>

<script setup lang="ts">
import { Check, Circle, Dot } from 'lucide-vue-next'

const steps = [
  {
    step: 1,
    title: 'Software Engineer',
    company: 'Vauldex Technologies Inc.',
    start: '2024-02',
    end: undefined,
    description:
        'A Japanese company that specializes in providing IT solutions and services to various industries, including finance, healthcare, and logistics.',
  },
  {
    step: 2,
    title: 'Junior Software Developer',
    company: 'Elf Station Inc.',
    start: '2022-08',
    end: '2024-02',
    description: 'An IT company that specializes in providing software development and IT enterprise solutions to various businesses and government institution.',
  },
]
</script>
