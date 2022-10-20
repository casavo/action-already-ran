# Has-already-ran javascript action

This action output 'true' or 'false' if a workflow for the same commit sha has already successful ran

## Inputs

### `look_into_last_n_build`

**Required** The number of how many past successful build look into. Default `10`.

## Outputs

### `has_already_ran`

if a workflow for the same commit sha has already successful ran

## Example usage

```yaml
uses: casavo/action-already-ran@master
with:
  workflow_id: "ci.yml"
  github_token: ${{ secrets.GITHUB_TOKEN }}
  look_into_last_n_build: 10
```

## Build

in order to build a new version of this action, after index.js is edited run the command:
`ncc build index.js`
and commit both index.js and dist/index.js
tag with the new version and push both master and the new tag
