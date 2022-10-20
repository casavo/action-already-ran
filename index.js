const core = require('@actions/core');
const github = require('@actions/github');

try {
  const octokit = github.getOctokit(core.getInput("github_token"));
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
  octokit.rest.actions
    .listWorkflowRuns({
      owner,
      repo,
      workflow_id: core.getInput("workflow_id"),
      status: "success",
      branch: core.getInput("branch"),
      event: "push",
    })
    .then((res) => {
      core.error(`Error ${JSON.stringify(res.data.workflow_runs)}, action may still succeed though`);

      // const lastSuccessCommitHash =
      //   res.data.workflow_runs.length > 0
      //     ? res.data.workflow_runs[0].head_commit.id
      //     : "";
      core.setOutput("already_ran", true);
    })
    .catch((e) => {
      core.setFailed(e.message);
    });
} catch (e) {
  core.setFailed(e.message);
}
