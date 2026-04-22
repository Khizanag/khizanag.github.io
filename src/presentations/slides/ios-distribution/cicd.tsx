import { C, Reveal, SectionLabel, SectionHeading, WorkflowStep, CalloutBox, CodeBlock } from "../../shared.tsx";
import { P } from "./ui.tsx";

export function CICDSection() {
    return (
        <section id="s-cicd" style={{ background: C.surface, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "96px 48px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Reveal>
                    <SectionLabel color={P}>OUR CI/CD</SectionLabel>
                    <SectionHeading sub="The machinery behind every TBC UZ release. Bitrise &rarr; ASC &rarr; TestFlight &rarr; App Store. ~45 min end-to-end on a clean green build.">
                        How TBC UZ ships, step by step
                    </SectionHeading>
                </Reveal>

                <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, padding: "40px 48px", marginBottom: 32 }}>
                    <WorkflowStep n={1} total={8} title="Pre-commit hook (local)" color={P} delay={0}>
                        SwiftLint in strict mode, trailing whitespace fixes, no-force-unwrap checks. Failures block the commit.
                    </WorkflowStep>
                    <WorkflowStep n={2} total={8} title="PR opened &rarr; Bitrise triggers" color={P} delay={0.08}>
                        Workflow: <code style={{ color: P, background: `${P}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>pull-request</code>. Resolves SPM dependencies using <b>dev.config</b> to pin each module's branch. ~3 min.
                    </WorkflowStep>
                    <WorkflowStep n={3} total={8} title="Test matrix" color={C.purple} delay={0.16}>
                        Unit tests (~47s), contract tests vs Pact broker, snapshot tests (regenerates if --record). Parallelized across 4 Bitrise stacks. ~7 min for the whole matrix.
                    </WorkflowStep>
                    <WorkflowStep n={4} total={8} title="Merge to master &rarr; TestFlight Internal workflow" color={C.yellow} delay={0.24}>
                        fastlane match pulls Distribution cert &amp; profile. <code style={{ color: C.yellow, background: `${C.yellow}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>xcodebuild archive</code> signs the .ipa. Sentry CLI uploads dSYMs.
                    </WorkflowStep>
                    <WorkflowStep n={5} total={8} title="Upload to ASC via Transporter" color={C.yellow} delay={0.32}>
                        <code style={{ color: C.yellow, background: `${C.yellow}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>xcrun altool --upload-app</code>. Waits ~15 min for ASC processing. Slack notification when build is available in TestFlight.
                    </WorkflowStep>
                    <WorkflowStep n={6} total={8} title="QA acceptance on TestFlight" color={P} delay={0.4}>
                        Manual smoke test on our device matrix (iPhone 15, 13 mini, SE 3rd gen). Screenshot feedback via TestFlight app goes to a dedicated Jira project.
                    </WorkflowStep>
                    <WorkflowStep n={7} total={8} title="Weekly promotion to External TestFlight" color={C.purple} delay={0.48}>
                        Release manager promotes a green internal build to external testers. First build on a new version triggers Apple beta review (~24h, lighter).
                    </WorkflowStep>
                    <WorkflowStep n={8} total={8} title="Submit to App Store Review" color={C.accent} delay={0.56}>
                        Every 2&ndash;3 weeks. Release notes auto-generated from Jira tickets. Phased release enabled. Manual release gate for the final 100%.
                    </WorkflowStep>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
                    <CodeBlock filename="bitrise.yml (excerpt)">{`workflows:
  testflight-internal:
    steps:
      - activate-ssh-key@4
      - git-clone@8
      - script@1:
          inputs:
            - content: bundle install
      - script@1:
          title: Pin modules via dev.config
          inputs:
            - content: ./scripts/apply-dev-config.sh
      - xcode-archive@5:
          inputs:
            - export_method: app-store
            - code_sign_style: manual
      - deploy-to-itunesconnect-application@1:
          inputs:
            - itunescon_user: $ASC_USER
            - password: $ASC_APP_PASSWORD
            - team_id: $TEAM_ID`}</CodeBlock>

                    <div>
                        <CalloutBox color={P} icon="🔐" label="SECRETS HYGIENE">
                            <b>Bitrise Secrets</b>: <code style={{ color: P, background: `${P}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>ASC_API_KEY</code>, <code style={{ color: P, background: `${P}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>MATCH_PASSWORD</code>, <code style={{ color: P, background: `${P}15`, padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>SENTRY_AUTH_TOKEN</code>. Never in yml. Rotation quarterly.
                        </CalloutBox>

                        <div style={{ marginTop: 16 }}>
                            <CalloutBox color={C.yellow} icon="⏱" label="DURATIONS IN PRODUCTION">
                                <b>PR build:</b> ~10 min &middot; <b>Master TF Internal:</b> ~28 min &middot; <b>Master &rarr; External TF:</b> +24h (Apple review) &middot; <b>Full App Store release:</b> +48h median from submission to 100% phased rollout completion.
                            </CalloutBox>
                        </div>
                    </div>
                </div>

                <CalloutBox color={C.accent} icon="🎯" label="THE dev.config TRICK">
                    Each sub-repo (Feature-Cards, Core-Models, etc.) has its own branch. <b>dev.config</b> maps each repo to the branch RepoSync should check out for this build. This is how we ship features that span 10+ repos as one cohesive build &mdash; without a monorepo.
                </CalloutBox>
            </div>
        </section>
    );
}
