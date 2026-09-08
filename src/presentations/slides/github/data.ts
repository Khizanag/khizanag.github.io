export const codeownersBasic = `# Everything in this repo → payments team
* @org/payments-ios-team

# Path-level granularity
/Sources/PaymentsUI/  @org/payments-ios-team
/Sources/Networking/  @org/platform-ios-team

# CODEOWNERS file itself → architects only
.github/CODEOWNERS    @org/ios-architects`;

export const codeownersMultiTeam = `# Cross-team PR touching both paths?
# BOTH teams become required reviewers.

/Sources/Networking/   @org/platform-ios-team
/Sources/PaymentsUI/   @org/payments-ios-team
/Sources/AnalyticsUI/  @org/analytics-ios-team`;
