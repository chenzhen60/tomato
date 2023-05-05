use rusqlite::{Connection, Result};
use serde::{Serialize, Deserialize};

use crate::DB_PATH;

#[derive(Debug, Serialize, Deserialize)]
pub struct Tag {
    pub id: String,
    pub name: String,
}

impl Tag {
    pub fn init_db() -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        conn.execute(
            "
                create table if not exists tags (
                    id TEXT primary key,
                    name TEXT NOT NULL,
                    UNIQUE(name)
                )",
            [],
        )?;
        Ok(())
    }


    pub fn save(&self) -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt = conn.prepare("
            insert into tags (id, name)
            values (?, ?)
        ")?;
        stmt.execute([&self.id, &self.name])?;
        Ok(())
    }

    pub fn del(&self) -> Result<()> {
        let conn = Connection::open(DB_PATH.get().unwrap())?;
        let mut stmt = conn.prepare("
            delete from tags where id = ?
        ")?;
        stmt.execute([&self.id])?;
        Ok(())
    }



}
