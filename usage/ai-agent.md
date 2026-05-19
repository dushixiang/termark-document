---
outline: deep
---

# AI Agent Guide

## Model Thinking Mode Error

If you see an error like this when using the AI Agent:

```text
[400] The 'reasoning_content' in the thinking mode must be passed back to the API.
```

It usually means the current model has thinking mode, reasoning mode, or Thinking enabled. Some model providers require the client to pass `reasoning_content` back in later requests, but Termark currently does not support forwarding or returning large-model thinking content, so it cannot work with this kind of thinking mode.

When this error appears, disable model thinking in AI settings:

- Set reasoning, thinking, reasoning mode, or thinking mode to disabled.
- If the model provides parameters such as `enable_thinking`, `thinking`, or `reasoning`, turn them off or choose disabled/off.
- If the current model forces thinking mode on, switch to a model that supports disabling thinking.

After thinking is disabled, the AI Agent can still chat, analyze terminal output, and execute controlled commands normally. The model simply will not return separate thinking content, and Termark will not process the model's reasoning process.

## Why Thinking Needs To Be Disabled

Termark's AI Agent is designed for SSH terminal assistance. It sends recent terminal output, the user's question, and required tool calls to the model. The current implementation only handles normal assistant messages and tool call results; it does not handle the model's internal thinking content.

Enabling thinking mode may therefore cause these issues:

- The API returns `reasoning_content` related errors.
- The model provider requires the client to pass thinking content back, which Termark does not support.
- The tool call context cannot continue, causing the AI Agent response to stop.

If your model provider enables thinking mode by default, create a separate model configuration for Termark with thinking disabled.
