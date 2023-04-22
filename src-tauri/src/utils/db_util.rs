use std::env;
use tauri::App;

use crate::{models::kv::KV, DB_PATH};

pub struct DBUtil {}

impl DBUtil {
    pub fn init_db_path(app: &App) -> anyhow::Result<()> {
        let env = env::var("TAURI_ENV").unwrap();
        println!("{}", env);
        if env == "development" {
            DB_PATH.set("db.sqlite".to_string()).unwrap();
        } else {
            let dir_path = app.path_resolver().app_data_dir().unwrap();
            let bingding = dir_path.join("db.sqlite");
            let db_path = bingding.to_str().unwrap();
            DB_PATH.set(db_path.to_string()).unwrap();
        }

        Ok(())
    }

    pub fn init_db_table() -> anyhow::Result<()> {
        KV::create_tables()?;

        Ok(())
    }
}
