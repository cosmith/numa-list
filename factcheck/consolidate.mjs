import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "data.json");
const batchNames = ["batch-01.json", "batch-02.json", "batch-03.json"];

const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const audits = batchNames.flatMap((name) => {
  const rows = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, name), "utf8"));
  return rows.map((row) => ({ ...row, auditFile: `factcheck/${name}` }));
});

if (audits.length !== data.startups.length) {
  throw new Error(`Expected ${data.startups.length} audits, received ${audits.length}`);
}

const auditById = new Map();
for (const audit of audits) {
  if (auditById.has(audit.id)) throw new Error(`Duplicate audit for ${audit.id}`);
  auditById.set(audit.id, audit);
}

const changes = [];
for (const startup of data.startups) {
  const audit = auditById.get(startup.id);
  if (!audit) throw new Error(`Missing audit for ${startup.id}`);

  const before = {};
  const after = {};
  const proposedPatch = { ...(audit.proposedPatch ?? {}) };
  const additionalFounderSource = audit.additionalFounderSources?.[0];
  const embeddedFounderSource = audit.sources.find((source) =>
    source.supports?.some((support) => /founder|fondateur|team|officer/i.test(support)),
  )?.url;
  const founderSource = additionalFounderSource ?? embeddedFounderSource;
  if (proposedPatch.founders && founderSource) {
    proposedPatch.sources = {
      ...startup.sources,
      foundersOrStatus: founderSource,
    };
  }

  for (const [key, value] of Object.entries(proposedPatch)) {
    if (JSON.stringify(startup[key]) !== JSON.stringify(value)) {
      before[key] = startup[key] ?? null;
      after[key] = value;
    }
    startup[key] = value;
  }

  if (startup.founders.length > 0) startup.foundersPubliclyIdentified = true;

  startup.factCheck = {
    verdict: audit.overallVerdict,
    checkedAt: audit.checkedAt,
    fields: audit.fields,
    evidenceCount: audit.sources.length + (audit.additionalFounderSources?.length ?? 0),
    auditFile: audit.auditFile,
  };

  if (Object.keys(after).length > 0) {
    changes.push({ id: startup.id, before, after, auditFile: audit.auditFile });
  }
}

const countBy = (values) =>
  Object.fromEntries([...new Set(values)].sort().map((value) => [value, values.filter((v) => v === value).length]));

data.summary.startupCount = data.startups.length;
data.summary.founderTeamsIdentified = data.startups.filter(
  (startup) => startup.foundersPubliclyIdentified,
).length;
data.summary.statusCounts = countBy(data.startups.map((startup) => startup.status));
data.summary.confidenceCounts = countBy(data.startups.map((startup) => startup.confidence));
data.summary.factCheckVerdictCounts = countBy(audits.map((audit) => audit.overallVerdict));

data.dataset.factCheckedAt = "2026-08-21";
data.dataset.factCheckMethodology = "factcheck/README.md";
data.dataset.factCheckAuditFiles = batchNames.map((name) => `factcheck/${name}`);

fs.writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(
  path.join(import.meta.dirname, "changes.json"),
  `${JSON.stringify({ generatedAt: "2026-08-21", changeCount: changes.length, changes }, null, 2)}\n`,
);

console.log(`Consolidated ${audits.length} audits and changed ${changes.length} startup records.`);
