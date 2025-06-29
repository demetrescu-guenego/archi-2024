# Contributor Guide

## Understand the application business context and purpose

Read the document `./SPECIFICATIONS.md` to understand the objectives of the
website and keep it in mind.

## Commit message

- use conventional commit.
- add in footer "Co-authored-by: OpenAI Codex for JLG <codex@openai.com>"

## Format the code

Before commit, do not forget to prettier the code with the project settings.
Just do:

```
pnpm run format
```

## Lint the code

The project use eslint. Just do:

```
pnpm run lint
```
