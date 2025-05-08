<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  text: string;
  pattern?: string;
}>();

const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const processText = (text: string) => {
  return text.replace(/<br\s*\/?>/gi, "\n");
};

const findMatches = (normalizedText: string, normalizedPattern: string) => {
  const matches: { index: number; length: number; indices?: number[] }[] = [];
  let patternIndex = 0;

  // First try to find contiguous matches
  for (let i = 0; i < normalizedText.length; i++) {
    let consecutive = 0;
    let tempPatternIndex = 0;

    for (
      let j = i;
      j < normalizedText.length && tempPatternIndex < normalizedPattern.length;
      j++
    ) {
      if (normalizedText[j] === normalizedPattern[tempPatternIndex]) {
        consecutive++;
        tempPatternIndex++;
        if (consecutive === normalizedPattern.length) {
          matches.push({ index: i, length: consecutive });
          i = j; // Skip ahead
          break;
        }
      } else {
        break;
      }
    }
  }

  // If no contiguous matches found, find non-contiguous matches
  if (matches.length === 0) {
    const highlighted: number[] = [];
    for (let i = 0; i < normalizedText.length; i++) {
      if (normalizedText[i] === normalizedPattern[patternIndex]) {
        highlighted.push(i);
        patternIndex++;
        if (patternIndex === normalizedPattern.length) {
          matches.push({
            index: highlighted[0],
            length: highlighted[highlighted.length - 1] - highlighted[0] + 1,
            indices: highlighted,
          });
          break;
        }
      }
    }
  }

  return matches;
};

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
