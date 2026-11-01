import * as migration_20261101_164849_customer_portal from './20261101_164849_customer_portal';

export const migrations = [
  {
    up: migration_20261101_164849_customer_portal.up,
    down: migration_20261101_164849_customer_portal.down,
    name: '20261101_164849_customer_portal'
  },
];
