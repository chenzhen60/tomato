use rusqlite::{Connection, Result, Statement};
use serde::{Deserialize, Serialize};

use crate::DB_PATH;

#[derive(Debug, Serialize, Deserialize)]
pub struct KV {
    key: String,
    value: String,
}

impl KV {
    pub fn new(key: String, value: String) -> Self {
        Self { key, value }
    }

    pub fn insert(&self) -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt = conn.prepare("insert into kvs (key, value) values (?, ?)")?;
        stmt.execute([&self.key, &self.value])?;
        drop(stmt);
        conn.close();
        Ok(())
    }

    pub fn create_tables() -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt: Statement = conn.prepare(
            "CREATE TABLE IF NOT EXISTS kvs (
               key TEXT PRIMARY KEY,
               value TEXT NOT NULL
               )",
        )?;
        stmt.execute([])?;
        drop(stmt);
        conn.close();
        Ok(())
    }
}
