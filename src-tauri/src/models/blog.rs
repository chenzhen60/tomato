use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};

use crate::DB_PATH;

#[derive(Debug, Serialize, Deserialize)]
pub struct Blog {
    pub id: String,
    pub content: String,
    pub created_at: i64,
}

impl Blog {
    pub fn init_db() -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        conn.execute(
            "
                create table if not exists blogs (
                    id TEXT primary key,
                    content TEXT NOT NULL,
                    created_at integer not null
                )",
            [],
        )?;
        Ok(())
    }


    pub fn save(&self) -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt = conn.prepare("
            insert into blogs (id, content, created_at)
            values (?, ?, ?)
        ")?;
        stmt.execute([&self.id, &self.content, &self.created_at.to_string()])?;
        Ok(())
    }

    pub fn del(&self) -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt = conn.prepare("
            delete from blogs where id = ?
        ")?;
        stmt.execute([&self.id])?;
        Ok(())
    }


    pub fn list_all() -> Result<Vec<Blog>> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt = conn.prepare("
            select id, content, created_at from blogs order by created_at desc
        ")?;

        let rows = stmt.query_map([], |row| {
            Ok(Self {
                id: row.get(0)?,
                content: row.get(1)?,
                created_at: row.get(2)?,
            })
        })?;
        
        let mut list = Vec::new();
        for row in rows {
            list.push(row?);
        }
        Ok(list)
    }
}
