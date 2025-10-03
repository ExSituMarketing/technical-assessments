# Age Verification Provider Database Design Challenge

## Background

We need to design a database schema for a global content delivery system that manages Age Verification (AV) providers across different countries and regions. The system needs to handle multiple sites, each potentially using different AV providers based on geographical requirements.

## Current Challenges

1. Different countries and regions have varying age verification requirements
2. Sites need to work with multiple AV providers
3. AV providers have different regional coverage and capabilities
4. Sites can exclude some Countries/Regions for specific providers assign to them

## Requirements

### Core Entities

1. **AV Providers Management**

    - Provider information (name, display name, logo)
    - Status tracking (enabled/disabled)
    - Creation and modification timestamps
    - Regional support configuration
    - Admin UI display settings

2. **Geographical Management**

    - Countries and their ISO codes
    - Regions (States/Provinces) with ISO codes
    - Support for nested geographical hierarchies: a country can have multiple regions, a region can have only one country

3. **Paysite Integration**
    - Paysites have id, slug and name
    - Paysites can use multiple providers
    - Paysites can restrict multiple Country/Region per provider they're using
    - Provider priority handling (extra)

## Expected Deliverables

1. **Database Schema**

    - Complete SQL schema with all necessary tables
    - Proper relationships and constraints
    - Indexes for optimal performance
    - Support for CRUD operations

2. **Documentation**

    - Explanation of your design decisions
    - How your schema supports each requirement
    - Any assumptions made
    - Performance considerations

3. **Query Examples**
    - How to find available AV providers for a specific country/region
    - How to manage paysite-provider relationships
    - How to efficiently sort and filter providers

## Evaluation Criteria

Your solution will be evaluated based on:

1. **Schema Design (40%)**

    - Proper normalization
    - Relationship design
    - Index strategy
    - Data type selection

2. **Query Performance (25%)**

    - Efficient data retrieval
    - Sorting and filtering optimization
    - Join optimization
    - Index usage

3. **Feature Coverage (20%)**

    - Meeting all requirements
    - Edge case handling
    - Flexibility for future changes
    - Admin UI support

4. **Documentation (15%)**
    - Clear explanations
    - Design justification
    - Query examples
    - Assumptions and limitations

## Additional Considerations

-   Think about scaling to hundreds of providers and thousands of regions
-   Plan for future provider additions
-   Consider caching strategies for frequently accessed data

## Submission Format

Please provide your solution in a markdown file containing:

```markdown
# AV Provider Database Solution

## Schema Design

[Your SQL schema here]

## Design Decisions

[Explanation of your design choices]

## Query Examples

[Example SQL queries]

## Performance Considerations

[How your solution handles scale]

## Assumptions and Limitations

[Any assumptions or limitations of your design]
```

## Time Limit

-   Take up to 4 hours to complete this assessment
-   Focus on design quality over completeness

Good luck!
