# AynzamAI — Domain Glossary

## Pricing

### Output

The billing unit. **One Output = one generated document** of any supported type — a FUBE (Funktionsbeschreibung), a Funktionsliste, or a LV (Leistungsverzeichnis). Iterations on the same Output within a billing period are unlimited — re-generating a FUBE with adjusted parameters does not create a new Output.

A new Output is created when the user explicitly starts a new document instance (e.g. "new FUBE for Anlage RLT 02" vs "regenerate the existing FUBE for RLT 01"). The product enforces this distinction in its UI; pricing follows the product's notion of distinctness.

_Avoid_: "call", "request", "API hit" — these conflate billing with infrastructure and create misalignment between what the customer values (finished doc) and what they pay for. Also avoid "document" alone — too vague (a customer's project has many documents that aren't AynzamAI Outputs).

### User

A workspace member with the Generator role — someone who can create new Outputs or trigger regenerations on existing ones. Read-only viewers (PMs, junior staff, external reviewers, stakeholders who only consume the finished doc) are **not** Users in the pricing sense and do not count toward Tier limits.

This matches the real shape of engineering teams: roughly 30% of a planning office actively generates documentation, the remaining 70% review or consume it.

_Avoid_: "Seat" (ambiguous — could mean any login), "Login", "Account-Member".

### Tier

A named price plan that bundles an Output quota and a User cap. Currently four Tiers: Starter, Studio, Engineering, Enterprise. Each Tier has a monthly price, an Output quota per month, a User cap, and an Overage rate for Outputs above the quota.

### Early-Customer Slot

One of the first 50 paying Customers gets their Tier price locked **lifetime** at the launch Early-Customer rate. After Slot 50 fills, new Customers pay Standard Pricing. Existing Early-Customer-locked Customers keep their rate even after the slots close — for the duration of their subscription, including upgrades to higher Tiers (their lock follows them to the higher Tier at its Early-Customer rate).

_Operational note_: the slot count is internal (not displayed as a live counter on the public page) to avoid gameable scarcity theatre. The page communicates the program existence, not the live count.
