const driver = require("../config/database");

// Get all issues
async function getIssues() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (i:Issue)
      RETURN
        i.id AS id,
        i.name AS name,
        i.description AS description,
        i.severity AS severity
      ORDER BY i.name
    `);

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      description: record.get("description"),
      severity: record.get("severity"),
    }));
  } finally {
    await session.close();
  }
}

// Search issues by name
async function searchIssues(searchTerm) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (i:Issue)
      WHERE toLower(i.name) CONTAINS toLower($searchTerm)
      RETURN
        i.id AS id,
        i.name AS name,
        i.description AS description,
        i.severity AS severity
      ORDER BY i.name
      `,
      {
        searchTerm,
      }
    );

    return result.records.map((record) => ({
      id: record.get("id"),
      name: record.get("name"),
      description: record.get("description"),
      severity: record.get("severity"),
    }));
  } finally {
    await session.close();
  }
}
// Get troubleshooting information for an issue
async function getTroubleshooting(issueId) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (i:Issue {id: $issueId})

      OPTIONAL MATCH (i)-[:HAS_SYMPTOM]->(s:Symptom)
      OPTIONAL MATCH (s)-[:CAUSED_BY]->(c:Cause)
      OPTIONAL MATCH (i)-[:AFFECTS]->(comp:Component)
      OPTIONAL MATCH (c)-[:FIXED_BY]->(r:Resolution)
      OPTIONAL MATCH (c)-[:RELATED_TO]->(t:Technology)
      OPTIONAL MATCH (i)-[:RELATED_TO]->(related:Issue)

      RETURN
        i.id AS issueId,
        i.name AS issueName,
        i.description AS description,
        i.severity AS severity,

        collect(DISTINCT s.name) AS symptoms,
        collect(DISTINCT c.name) AS causes,
        collect(DISTINCT comp.name) AS components,
        collect(DISTINCT r.name) AS resolutions,
        collect(DISTINCT t.name) AS technologies,
        collect(DISTINCT related.name) AS relatedIssues
      `,
      {
        issueId,
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      issue: {
        id: record.get("issueId"),
        name: record.get("issueName"),
        description: record.get("description"),
        severity: record.get("severity"),
      },

      symptoms: record.get("symptoms"),
      causes: record.get("causes"),
      components: record.get("components"),
      resolutions: record.get("resolutions"),
      technologies: record.get("technologies"),
      relatedIssues: record.get("relatedIssues"),
    };
  } finally {
    await session.close();
  }
}
// Get a single issue by ID
async function getIssueById(issueId) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (i:Issue {id: $issueId})
      RETURN
        i.id AS id,
        i.name AS name,
        i.description AS description,
        i.severity AS severity
      `,
      {
        issueId,
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      id: record.get("id"),
      name: record.get("name"),
      description: record.get("description"),
      severity: record.get("severity"),
    };
  } finally {
    await session.close();
  }
}
module.exports = {
  getIssues,
  searchIssues,
  getTroubleshooting,
  getIssueById,
};