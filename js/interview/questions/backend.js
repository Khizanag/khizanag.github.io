var QUESTION_BANK_BACKEND = [
  {
    "topic": "api-design",
    "level": 0,
    "question": "What is REST and what are its core principles?",
    "hint": "Think about statelessness, resources, and uniform interface.",
    "answer": "REST (Representational State Transfer) is an architectural style for designing networked APIs. Its core principles are:\n- Client-server separation\n- Statelessness — each request contains all information needed to process it\n- Uniform interface — resources are identified by URIs, manipulated via standard HTTP methods (GET, POST, PUT, DELETE)\n- Cacheability — responses should declare whether they are cacheable\n- Layered system — clients cannot tell whether they are connected directly to the server or through intermediaries"
  },
  {
    "topic": "api-design",
    "level": 1,
    "question": "What are the differences between GraphQL and REST? When would you choose one over the other?",
    "hint": "Think about data fetching flexibility, over-fetching, and schema definition.",
    "answer": "REST exposes fixed endpoints that return predefined data shapes, while GraphQL provides a single endpoint where the client specifies exactly which fields it needs.\n- REST can lead to over-fetching (getting more data than needed) or under-fetching (requiring multiple requests). GraphQL solves this by letting clients request only the fields they need in one query.\n- REST is simpler to cache (HTTP caching works naturally with URLs), while GraphQL caching is more complex.\n- Choose REST for simple CRUD APIs with well-defined resources. Choose GraphQL when clients have diverse data needs or when you want to reduce the number of round trips."
  },
  {
    "topic": "api-design",
    "level": 2,
    "question": "What are common strategies for API versioning and what are the trade-offs?",
    "hint": "Consider URI path, query parameters, and headers as versioning mechanisms.",
    "answer": "Common API versioning strategies:\n- URI path versioning (/api/v1/users) — simple and explicit, but clutters the URL and breaks REST principle that a URI should identify a resource, not a version.\n- Query parameter (?version=1) — keeps URIs clean but easy to miss.\n- Header versioning (Accept: application/vnd.api.v1+json) — cleanest from a REST perspective, but harder to test in a browser.\n- Content negotiation — uses the Accept header to specify both format and version.\nMost teams choose URI path versioning for simplicity. Whichever you choose, have a clear deprecation policy and communicate changes to consumers."
  },
  {
    "topic": "api-design",
    "level": 3,
    "question": "How would you design a paginated API? Compare cursor-based and offset-based pagination.",
    "hint": "Think about performance with large datasets and what happens when data changes between requests.",
    "answer": "Offset-based pagination uses page number and size (e.g., ?page=3&size=20). It is simple to implement but suffers from issues with large offsets (the database must skip N rows) and can produce duplicate or missing items if data is inserted or deleted between requests.\n\nCursor-based pagination uses an opaque cursor (e.g., ?cursor=abc123&limit=20) pointing to the last item returned. It provides stable results regardless of concurrent inserts/deletes and performs consistently because it seeks rather than skips. However, it does not support jumping to arbitrary pages.\n\nCursor-based is preferred for real-time or large datasets. Offset-based is acceptable for small, relatively static datasets where random page access is needed."
  },
  {
    "topic": "api-design",
    "level": 4,
    "question": "How would you design and implement rate limiting for a public API?",
    "hint": "Think about algorithms like token bucket and sliding window, and how to communicate limits to clients.",
    "answer": "Common rate limiting algorithms:\n- Token bucket — tokens are added at a fixed rate; each request consumes a token. Allows short bursts while enforcing an average rate.\n- Sliding window — tracks requests within a rolling time window, providing smoother throttling than fixed windows.\n- Fixed window — simple but can allow bursts at window boundaries.\n\nImplementation considerations: use a fast store like Redis to track counters per client (identified by API key or IP). Return rate limit info in response headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset). Return HTTP 429 Too Many Requests when the limit is exceeded, with a Retry-After header.\n\nFor distributed systems, use a centralized store or a distributed rate limiter to ensure consistent enforcement across instances."
  },
  {
    "topic": "databases",
    "level": 0,
    "question": "What is the difference between SQL and NoSQL databases? Give examples of each.",
    "hint": "Think about data structure, schema enforcement, and scalability models.",
    "answer": "SQL databases (PostgreSQL, MySQL) store data in structured tables with predefined schemas, enforce relationships via foreign keys, and use SQL for querying. They excel at complex queries, joins, and transactions with ACID guarantees.\n\nNoSQL databases come in several types:\n- Document stores (MongoDB) — flexible JSON-like documents\n- Key-value stores (Redis) — fast lookups by key\n- Column-family (Cassandra) — optimized for write-heavy workloads\n- Graph databases (Neo4j) — optimized for relationship traversal\n\nSQL suits structured data with complex relationships. NoSQL suits unstructured or semi-structured data, high write throughput, or horizontal scaling needs."
  },
  {
    "topic": "databases",
    "level": 0,
    "question": "What is a database index and why is it important?",
    "hint": "Think about how a book's index helps you find content without reading every page.",
    "answer": "A database index is a data structure (typically a B-tree or hash table) that speeds up data retrieval by allowing the database to find rows without scanning the entire table. Without an index, the database performs a full table scan, which is slow on large datasets.\n\nIndexes are created on columns frequently used in WHERE clauses, JOIN conditions, and ORDER BY clauses. However, indexes come with trade-offs: they consume additional disk space and slow down INSERT/UPDATE/DELETE operations because the index must also be updated. Choose indexes based on your query patterns rather than indexing every column."
  },
  {
    "topic": "databases",
    "level": 1,
    "question": "What is database normalization? Explain the first three normal forms.",
    "hint": "Think about reducing data redundancy by organizing columns and tables.",
    "answer": "Normalization is the process of organizing a database to reduce redundancy and improve data integrity.\n\n- First Normal Form (1NF): Each column contains atomic (indivisible) values, and each row is unique. No repeating groups or arrays in a single column.\n- Second Normal Form (2NF): Meets 1NF, and every non-key column depends on the entire primary key (not just part of it). Relevant when using composite keys.\n- Third Normal Form (3NF): Meets 2NF, and no non-key column depends on another non-key column (no transitive dependencies).\n\nHigher normalization reduces redundancy but can increase the number of joins needed for queries. In practice, some denormalization is common for read-heavy workloads."
  },
  {
    "topic": "databases",
    "level": 2,
    "question": "What are ACID properties in database transactions?",
    "hint": "Think about what guarantees a database must provide for reliable transactions.",
    "answer": "ACID stands for:\n- Atomicity: A transaction is all-or-nothing. If any part fails, the entire transaction is rolled back.\n- Consistency: A transaction moves the database from one valid state to another, enforcing all constraints and rules.\n- Isolation: Concurrent transactions do not interfere with each other. Each transaction behaves as if it is the only one running (depending on isolation level).\n- Durability: Once a transaction is committed, the changes persist even if the system crashes.\n\nACID properties are fundamental to relational databases and critical for financial, inventory, and other systems where data integrity is paramount."
  },
  {
    "topic": "databases",
    "level": 3,
    "question": "What is database sharding and what are its challenges?",
    "hint": "Think about splitting a large dataset across multiple database instances.",
    "answer": "Sharding is horizontally partitioning data across multiple database instances (shards), where each shard holds a subset of the data. A shard key determines which shard stores a given record.\n\nChallenges include:\n- Choosing the right shard key — a poor choice leads to hotspots where one shard receives disproportionate traffic.\n- Cross-shard queries and joins become complex and slow.\n- Resharding (adding/removing shards) requires data migration, which is operationally difficult.\n- Maintaining transactions across shards is hard; distributed transactions add latency.\n\nSharding is typically a last resort after vertical scaling, read replicas, and caching have been exhausted."
  },
  {
    "topic": "databases",
    "level": 4,
    "question": "What is database replication and what are the differences between synchronous and asynchronous replication?",
    "hint": "Consider the trade-offs between data consistency and write latency.",
    "answer": "Database replication copies data from a primary (leader) database to one or more replicas (followers) for redundancy and read scaling.\n\n- Synchronous replication: The primary waits for at least one replica to confirm the write before acknowledging it to the client. Guarantees no data loss on primary failure but increases write latency.\n- Asynchronous replication: The primary acknowledges the write immediately and replicates in the background. Lower latency but risks data loss if the primary fails before replication completes.\n- Semi-synchronous: A hybrid where one replica is synchronous and others are asynchronous.\n\nReplication also introduces replication lag, where replicas may serve stale reads. Choosing the right strategy depends on your consistency and availability requirements."
  },
  {
    "topic": "databases",
    "level": 5,
    "question": "Explain the CAP theorem and how it applies to distributed database design decisions.",
    "hint": "Think about the fundamental trade-offs between consistency, availability, and partition tolerance.",
    "answer": "The CAP theorem states that a distributed system can guarantee at most two of three properties:\n- Consistency: Every read returns the most recent write.\n- Availability: Every request receives a response (not necessarily the most recent data).\n- Partition tolerance: The system continues to operate despite network partitions between nodes.\n\nSince network partitions are unavoidable in distributed systems, the real choice is between CP (consistency + partition tolerance, e.g., HBase, MongoDB with majority reads) and AP (availability + partition tolerance, e.g., Cassandra, DynamoDB).\n\nIn practice, many systems offer tunable consistency — for example, Cassandra allows per-query consistency levels (ONE, QUORUM, ALL), letting you make CP or AP trade-offs on a per-operation basis."
  },
  {
    "topic": "be-auth",
    "level": 1,
    "question": "What is a JWT (JSON Web Token) and how does it work for authentication?",
    "hint": "Think about a self-contained token with three parts that can be verified without a database lookup.",
    "answer": "A JWT is a compact, self-contained token consisting of three Base64URL-encoded parts separated by dots: header.payload.signature.\n- Header: specifies the signing algorithm (e.g., HS256, RS256).\n- Payload: contains claims — user identity, roles, expiration time, and other metadata.\n- Signature: created by signing the header and payload with a secret key, ensuring the token has not been tampered with.\n\nThe server issues a JWT after successful login. The client sends it in the Authorization header on subsequent requests. The server verifies the signature without needing a database lookup, making JWTs stateless and scalable. The main drawback is that JWTs cannot be revoked before expiration without additional infrastructure like a token blocklist."
  },
  {
    "topic": "be-auth",
    "level": 2,
    "question": "Explain the OAuth 2.0 authorization code flow. When is it used?",
    "hint": "Think about the flow where a user authorizes a third-party app via a redirect to the identity provider.",
    "answer": "The OAuth 2.0 authorization code flow is used when a server-side application needs to access resources on behalf of a user:\n1. The client redirects the user to the authorization server's login page.\n2. The user authenticates and grants consent.\n3. The authorization server redirects back to the client with a short-lived authorization code.\n4. The client exchanges the code (plus its client secret) for an access token (and optionally a refresh token) via a back-channel request.\n5. The client uses the access token to call the resource API.\n\nThis flow is preferred for server-side apps because the access token never passes through the browser. For public clients (SPAs, mobile apps), PKCE (Proof Key for Code Exchange) is added to prevent authorization code interception."
  },
  {
    "topic": "be-auth",
    "level": 3,
    "question": "Compare session-based authentication with token-based authentication. What are the trade-offs?",
    "hint": "Think about where the session state lives — server-side vs. client-side.",
    "answer": "Session-based authentication stores session state on the server (in memory, database, or Redis). The client holds a session ID in a cookie. The server looks up the session on each request.\n- Pros: Easy to revoke sessions instantly, smaller cookie size.\n- Cons: Requires server-side storage, harder to scale horizontally (need shared session store or sticky sessions).\n\nToken-based authentication (e.g., JWT) stores state in the token itself. The server is stateless.\n- Pros: No server-side storage needed, scales horizontally easily, works well across domains and services.\n- Cons: Cannot be revoked before expiration without a blocklist, tokens can be larger than session cookies.\n\nSession-based suits monolithic apps. Token-based suits microservices and APIs consumed by multiple clients."
  },
  {
    "topic": "be-auth",
    "level": 4,
    "question": "How would you implement Role-Based Access Control (RBAC) in a backend system?",
    "hint": "Think about roles, permissions, and how to enforce them at the API layer.",
    "answer": "RBAC assigns permissions to roles, and roles to users. A typical data model includes: users, roles, permissions, user_roles (mapping), and role_permissions (mapping).\n\nImplementation approach:\n1. Define granular permissions (e.g., read:orders, write:orders, delete:users).\n2. Group permissions into roles (e.g., admin, editor, viewer).\n3. Assign roles to users.\n4. Enforce permissions via middleware that checks whether the authenticated user's roles include the required permission for the requested endpoint.\n\nBest practices: follow the principle of least privilege, support multiple roles per user, cache role-permission mappings for performance, and audit permission checks. For complex hierarchies, consider Attribute-Based Access Control (ABAC) which evaluates policies based on user attributes, resource attributes, and context."
  },
  {
    "topic": "caching",
    "level": 2,
    "question": "What is Redis and what are its common use cases in backend systems?",
    "hint": "Think beyond simple key-value caching — Redis supports multiple data structures.",
    "answer": "Redis is an in-memory data store that supports various data structures: strings, hashes, lists, sets, sorted sets, streams, and more.\n\nCommon use cases:\n- Caching: Store frequently accessed data (database query results, API responses) to reduce latency and database load.\n- Session storage: Fast read/write for user sessions across multiple application instances.\n- Rate limiting: Use atomic counters with expiration to track request counts per client.\n- Pub/Sub messaging: Lightweight message passing between services.\n- Leaderboards and counters: Sorted sets for ranking, atomic increments for counters.\n- Distributed locks: Coordinate access to shared resources across services.\n\nRedis is single-threaded for commands, ensuring atomicity. It offers optional persistence via RDB snapshots and AOF logs."
  },
  {
    "topic": "caching",
    "level": 3,
    "question": "What are common cache invalidation strategies and their trade-offs?",
    "hint": "Think about when and how cached data should be updated or removed.",
    "answer": "Cache invalidation strategies:\n- TTL (Time-To-Live): Cached data expires after a set duration. Simple but can serve stale data until expiry.\n- Write-through: Data is written to both cache and database simultaneously. Ensures consistency but adds write latency.\n- Write-behind (write-back): Data is written to cache first, then asynchronously persisted to the database. Fast writes but risks data loss if the cache fails before persistence.\n- Cache-aside (lazy loading): The application reads from cache first; on a miss, it reads from the database and populates the cache. Simple but the first request after expiry is always slow.\n- Event-driven invalidation: Database changes trigger cache invalidation via events or change data capture. Near real-time consistency but adds infrastructure complexity.\n\nIn practice, most systems combine TTL with event-driven invalidation for a balance of simplicity and freshness."
  },
  {
    "topic": "caching",
    "level": 4,
    "question": "What are the challenges of distributed caching and how do you address them?",
    "hint": "Think about consistency across nodes, cache stampedes, and hot keys.",
    "answer": "Key challenges of distributed caching:\n- Consistency: Multiple cache nodes may hold stale or conflicting data. Use consistent hashing for key distribution and event-driven invalidation.\n- Cache stampede: When a popular key expires, many concurrent requests hit the database simultaneously. Mitigate with lock-based recomputation (only one request rebuilds the cache) or staggered TTLs.\n- Hot keys: A single key receiving disproportionate traffic can overload one cache node. Replicate hot keys across multiple nodes or add a local in-process cache.\n- Node failures: A node going down causes cache misses for its keys. Use consistent hashing with virtual nodes to minimize redistribution, and replicate critical data.\n- Memory management: Monitor eviction rates and memory usage. Use appropriate eviction policies (LRU, LFU) based on access patterns."
  },
  {
    "topic": "messaging",
    "level": 2,
    "question": "What is event-driven architecture and when should you use it?",
    "hint": "Think about decoupling services by communicating through events rather than direct calls.",
    "answer": "Event-driven architecture is a design pattern where services communicate by producing and consuming events (messages representing state changes) rather than making synchronous calls to each other.\n\nKey components: event producers emit events, a message broker (Kafka, RabbitMQ, SQS) delivers them, and event consumers process them independently.\n\nBenefits: loose coupling between services, natural scalability (add more consumers), resilience (failures in one service do not cascade), and an audit trail of events.\n\nUse it when:\n- You need to decouple services that would otherwise create tight dependencies.\n- You need to process work asynchronously (emails, notifications, data pipelines).\n- Multiple services need to react to the same event.\n\nAvoid it for simple CRUD apps or when strong consistency and immediate responses are required, as it adds complexity and eventual consistency."
  },
  {
    "topic": "messaging",
    "level": 3,
    "question": "Explain the publish/subscribe pattern and how it differs from a traditional message queue.",
    "hint": "Think about whether a message goes to one consumer or to all subscribers.",
    "answer": "In a message queue (point-to-point), a message is consumed by exactly one consumer. Multiple consumers compete for messages, providing load balancing. Once consumed, the message is removed from the queue.\n\nIn publish/subscribe (pub/sub), a message is broadcast to all subscribers of a topic. Each subscriber receives its own copy of every message. Adding new subscribers does not affect existing ones.\n\nKey differences:\n- Queue: one-to-one delivery, work distribution. Pub/Sub: one-to-many delivery, event notification.\n- Queue: consumer competes for messages. Pub/Sub: each subscriber gets all messages independently.\n\nMany modern brokers support both patterns. Kafka uses consumer groups to combine them — within a group, messages are load-balanced (queue behavior); across groups, each group gets all messages (pub/sub behavior)."
  },
  {
    "topic": "messaging",
    "level": 4,
    "question": "What is a dead letter queue and why is it important?",
    "hint": "Think about what happens to messages that cannot be processed successfully.",
    "answer": "A dead letter queue (DLQ) is a separate queue where messages are sent after they fail processing a specified number of times. Instead of retrying indefinitely or losing the message, the system moves it to the DLQ for later inspection.\n\nDLQs are important because:\n- They prevent poison messages (messages that always fail) from blocking the main queue and stalling all consumers.\n- They preserve failed messages for debugging and root cause analysis.\n- They allow operators to inspect failures, fix the underlying issue, and replay messages back into the main queue.\n\nBest practices: set an appropriate max retry count before moving to the DLQ, monitor DLQ depth with alerts, include failure metadata (error reason, timestamp, retry count) with each dead-lettered message, and implement a replay mechanism for reprocessing."
  },
  {
    "topic": "be-system-design",
    "level": 1,
    "question": "What is a load balancer and what are common load balancing algorithms?",
    "hint": "Think about distributing incoming requests across multiple servers.",
    "answer": "A load balancer distributes incoming network traffic across multiple backend servers to ensure no single server is overwhelmed, improving availability and reliability.\n\nCommon algorithms:\n- Round Robin: Requests are distributed sequentially to each server in turn. Simple but ignores server capacity.\n- Weighted Round Robin: Assigns more requests to more powerful servers based on configured weights.\n- Least Connections: Sends requests to the server with the fewest active connections.\n- IP Hash: Routes requests from the same client IP to the same server (useful for session affinity).\n\nLoad balancers operate at Layer 4 (TCP/UDP, faster) or Layer 7 (HTTP, can make content-based routing decisions). They also perform health checks to stop sending traffic to unhealthy servers."
  },
  {
    "topic": "be-system-design",
    "level": 2,
    "question": "What are microservices and what are their advantages and disadvantages compared to a monolith?",
    "hint": "Think about independently deployable services versus a single unified application.",
    "answer": "Microservices architecture decomposes an application into small, independently deployable services, each owning its own data and business logic. A monolith is a single deployable unit containing all functionality.\n\nAdvantages of microservices:\n- Independent deployment and scaling of individual services.\n- Technology diversity — each service can use the best tool for its job.\n- Fault isolation — a failure in one service does not bring down the entire system.\n- Team autonomy — small teams own individual services end-to-end.\n\nDisadvantages:\n- Distributed system complexity (network failures, latency, debugging).\n- Data consistency is harder without shared transactions.\n- Operational overhead (more deployments, monitoring, service discovery).\n- Start with a monolith and extract services as boundaries become clear — premature microservices are a common mistake."
  },
  {
    "topic": "be-system-design",
    "level": 3,
    "question": "What are the key challenges of distributed systems?",
    "hint": "Think about network unreliability, partial failures, and clock synchronization.",
    "answer": "Key challenges of distributed systems:\n- Network is unreliable: Messages can be lost, delayed, duplicated, or delivered out of order. Design for retries, idempotency, and timeouts.\n- Partial failures: Some nodes may fail while others continue operating. The system must detect failures (via heartbeats/health checks) and degrade gracefully.\n- No global clock: Clocks on different nodes drift. Coordinating time-dependent operations requires logical clocks (Lamport timestamps, vector clocks) or centralized time services.\n- Consistency vs. availability: The CAP theorem forces trade-offs. Achieving strong consistency requires coordination that reduces availability.\n- Split brain: Network partitions can cause two parts of the system to operate independently and diverge. Consensus protocols (Raft, Paxos) help elect leaders and maintain agreement."
  },
  {
    "topic": "be-system-design",
    "level": 3,
    "question": "What are eventual consistency and strong consistency? When would you choose each?",
    "hint": "Think about the trade-off between read freshness and system availability/latency.",
    "answer": "Strong consistency guarantees that any read returns the result of the most recent write. All clients see the same data at the same time. It requires coordination between nodes (consensus), which adds latency and reduces availability during partitions.\n\nEventual consistency guarantees that if no new updates are made, all replicas will eventually converge to the same value. Reads may return stale data temporarily. It offers higher availability and lower latency.\n\nChoose strong consistency for financial transactions, inventory counts, and anywhere incorrect data causes serious business impact. Choose eventual consistency for social media feeds, analytics, caches, and systems where brief staleness is acceptable. Many systems mix both — for example, an e-commerce app may use strong consistency for order placement but eventual consistency for product review counts."
  },
  {
    "topic": "be-system-design",
    "level": 4,
    "question": "What is the circuit breaker pattern and how does it improve system resilience?",
    "hint": "Think about preventing cascading failures when a downstream service is unhealthy.",
    "answer": "The circuit breaker pattern prevents an application from repeatedly calling a failing downstream service, avoiding cascading failures and allowing the failing service time to recover.\n\nIt has three states:\n- Closed (normal): Requests pass through. Failures are counted. If the failure rate exceeds a threshold, the circuit opens.\n- Open: Requests are immediately rejected (or a fallback is returned) without calling the downstream service. After a timeout period, the circuit transitions to half-open.\n- Half-open: A limited number of test requests are allowed through. If they succeed, the circuit closes. If they fail, it reopens.\n\nBenefits: prevents resource exhaustion from waiting on unresponsive services, provides fast failure instead of slow timeouts, gives the failing service time to recover, and can return cached or default responses during outages."
  },
  {
    "topic": "be-system-design",
    "level": 5,
    "question": "What is CQRS (Command Query Responsibility Segregation) and when is it appropriate?",
    "hint": "Think about using separate models for reading and writing data.",
    "answer": "CQRS separates the write model (commands) from the read model (queries) into distinct paths, potentially with different data stores optimized for each.\n\nThe write side handles commands (create, update, delete) and enforces business rules and validation. The read side serves queries from a denormalized, read-optimized store that is updated asynchronously from the write side via events.\n\nWhen to use CQRS:\n- Read and write workloads have vastly different scaling needs.\n- The read model needs different structure or storage than the write model (e.g., search index, materialized views).\n- Combined with Event Sourcing, where the write side stores events and the read side builds projections.\n\nCQRS adds significant complexity (eventual consistency between read and write models, synchronization logic) and should only be applied to parts of the system that genuinely benefit from it. Most CRUD-heavy domains do not need CQRS."
  },
  {
    "topic": "be-security",
    "level": 1,
    "question": "What is the difference between symmetric and asymmetric encryption?",
    "hint": "Think about how many keys are involved and who holds them.",
    "answer": "Symmetric encryption uses a single shared key for both encryption and decryption (e.g., AES). It is fast and efficient for encrypting large amounts of data, but the key must be securely shared between parties.\n\nAsymmetric encryption uses a key pair — a public key for encryption and a private key for decryption (e.g., RSA, ECDSA). Anyone can encrypt with the public key, but only the private key holder can decrypt. It is slower but solves the key distribution problem.\n\nIn practice, they are combined: TLS uses asymmetric encryption to securely exchange a symmetric session key, then uses that symmetric key for fast bulk data encryption. Asymmetric encryption is also used for digital signatures — sign with the private key, verify with the public key."
  },
  {
    "topic": "be-security",
    "level": 2,
    "question": "What is SQL injection and how do you prevent it?",
    "hint": "Think about what happens when user input is directly concatenated into SQL queries.",
    "answer": "SQL injection occurs when an attacker inserts malicious SQL code through user input that is directly concatenated into a query. For example, inputting ' OR 1=1 -- as a username could bypass authentication by making the WHERE clause always true.\n\nPrevention methods:\n- Parameterized queries (prepared statements): The database treats user input as data, never as executable SQL. This is the primary defense.\n- ORM usage: Most ORMs generate parameterized queries by default.\n- Input validation: Reject unexpected characters, but never rely on this alone.\n- Least privilege: The database user should have only the permissions the application needs — never use a root or admin account.\n- Stored procedures can help if they use parameterized inputs internally."
  },
  {
    "topic": "be-security",
    "level": 3,
    "question": "How does TLS/HTTPS work and why is it important?",
    "hint": "Think about the handshake process that establishes a secure connection.",
    "answer": "TLS (Transport Layer Security) encrypts communication between client and server. HTTPS is HTTP over TLS.\n\nThe TLS handshake:\n1. Client sends a ClientHello with supported cipher suites and a random number.\n2. Server responds with a ServerHello, its certificate (containing its public key), and a random number.\n3. Client verifies the server's certificate against trusted certificate authorities.\n4. Client and server use key exchange (e.g., Diffie-Hellman) to derive a shared symmetric session key.\n5. All subsequent communication is encrypted with this session key.\n\nTLS provides: confidentiality (encryption prevents eavesdropping), integrity (message authentication codes detect tampering), and authentication (certificates verify server identity). It is essential for protecting credentials, personal data, and API tokens in transit."
  },
  {
    "topic": "be-testing",
    "level": 1,
    "question": "What is integration testing and how does it differ from unit testing?",
    "hint": "Think about the scope of what is being tested — isolated units vs. components working together.",
    "answer": "Unit tests verify individual functions or classes in isolation, using mocks or stubs for dependencies. They are fast, numerous, and pinpoint exactly where a failure occurs.\n\nIntegration tests verify that multiple components work correctly together — for example, testing that a service correctly reads from and writes to a real database, or that two services communicate properly via an API.\n\nKey differences:\n- Scope: Unit tests isolate a single unit. Integration tests exercise real interactions between components.\n- Speed: Unit tests are fast (milliseconds). Integration tests are slower because they involve real infrastructure.\n- Failure diagnosis: Unit test failures are easy to localize. Integration test failures may require investigating multiple components.\n\nA healthy test suite has many unit tests, a moderate number of integration tests, and a few end-to-end tests (the test pyramid)."
  },
  {
    "topic": "be-testing",
    "level": 2,
    "question": "What is contract testing and why is it useful in a microservices environment?",
    "hint": "Think about ensuring that a service's API matches what its consumers expect.",
    "answer": "Contract testing verifies that the interface (contract) between a consumer and a provider is maintained. The consumer defines its expectations (e.g., request format and expected response fields), and these expectations are verified against the provider.\n\nTools like Pact implement consumer-driven contracts: the consumer generates a contract file describing its expectations, and this contract is run against the provider to verify compatibility.\n\nWhy it is useful in microservices:\n- Catches breaking API changes before deployment, without requiring a full integration environment.\n- Each team can test independently — the consumer and provider do not need to be running simultaneously.\n- Faster feedback than end-to-end tests, which require deploying all services.\n- Prevents the common failure mode where a provider makes a change that breaks an unknown consumer."
  },
  {
    "topic": "be-testing",
    "level": 3,
    "question": "What is load testing and how do you approach it?",
    "hint": "Think about simulating realistic traffic to find performance limits and bottlenecks.",
    "answer": "Load testing simulates concurrent users or requests to measure system performance under expected and peak loads. The goal is to find bottlenecks, determine maximum throughput, and verify that response times remain acceptable.\n\nApproach:\n1. Define objectives: target throughput (requests per second), acceptable response time (p95 latency), and error rate thresholds.\n2. Create realistic scenarios that mirror production traffic patterns (mix of endpoints, think time, data variety).\n3. Start with a baseline test, then ramp up gradually to find the breaking point.\n4. Monitor key metrics: CPU, memory, database connections, response times, error rates, and queue depths.\n5. Identify and address bottlenecks iteratively.\n\nCommon tools: k6, Gatling, JMeter, Locust. Run load tests in an environment that mirrors production and test regularly, not just before launch."
  },
  {
    "topic": "devops",
    "level": 1,
    "question": "What is Docker and why is it useful for backend development?",
    "hint": "Think about packaging an application with all its dependencies into a portable unit.",
    "answer": "Docker is a platform for building, shipping, and running applications in containers. A container packages an application with its runtime, libraries, and dependencies into a lightweight, isolated unit that runs consistently across environments.\n\nKey concepts:\n- Dockerfile: A script defining how to build a container image (base image, dependencies, application code, startup command).\n- Image: An immutable snapshot built from a Dockerfile.\n- Container: A running instance of an image.\n\nBenefits for backend development:\n- Eliminates \"works on my machine\" problems — the same image runs identically in development, CI, and production.\n- Fast onboarding — new developers run one command to spin up the entire stack.\n- Isolation — each service runs in its own container with its own dependencies.\n- Reproducibility — builds are deterministic from the Dockerfile."
  },
  {
    "topic": "devops",
    "level": 2,
    "question": "What is Kubernetes and what problems does it solve?",
    "hint": "Think about managing, scaling, and orchestrating containerized applications across multiple machines.",
    "answer": "Kubernetes (K8s) is a container orchestration platform that automates the deployment, scaling, and management of containerized applications across a cluster of machines.\n\nKey problems it solves:\n- Scheduling: Decides which node should run each container based on resource requirements and availability.\n- Scaling: Automatically scales containers up or down based on CPU, memory, or custom metrics (Horizontal Pod Autoscaler).\n- Self-healing: Restarts failed containers, replaces unresponsive nodes, and kills containers that fail health checks.\n- Service discovery and load balancing: Provides DNS names and distributes traffic across container replicas.\n- Rolling updates and rollbacks: Deploys new versions with zero downtime and can automatically roll back on failure.\n\nCore abstractions: Pods (smallest deployable unit), Deployments (desired state for replicas), Services (stable network endpoint), and ConfigMaps/Secrets (configuration management)."
  },
  {
    "topic": "devops",
    "level": 3,
    "question": "What is CI/CD and what are the key components of a good pipeline?",
    "hint": "Think about automating the path from code commit to production deployment.",
    "answer": "CI (Continuous Integration) automatically builds and tests code on every commit. CD (Continuous Delivery) extends this to automatically prepare releases for deployment. Continuous Deployment goes further by deploying automatically to production.\n\nKey components of a good pipeline:\n1. Source control trigger: Pipeline runs on every push or pull request.\n2. Build: Compile code, resolve dependencies, produce artifacts.\n3. Automated tests: Unit tests, integration tests, security scans, linting.\n4. Artifact storage: Store built images or packages in a registry.\n5. Staging deployment: Deploy to a staging environment for further validation.\n6. Production deployment: Automated or one-click deploy with rollback capability.\n\nBest practices: keep the pipeline fast (under 10 minutes for CI), fail fast (run quick checks first), use infrastructure as code for environments, implement feature flags for decoupling deployment from release, and monitor deployments with automated health checks."
  },
  {
    "topic": "devops",
    "level": 4,
    "question": "What are the key metrics and practices for effective production monitoring?",
    "hint": "Think about the four golden signals and observability pillars.",
    "answer": "The four golden signals (from Google's SRE book):\n- Latency: Time to serve a request. Track both successful and failed request latency.\n- Traffic: Demand on the system (requests per second, concurrent users).\n- Errors: Rate of failed requests (HTTP 5xx, application errors).\n- Saturation: How full the system is (CPU, memory, disk, connection pool usage).\n\nThe three pillars of observability:\n- Metrics: Numerical measurements over time (Prometheus, Datadog). Use for dashboards and alerting.\n- Logs: Discrete events with context (ELK stack, CloudWatch). Use structured logging (JSON) for easy querying.\n- Traces: End-to-end request paths across services (Jaeger, Zipkin). Essential for debugging latency in microservices.\n\nBest practices: set up alerts on symptoms (not causes), define SLIs/SLOs, use dashboards for at-a-glance health, and practice runbook-driven incident response."
  },
  {
    "topic": "be-performance",
    "level": 2,
    "question": "What is the N+1 query problem and how do you fix it?",
    "hint": "Think about what happens when you load a list and then query for each item's related data individually.",
    "answer": "The N+1 query problem occurs when code loads a list of N items (1 query) and then executes a separate query for each item's related data (N queries), resulting in N+1 total queries.\n\nExample: Loading 100 orders, then querying each order's customer individually — 1 query for orders + 100 queries for customers = 101 queries.\n\nFixes:\n- Eager loading / JOIN: Fetch the related data in the initial query using a JOIN (e.g., SELECT * FROM orders JOIN customers).\n- Batch loading: Collect all needed IDs, then fetch related data in one query (e.g., WHERE customer_id IN (...)).\n- DataLoader pattern: Batches and deduplicates individual lookups within a request cycle, commonly used with GraphQL.\n\nDetection: Enable query logging in development, use ORM tools that warn about N+1 patterns, or monitor slow endpoints for excessive query counts."
  },
  {
    "topic": "be-performance",
    "level": 3,
    "question": "What is connection pooling and why is it important for backend performance?",
    "hint": "Think about the cost of establishing a new database connection for every request.",
    "answer": "Connection pooling maintains a pool of reusable database connections rather than creating and destroying a connection for each request. Establishing a database connection is expensive — it involves TCP handshake, authentication, and memory allocation on the database server.\n\nWith a connection pool, when a request needs a database connection, it borrows one from the pool. When done, it returns the connection to the pool instead of closing it. This dramatically reduces latency and resource consumption.\n\nKey configuration parameters:\n- Minimum pool size: Connections kept open even when idle.\n- Maximum pool size: Upper limit to prevent overwhelming the database.\n- Connection timeout: How long to wait for a connection before failing.\n- Idle timeout: How long an unused connection stays in the pool.\n\nIf the pool is exhausted, requests queue up or fail. Monitor pool utilization to size it correctly — typically set the max slightly below the database's max connections divided by the number of application instances."
  }
];
