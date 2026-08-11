const neo4j = require("neo4j-driver");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const uri = process.env.COGNODB_URI;
const username = process.env.COGNODB_USERNAME;
const password = process.env.COGNODB_PASSWORD;

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

// -----------------------------
// SupportGraph Seed Data
// -----------------------------

const issues = [
  {
    id: "ISSUE-001",
    name: "API Timeout",
    description: "API requests take too long to complete.",
    severity: "MEDIUM",
  },
  {
    id: "ISSUE-002",
    name: "401 Unauthorized",
    description: "The API rejects a request because authentication is invalid.",
    severity: "HIGH",
  },
  {
    id: "ISSUE-003",
    name: "403 Forbidden",
    description: "The authenticated user does not have permission to access a resource.",
    severity: "HIGH",
  },
  {
    id: "ISSUE-004",
    name: "404 Not Found",
    description: "The requested API resource could not be found.",
    severity: "LOW",
  },
  {
    id: "ISSUE-005",
    name: "500 Internal Server Error",
    description: "The application encountered an unexpected server-side error.",
    severity: "HIGH",
  },
  {
    id: "ISSUE-006",
    name: "502 Bad Gateway",
    description: "A gateway received an invalid response from an upstream service.",
    severity: "HIGH",
  },
  {
    id: "ISSUE-007",
    name: "Database Connection Failed",
    description: "The application cannot establish a connection to the database.",
    severity: "CRITICAL",
  },
  {
    id: "ISSUE-008",
    name: "Slow API Response",
    description: "The API responds successfully but takes longer than expected.",
    severity: "MEDIUM",
  },
  {
    id: "ISSUE-009",
    name: "High CPU Usage",
    description: "An application server is consistently consuming excessive CPU.",
    severity: "HIGH",
  },
  {
    id: "ISSUE-010",
    name: "Memory Leak",
    description: "Application memory usage increases continuously over time.",
    severity: "HIGH",
  },
];

const symptoms = [
  {
    id: "SYM-001",
    name: "Slow Response",
    description: "Requests take longer than the expected response time.",
  },
  {
    id: "SYM-002",
    name: "Connection Timeout",
    description: "A connection cannot be established within the configured timeout.",
  },
  {
    id: "SYM-003",
    name: "Authentication Failure",
    description: "The server rejects the supplied authentication credentials.",
  },
  {
    id: "SYM-004",
    name: "Permission Denied",
    description: "The authenticated user cannot access the requested resource.",
  },
  {
    id: "SYM-005",
    name: "Resource Missing",
    description: "The requested resource does not exist at the specified path.",
  },
  {
    id: "SYM-006",
    name: "Unexpected Server Error",
    description: "The server returns an unexpected 5xx response.",
  },
  {
    id: "SYM-007",
    name: "Upstream Failure",
    description: "A dependent upstream service returns an invalid response.",
  },
  {
    id: "SYM-008",
    name: "Database Unavailable",
    description: "The application cannot reach the database.",
  },
  {
    id: "SYM-009",
    name: "High CPU Utilization",
    description: "CPU utilization remains above normal operating levels.",
  },
  {
    id: "SYM-010",
    name: "Increasing Memory Usage",
    description: "Application memory consumption continuously increases.",
  },
  {
    id: "SYM-011",
    name: "Connection Pool Exhaustion",
    description: "Available database connections are consumed by active requests.",
  },
  {
    id: "SYM-012",
    name: "Repeated Request Failures",
    description: "Requests repeatedly fail when calling a dependent service.",
  },
];

const causes = [
  {
    id: "CAUSE-001",
    name: "Slow Database Query",
    description: "A database query takes too long to execute.",
  },
  {
    id: "CAUSE-002",
    name: "Expired Access Token",
    description: "The supplied access token has expired.",
  },
  {
    id: "CAUSE-003",
    name: "Insufficient Permissions",
    description: "The authenticated account lacks the required permission.",
  },
  {
    id: "CAUSE-004",
    name: "Incorrect API Route",
    description: "The requested endpoint path is incorrect.",
  },
  {
    id: "CAUSE-005",
    name: "Unhandled Application Exception",
    description: "Application code throws an exception that is not handled.",
  },
  {
    id: "CAUSE-006",
    name: "Upstream Service Failure",
    description: "A dependent service is unavailable or returning invalid responses.",
  },
  {
    id: "CAUSE-007",
    name: "Database Overload",
    description: "The database is overloaded by excessive queries or connections.",
  },
  {
    id: "CAUSE-008",
    name: "Connection Pool Exhaustion",
    description: "All available database connections are already in use.",
  },
  {
    id: "CAUSE-009",
    name: "CPU Intensive Processing",
    description: "Application processing consumes excessive CPU resources.",
  },
  {
    id: "CAUSE-010",
    name: "Unreleased Memory",
    description: "Application objects remain in memory longer than necessary.",
  },
  {
    id: "CAUSE-011",
    name: "Network Latency",
    description: "Network delays increase communication time between services.",
  },
  {
    id: "CAUSE-012",
    name: "Invalid Credentials",
    description: "The supplied credentials are missing or incorrect.",
  },
];

const components = [
  {
    id: "COMP-001",
    name: "API Gateway",
    type: "Gateway",
  },
  {
    id: "COMP-002",
    name: "Authentication Service",
    type: "Backend Service",
  },
  {
    id: "COMP-003",
    name: "Application Server",
    type: "Backend",
  },
  {
    id: "COMP-004",
    name: "Database",
    type: "Data Store",
  },
  {
    id: "COMP-005",
    name: "Load Balancer",
    type: "Infrastructure",
  },
  {
    id: "COMP-006",
    name: "Cache",
    type: "Infrastructure",
  },
  {
    id: "COMP-007",
    name: "External Payment API",
    type: "External Service",
  },
  {
    id: "COMP-008",
    name: "Background Worker",
    type: "Backend",
  },
];

const resolutions = [
  {
    id: "RES-001",
    name: "Optimize Database Query",
    description: "Review query execution plans and add appropriate indexes.",
    difficulty: "MEDIUM",
  },
  {
    id: "RES-002",
    name: "Refresh Access Token",
    description: "Generate or refresh a valid authentication token.",
    difficulty: "EASY",
  },
  {
    id: "RES-003",
    name: "Update User Permissions",
    description: "Grant the account the required application permission.",
    difficulty: "MEDIUM",
  },
  {
    id: "RES-004",
    name: "Correct API Route",
    description: "Verify the endpoint path and HTTP method.",
    difficulty: "EASY",
  },
  {
    id: "RES-005",
    name: "Review Application Logs",
    description: "Inspect server logs and stack traces for the failing request.",
    difficulty: "EASY",
  },
  {
    id: "RES-006",
    name: "Check Upstream Service",
    description: "Verify the health and response of the dependent service.",
    difficulty: "EASY",
  },
  {
    id: "RES-007",
    name: "Increase Connection Pool",
    description: "Adjust the database connection pool after confirming capacity.",
    difficulty: "MEDIUM",
  },
  {
    id: "RES-008",
    name: "Reduce CPU Intensive Work",
    description: "Optimize expensive processing or move work to background jobs.",
    difficulty: "HARD",
  },
  {
    id: "RES-009",
    name: "Release Unused Resources",
    description: "Review object lifecycle and release resources that are no longer needed.",
    difficulty: "HARD",
  },
  {
    id: "RES-010",
    name: "Increase Request Timeout",
    description: "Increase timeout settings only after addressing the underlying latency.",
    difficulty: "MEDIUM",
  },
];

const technologies = [
  {
    id: "TECH-001",
    name: "Node.js",
    category: "Runtime",
  },
  {
    id: "TECH-002",
    name: "Express.js",
    category: "Backend Framework",
  },
  {
    id: "TECH-003",
    name: "PostgreSQL",
    category: "Database",
  },
  {
    id: "TECH-004",
    name: "Redis",
    category: "Cache",
  },
  {
    id: "TECH-005",
    name: "REST API",
    category: "API",
  },
  {
    id: "TECH-006",
    name: "JWT",
    category: "Authentication",
  },
  {
    id: "TECH-007",
    name: "Docker",
    category: "Infrastructure",
  },
  {
    id: "TECH-008",
    name: "AWS",
    category: "Cloud",
  },
];

// -----------------------------
// Relationships
// -----------------------------

const issueSymptoms = [
  ["ISSUE-001", "SYM-001"],
  ["ISSUE-001", "SYM-002"],
  ["ISSUE-002", "SYM-003"],
  ["ISSUE-003", "SYM-004"],
  ["ISSUE-004", "SYM-005"],
  ["ISSUE-005", "SYM-006"],
  ["ISSUE-006", "SYM-007"],
  ["ISSUE-007", "SYM-008"],
  ["ISSUE-008", "SYM-001"],
  ["ISSUE-009", "SYM-009"],
  ["ISSUE-010", "SYM-010"],
  ["ISSUE-007", "SYM-011"],
  ["ISSUE-006", "SYM-012"],
];

const symptomCauses = [
  ["SYM-001", "CAUSE-001"],
  ["SYM-002", "CAUSE-011"],
  ["SYM-002", "CAUSE-008"],
  ["SYM-003", "CAUSE-002"],
  ["SYM-003", "CAUSE-012"],
  ["SYM-004", "CAUSE-003"],
  ["SYM-005", "CAUSE-004"],
  ["SYM-006", "CAUSE-005"],
  ["SYM-007", "CAUSE-006"],
  ["SYM-008", "CAUSE-007"],
  ["SYM-009", "CAUSE-009"],
  ["SYM-010", "CAUSE-010"],
  ["SYM-011", "CAUSE-008"],
  ["SYM-012", "CAUSE-006"],
];

const causeComponents = [
  ["CAUSE-001", "COMP-004"],
  ["CAUSE-002", "COMP-002"],
  ["CAUSE-003", "COMP-002"],
  ["CAUSE-004", "COMP-001"],
  ["CAUSE-005", "COMP-003"],
  ["CAUSE-006", "COMP-007"],
  ["CAUSE-007", "COMP-004"],
  ["CAUSE-008", "COMP-004"],
  ["CAUSE-009", "COMP-003"],
  ["CAUSE-010", "COMP-003"],
  ["CAUSE-011", "COMP-005"],
  ["CAUSE-012", "COMP-002"],
];

const causeResolutions = [
  ["CAUSE-001", "RES-001"],
  ["CAUSE-002", "RES-002"],
  ["CAUSE-003", "RES-003"],
  ["CAUSE-004", "RES-004"],
  ["CAUSE-005", "RES-005"],
  ["CAUSE-006", "RES-006"],
  ["CAUSE-007", "RES-001"],
  ["CAUSE-008", "RES-007"],
  ["CAUSE-009", "RES-008"],
  ["CAUSE-010", "RES-009"],
  ["CAUSE-011", "RES-010"],
  ["CAUSE-012", "RES-002"],
];

const causeTechnologies = [
  ["CAUSE-001", "TECH-003"],
  ["CAUSE-002", "TECH-006"],
  ["CAUSE-003", "TECH-006"],
  ["CAUSE-004", "TECH-005"],
  ["CAUSE-005", "TECH-001"],
  ["CAUSE-006", "TECH-008"],
  ["CAUSE-007", "TECH-003"],
  ["CAUSE-008", "TECH-003"],
  ["CAUSE-009", "TECH-001"],
  ["CAUSE-010", "TECH-001"],
  ["CAUSE-011", "TECH-008"],
  ["CAUSE-012", "TECH-006"],
];

const componentTechnologies = [
  ["COMP-001", "TECH-005"],
  ["COMP-002", "TECH-002"],
  ["COMP-002", "TECH-006"],
  ["COMP-003", "TECH-001"],
  ["COMP-003", "TECH-002"],
  ["COMP-004", "TECH-003"],
  ["COMP-006", "TECH-004"],
  ["COMP-005", "TECH-007"],
];

const relatedIssues = [
  ["ISSUE-001", "ISSUE-007"],
  ["ISSUE-001", "ISSUE-008"],
  ["ISSUE-005", "ISSUE-006"],
  ["ISSUE-007", "ISSUE-008"],
  ["ISSUE-009", "ISSUE-010"],
];

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("🌱 Starting SupportGraph seed...");

    // Clear the current graph.
    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("🧹 Existing graph cleared.");

    // Create Issues
    await session.run(
      `
      UNWIND $items AS item
      CREATE (:Issue {
        id: item.id,
        name: item.name,
        description: item.description,
        severity: item.severity
      })
      `,
      { items: issues }
    );

    // Create Symptoms
    await session.run(
      `
      UNWIND $items AS item
      CREATE (:Symptom {
        id: item.id,
        name: item.name,
        description: item.description
      })
      `,
      { items: symptoms }
    );

    // Create Causes
    await session.run(
      `
      UNWIND $items AS item
      CREATE (:Cause {
        id: item.id,
        name: item.name,
        description: item.description
      })
      `,
      { items: causes }
    );

    // Create Components
    await session.run(
      `
      UNWIND $items AS item
      CREATE (:Component {
        id: item.id,
        name: item.name,
        type: item.type
      })
      `,
      { items: components }
    );

    // Create Resolutions
    await session.run(
      `
      UNWIND $items AS item
      CREATE (:Resolution {
        id: item.id,
        name: item.name,
        description: item.description,
        difficulty: item.difficulty
      })
      `,
      { items: resolutions }
    );

    // Create Technologies
    await session.run(
      `
      UNWIND $items AS item
      CREATE (:Technology {
        id: item.id,
        name: item.name,
        category: item.category
      })
      `,
      { items: technologies }
    );

    // Issue -> Symptom
    await session.run(
      `
      UNWIND $items AS item
      MATCH (i:Issue {id: item[0]})
      MATCH (s:Symptom {id: item[1]})
      CREATE (i)-[:HAS_SYMPTOM]->(s)
      `,
      { items: issueSymptoms }
    );

    // Symptom -> Cause
    await session.run(
      `
      UNWIND $items AS item
      MATCH (s:Symptom {id: item[0]})
      MATCH (c:Cause {id: item[1]})
      CREATE (s)-[:CAUSED_BY]->(c)
      `,
      { items: symptomCauses }
    );

    // Cause -> Component
    await session.run(
      `
      UNWIND $items AS item
      MATCH (c:Cause {id: item[0]})
      MATCH (component:Component {id: item[1]})
      CREATE (c)-[:AFFECTS]->(component)
      `,
      { items: causeComponents }
    );

    // Cause -> Resolution
    await session.run(
      `
      UNWIND $items AS item
      MATCH (c:Cause {id: item[0]})
      MATCH (r:Resolution {id: item[1]})
      CREATE (c)-[:FIXED_BY]->(r)
      `,
      { items: causeResolutions }
    );

    // Cause -> Technology
    await session.run(
      `
      UNWIND $items AS item
      MATCH (c:Cause {id: item[0]})
      MATCH (t:Technology {id: item[1]})
      CREATE (c)-[:RELATED_TO]->(t)
      `,
      { items: causeTechnologies }
    );

    // Component -> Technology
    await session.run(
      `
      UNWIND $items AS item
      MATCH (c:Component {id: item[0]})
      MATCH (t:Technology {id: item[1]})
      CREATE (c)-[:USES]->(t)
      `,
      { items: componentTechnologies }
    );

    // Issue -> Issue
    await session.run(
      `
      UNWIND $items AS item
      MATCH (i1:Issue {id: item[0]})
      MATCH (i2:Issue {id: item[1]})
      CREATE (i1)-[:RELATED_TO]->(i2)
      `,
      { items: relatedIssues }
    );

    // Verify graph
    const result = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS label, count(n) AS count
      ORDER BY label
    `);

    console.log("\n📊 Nodes created:");

    for (const record of result.records) {
      console.log(
        `${record.get("label")}: ${record.get("count").toNumber()}`
      );
    }

    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS relationship, count(r) AS count
      ORDER BY relationship
    `);

    console.log("\n🔗 Relationships created:");

    for (const record of relationshipResult.records) {
      console.log(
        `${record.get("relationship")}: ${record.get("count").toNumber()}`
      );
    }

    console.log("\n✅ SupportGraph seed completed successfully!");
  } catch (error) {
    console.error("\n❌ Seed failed:");
    console.error(error.message);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();