use rusqlite::Result;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::utils::{db_util::DBUtil, time_util::TimeUitl};

#[derive(Debug, Serialize, Deserialize)]
pub struct Clipboard {
    pub id: String,
    pub text: String,
    pub created_at: i64,
}

impl Clipboard {
    pub fn new(text: String) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            text,
            created_at: TimeUitl::now_timestamp(),
        }
    }

    pub fn init_db() -> Result<()> {
        let conn = DBUtil::get_conn().unwrap();
        conn.execute(
            "
                create table if not exists clipboards (
                    id TEXT primary key,
                    text TEXT NOT NULL,
                    created_at integer not null
                )
            ",
            [],
        )?;
        Ok(())
    }

    pub fn save(&self) -> Result<()> {
        let conn = DBUtil::get_conn().unwrap();
        let mut stmt = conn.prepare(
            "
              insert into clipboards (id, text, created_at)
              values(?, ?, ?)
            ",
        )?;
        stmt.execute([&self.id, &self.text, &self.created_at.to_string()])?;
        Ok(())
    }
}
