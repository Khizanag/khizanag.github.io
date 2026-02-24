import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CodeBlock, CalloutBox } from "../../shared.jsx";
import { P, PDim } from "./ui.jsx";

export function ProposalSection() {
  return (
    <section id="s-proposal" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={P}>PROPOSAL</SectionLabel>
        <SectionHeading sub="Store CI configuration alongside the code it builds.">
          Move bitrise.yml to Git
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }}>
        <div>
          <WorkflowStep n={1} total={4} title="Export" color={P} delay={0}>
            Download current configuration from Bitrise.io as{" "}
            <code style={{ color: P, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>bitrise.yml</code>.
          </WorkflowStep>
          <WorkflowStep n={2} total={4} title="Commit" color={P} delay={0.08}>
            Add the file to the repository root directory and open a PR for team review.
          </WorkflowStep>
          <WorkflowStep n={3} total={4} title="Switch" color={P} delay={0.16}>
            Point Bitrise.io to use Git as the YAML source. Keep{" "}
            <code style={{ color: P, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>trigger_map</code>{" "}
            on .io (recommended).
          </WorkflowStep>
          <WorkflowStep n={4} total={4} title="Harden" color={P} delay={0.24}>
            Add pre-commit hooks for secret scanning. Set up CODEOWNERS and branch protection.
          </WorkflowStep>
        </div>

        <Reveal delay={0.1}>
          <div>
            <CodeBlock filename="bitrise.yml (repository root)">
              {`format_version: "11"

default_step_lib_source: https://github.com/bitrise-io/bitrise-steplib.git

app:
  envs:
    - IOS_APP_VERSION_NAME: "2.86.0"
    - SCHEME: AcmeApp

workflows:
  dev-adhoc:
    before_run:
      - _preparation
    steps:
      - xcode-archive-adhoc: {}
      - dsym-upload: {}

  _preparation:
    steps:
      - activate-ssh-key@4: {}
      - git-clone@8: {}`}
            </CodeBlock>

            <div style={{ marginTop: 16 }}>
              <CalloutBox color={C.blue} label="CONSTRAINTS">
                <div style={{ fontSize: 13 }}>
                  <strong style={{ color: C.text }}>Default Branch</strong> — must always contain{" "}
                  <code style={{ color: C.blue, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>bitrise.yml</code>
                  <br /><br />
                  <strong style={{ color: C.text }}>Size Limit</strong> — YAML + assets must be under 400 KB
                  <br /><br />
                  <strong style={{ color: C.text }}>Secrets stay on .io</strong> — never commit credentials to Git
                </div>
              </CalloutBox>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
