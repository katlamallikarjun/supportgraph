// Query 1: Find an issue by name

MATCH (i:Issue)
WHERE toLower(i.name) CONTAINS toLower($search)
RETURN i
ORDER BY i.name;

// Query 2: Issue → Symptom → Cause → Component

MATCH (i:Issue {name: $issueName})
      -[:HAS_SYMPTOM]->(s:Symptom)
      -[:CAUSED_BY]->(c:Cause)
      -[:AFFECTS]->(component:Component)

RETURN
    i.name AS issue,
    s.name AS symptom,
    c.name AS cause,
    component.name AS component
ORDER BY cause;

// Query 3: Issue → Symptom → Cause → Resolution

MATCH (i:Issue {name: $issueName})
      -[:HAS_SYMPTOM]->(s:Symptom)
      -[:CAUSED_BY]->(c:Cause)
      -[:FIXED_BY]->(r:Resolution)

RETURN
    i.name AS issue,
    s.name AS symptom,
    c.name AS cause,
    r.name AS resolution,
    r.difficulty AS difficulty
ORDER BY difficulty, resolution;

// Query 4: Issue → Symptom → Cause → Technology

MATCH (i:Issue {name: $issueName})
      -[:HAS_SYMPTOM]->(s:Symptom)
      -[:CAUSED_BY]->(c:Cause)
      -[:RELATED_TO]->(t:Technology)

RETURN
    i.name AS issue,
    s.name AS symptom,
    c.name AS cause,
    t.name AS technology
ORDER BY technology;

// Query 5: Find related issues

MATCH (i:Issue {name: $issueName})
      -[:RELATED_TO]->(related:Issue)

RETURN
    i.name AS issue,
    related.name AS relatedIssue;