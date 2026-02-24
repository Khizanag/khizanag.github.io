import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep } from "../../shared.jsx";
import { P } from "./ui.jsx";

export function WorkflowSection() {
  return (
    <section id="s-workflow" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel color={P}>NEW WORKFLOW</SectionLabel>
          <SectionHeading sub="Self-documenting and frictionless. No Slack messages. No waiting. Team B's ownership is enforced by the system.">
            Cross-Team Change, End to End
          </SectionHeading>
        </Reveal>

        <div style={{ maxWidth: 600 }}>
          <WorkflowStep n={1} total={5} title="Identify cross-team impact" color={C.blue} delay={0}>
            Developer from Team A realizes their change requires a modification in Team B's repo.
          </WorkflowStep>
          <WorkflowStep n={2} total={5} title="Push branch directly" color={C.blue} delay={0.1}>
            They push their branch to Team B's repo — allowed by org-wide write access. No access request needed.
          </WorkflowStep>
          <WorkflowStep n={3} total={5} title="Open PR — owners auto-requested" color={P} delay={0.2}>
            GitHub reads CODEOWNERS and automatically adds Team B members as required reviewers on the PR.
          </WorkflowStep>
          <WorkflowStep n={4} total={5} title="Team B reviews with domain context" color={P} delay={0.3}>
            Team B engineers review the change, request modifications if needed, and approve when satisfied.
          </WorkflowStep>
          <WorkflowStep n={5} total={5} title="2 CODEOWNER approvals + CI = merge" color={C.yellow} delay={0.4}>
            After both required approvals and green CI, the PR merges. Team B's ownership was never compromised.
          </WorkflowStep>
        </div>
      </div>
    </section>
  );
}
