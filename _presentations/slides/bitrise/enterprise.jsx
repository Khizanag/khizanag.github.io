import { C, Reveal, SectionLabel, SectionHeading, TagChip, CheckItem, CodeBlock, CalloutBox } from "../../src/shared.jsx";

export function EnterpriseSection() {
  return (
    <section id="s-enterprise" style={{ maxWidth: 1100, margin: "0 auto", padding: "96px 48px" }}>
      <Reveal>
        <SectionLabel color={C.purple}>ENTERPRISE FEATURE</SectionLabel>
        <SectionHeading sub="Once in Git, the door opens for modular CI configuration — available on the Enterprise plan.">
          Modular YAML configuration
        </SectionHeading>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
        <Reveal delay={0}>
          <CodeBlock filename="bitrise.yml">
            {`include:
  - path: ci/workflows/build.yml
  - path: ci/workflows/test.yml
  - path: ci/workflows/deploy.yml
  - repository: space-int/shared-ci
    path: ios/common-steps.yml`}
          </CodeBlock>
        </Reveal>

        <Reveal delay={0.12}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <TagChip color={C.purple} dot={false}>WHY THIS MATTERS</TagChip>
            </div>
            <CheckItem active>Split ownership per team — payments team owns deploy.yml</CheckItem>
            <CheckItem active>Reduce merge conflicts — teams work in separate files</CheckItem>
            <CheckItem active>Reuse workflows across multiple apps in the org</CheckItem>
            <CheckItem active>Isolate changes to specific feature workflows</CheckItem>
            <CheckItem active>Improves readability at scale (1,200+ line files)</CheckItem>

            <div style={{ marginTop: 24 }}>
              <CalloutBox color={C.purple} label="PREREQUISITE">
                Requires Bitrise <strong style={{ color: C.text }}>Enterprise</strong> plan. Not available when config is stored on Bitrise.io — only when using Git as the YAML source. This is a future unlock, not a day-one deliverable.
              </CalloutBox>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
