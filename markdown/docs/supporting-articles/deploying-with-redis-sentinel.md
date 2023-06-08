# Deploying with Redis Sentinel
The default deployment of jambonz uses a standalone Redis server to cache information such call data, tts prompts, the currently-active set of servers for sip, rtp, or feature server functionality, etc.  However (as of jambonz 0.8.3-4), it is also possible to use [Redis Sentinel](https://Redis.io/docs/management/sentinel/), which provides an HA Redis solution.

A Redis Sentinel cluster consists of Redis instances playing these roles:

- **Master**: This is the primary Redis instance in a master-slave configuration. It handles all write operations and can also handle read operations. Changes made to the data on the master are propagated to its slave instances.
- **Slave**: This is a replica of the master instance. A slave will connect to the master and replicate the entire dataset from the master. By default, slaves are read-only. They are typically used to scale read operations or to provide redundancy. If the master fails, a slave can be promoted to master.
- **Sentinel**: Redis Sentinel is a system designed to help manage Redis instances. It provides several capabilities such as monitoring, notifications, and automatic failover. Sentinel instances communicate with each other and agree on which Redis instances are master and which are slaves, monitor for failures, and handle automatic failover by promoting a slave to master if the master goes down.

It's recommended to have at least three Redis Sentinel instances for a robust deployment. A typical configuration could have one Redis master, two Redis slaves, and three Redis Sentinel instances spread across three servers for a robust deployment.

When running jambonz against a standalone Redis server (which again, is the default), you may notice these environment variables being passed to many of the jambonz Node.js apps:
```
      JAMBONES_REDIS_HOST: '127.0.0.1',
      JAMBONES_REDIS_PORT: 6379,
```

To run against a Redis Sentinel cluster, simply replace those 2 environment variables with the following 3 which specify the location of the Sentinels along with the master name and password, e.g.
```
      JAMBONES_REDIS_SENTINELS: '3.88.135.74:26379,3.88.135.74:26380,3.88.135.74:26381',
      JAMBONES_REDIS_SENTINEL_MASTER_NAME: 'Redis-master',
      JAMBONES_REDIS_SENTINEL_PASSWORD: 'JambonzR0ck$',
```

With those changes, jambonz will connect to and use the Redis Sentinel cluster for caching information.