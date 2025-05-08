<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  text: string;
  pattern?: string;
}>();

const processText = (text: string) => {
  // Always replace <br/> or <br /> with actual line break
  return text.replace(/<br\s*\/?>/gi, "\n");
};

const getHighlightedParts = computed(() => {
  const processedText = processText(props.text);
  if (!props.pattern) return [{ text: processedText, highlight: false }];

  const result: { text: string; highlight: boolean }[] = [];
  const normalizedText = processedText.toLowerCase();
  const normalizedPattern = props.pattern.toLowerCase();
  let textIndex = 0;
  let patternIndex = 0;
  let lastCut = 0;

  while (
    textIndex < normalizedText.length &&
    patternIndex < normalizedPattern.length
  ) {
    if (normalizedText[textIndex] === normalizedPattern[patternIndex]) {
      if (lastCut < textIndex) {
        result.push({
          text: processedText.slice(lastCut, textIndex),
          highlight: false,
        });
      }
      result.push({
        text: processedText.slice(textIndex, textIndex + 1),
        highlight: true,
      });
      lastCut = textIndex + 1;
      patternIndex++;
    }
    textIndex++;
  }

  if (lastCut < processedText.length) {
    result.push({
      text: processedText.slice(lastCut),
      highlight: false,
    });
  }

  return result;
});
</script>

<template>
  <span class="whitespace-pre-line">
    <template v-for="(part, index) in getHighlightedParts" :key="index">
      <span
        :class="{
          'font-bold text-fuchsia-600': part.highlight,
        }"
      >
        {{ part.text }}
      </span>
    </template>
  </span>
</template>
