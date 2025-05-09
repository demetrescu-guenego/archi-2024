<script setup lang="ts">
import { computed } from "vue";
import { findMatches, normalizeText, processText } from "../../utils/string";

const props = defineProps<{
  text: string;
  pattern?: string;
}>();

const getHighlightedParts = computed(() => {
  const processedText = processText(props.text);
  if (!props.pattern) return [{ text: processedText, highlight: false }];

  const normalizedText = normalizeText(processedText);
  const normalizedPattern = normalizeText(props.pattern);

  const matches = findMatches(normalizedText, normalizedPattern);
  if (matches.length === 0) return [{ text: processedText, highlight: false }];

  const result: { text: string; highlight: boolean }[] = [];
  let lastIndex = 0;

  matches.forEach((match) => {
    // Add non-highlighted text before match
    if (match.index > lastIndex) {
      result.push({
        text: processedText.slice(lastIndex, match.index),
        highlight: false,
      });
    }

    // Add highlighted text
    if (match.indices) {
      // Non-contiguous match
      let currentIndex = match.index;
      match.indices.forEach((idx) => {
        if (idx > currentIndex) {
          result.push({
            text: processedText.slice(currentIndex, idx),
            highlight: false,
          });
        }
        result.push({
          text: processedText.slice(idx, idx + 1),
          highlight: true,
        });
        currentIndex = idx + 1;
      });
    } else {
      // Contiguous match
      result.push({
        text: processedText.slice(match.index, match.index + match.length),
        highlight: true,
      });
    }
    lastIndex = match.index + match.length;
  });

  // Add remaining text
  if (lastIndex < processedText.length) {
    result.push({
      text: processedText.slice(lastIndex),
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
