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
      per_page: core.getInput("look_into_last_n_build")
    })
    .then((res) => {
      const successful_commits = res.data.workflow_runs.map(run => run.head_commit.id)

      const has_already_ran = successful_commits.includes(core.getInput("commit_sha"))

      if (has_already_ran) {
        core.info(`A successful workflow run for commit ${core.getInput("commit_sha")} was found`)
      } else {
        core.info(`No successful workflow run for commit ${core.getInput("commit_sha")} was found`)
        core.info(`Last successful_commits: ${JSON.stringify(successful_commits)}`)
      }

      core.setOutput("has_already_ran", has_already_ran);
    })
    .catch((e) => {
      core.setFailed(e.message);
    });
} catch (e) {
  core.setFailed(e.message);
}
