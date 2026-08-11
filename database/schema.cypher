// SupportGraph - Graph Schema
//
// Node types:
// Issue
// Symptom
// Cause
// Component
// Resolution
// Technology
//
// Relationship types:
// Issue -[:HAS_SYMPTOM]-> Symptom
// Symptom -[:CAUSED_BY]-> Cause
// Cause -[:AFFECTS]-> Component
// Cause -[:FIXED_BY]-> Resolution
// Cause -[:RELATED_TO]-> Technology
// Issue -[:RELATED_TO]-> Issue
// Component -[:USES]-> Technology