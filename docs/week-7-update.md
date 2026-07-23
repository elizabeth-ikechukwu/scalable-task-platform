# Week 7: PostgreSQL on AWS RDS

## What We Built

This week we migrated TaskFlow from in-memory task storage to a real PostgreSQL 16 database running on AWS RDS. This is the foundation that makes TaskFlow production-grade -- data now persists across deployments, restarts, and container replacements.

## Why This Matters

Before this week, tasks were stored in a JavaScript array inside the running container. Every time the container restarted, all data was lost. That is not a real application. A production system needs a database that lives independently of the application layer -- one that survives container crashes, deployments, and scaling events.

RDS gives us a managed PostgreSQL instance that we never have to patch, back up manually, or worry about disk space on. AWS handles that. We own the schema and the queries.

## Infrastructure Decisions

### RDS in a Private Subnet

The RDS instance sits in a private subnet with no public IP address and no internet gateway route. The only thing that can reach it is the backend container, through a security group rule scoped specifically to the backend security group. No external tool, no developer laptop, and no attacker on the internet can connect to the database directly.

This is the correct production pattern. Databases should never be publicly accessible.

### Two Availability Zones

The DB subnet group spans two private subnets in two separate availability zones. AWS requires at least two AZs for RDS subnet groups. This also means that if one AZ experiences an outage, the database can fail over to the second AZ automatically.

### PostgreSQL 16 Parameter Group

We created a custom DB parameter group for PostgreSQL 16. This gives us control over database-level configuration without modifying the default AWS parameter group, which cannot be edited.

### SSL Required

RDS requires SSL connections by default. The backend connects with DB_SSL=true which tells the PostgreSQL client to enforce an encrypted connection between the application and the database. Plain text database connections are not acceptable in production.

### Credentials Never Hardcoded

Database credentials are passed through Terraform variables and GitHub Secrets. They are never written into any file in the repository. The Terraform state file is stored in S3 with server-side encryption.

## Database Schema

The backend initializes four tables on startup if they do not already exist:

```sql
users         -- id, name, email, password_hash, created_at
tasks         -- id, user_id, title, completed, created_at
projects      -- id, user_id, name, description, created_at
team_members  -- id, team_name, user_id, created_at
```

All queries use parameterized inputs to prevent SQL injection.

## What Changed in the Backend

- Replaced in-memory task array with real PostgreSQL queries using the pg npm package
- Added connection pooling via pg.Pool
- Added initDb() function that runs on startup to create tables with IF NOT EXISTS
- All task routes now scope queries to the authenticated user via user_id

## Architecture After Week 7

```
Internet
    |
Nginx (port 80)
    |
Node.js Backend (port 3000)
    |
RDS PostgreSQL 16 (private subnet, port 5432)
```

## Key Learning

A database in a public subnet with a public IP is not a production database. It is a liability. Putting RDS in a private subnet, requiring SSL, and restricting access via security groups is the minimum standard for any system handling real user data.

## What is Next

Week 8 adds JWT authentication so tasks and data are scoped to individual users, AWS SSM Parameter Store to move all secrets out of GitHub and into encrypted AWS storage, and a complete frontend overhaul with React and Tailwind CSS.
