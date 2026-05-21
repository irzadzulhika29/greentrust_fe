# n8n Workflows

## Package Identity
- `n8n/` stores workflow JSON used for GreenTrust automation.
- Current workflow file, `n8n/Document GreenTrust.json`, is the seed for the document/OCR pipeline referenced in `PLAN.md` phases 2 and 3.

## Setup & Run
- List workflows: `Get-ChildItem n8n`
- Inspect workflow names: `rg -n '\"name\":|\"type\":|\"webhookId\":' n8n`
- Validate changed JSON formatting quickly: `node -e "JSON.parse(require('fs').readFileSync('n8n/Document GreenTrust.json','utf8')); console.log('ok')"`

## Patterns & Conventions
- Keep workflow JSON importable by n8n; do not convert it into comments, pseudo-JSON, or mixed documentation.
- Node names should stay descriptive and stable because connections reference them by string.
- DO preserve the current document pipeline shape unless the task explicitly redesigns it:
  - form trigger
  - OCR / extraction
  - LLM chain
  - structured parser
  - normalization code
- DO align workflow intent with `PLAN.md`: backend should enqueue/trigger n8n, and n8n should perform classification/OCR work rather than frontend logic.
- DON'T hardcode production secrets or credential values into committed workflow JSON.
- DON'T rename nodes casually; names are part of the workflow contract inside `connections`.
- If editing code nodes, keep outputs deterministic JSON objects, matching the current `Normalize JSON Output` node.

## Key Files
- `n8n/Document GreenTrust.json` - OCR and structured extraction workflow for KTP input
- `PLAN.md` - architecture and phase plan that define how n8n fits into MVP delivery

## JIT Index Hints
- Find code-node logic: `rg -n 'jsCode|pythonCode' n8n`
- Find model/provider usage: `rg -n 'OpenAI|mistral|langchain|tesseract' n8n`
- Find parser/schema blocks: `rg -n 'jsonSchemaExample|outputParser|structured' n8n`
- Find trigger nodes: `rg -n 'formTrigger|webhook|scheduleTrigger' n8n`

## Common Gotchas
- Workflow imports can look valid while still breaking because a node name changed but `connections` were not updated.
- The current workflow is a seed artifact, not proof that the full plan target is already implemented.
- `PLAN.md` expects latency and callback behavior that are not evident from this JSON alone; do not overstate runtime guarantees.

## Pre-PR Checks
`node -e "JSON.parse(require('fs').readFileSync('n8n/Document GreenTrust.json','utf8')); console.log('ok')"`
