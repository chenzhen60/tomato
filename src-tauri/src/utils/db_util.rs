use r2d2_sqlite::SqliteConnectionManager;
use std::fs::{create_dir_all, File};
use tauri::App;

use crate::{
    models::{blog::Blog, clipboard::Clipboard, kv::KV, tag::Tag},
    utils::conf::Conf,
    DB_POOL,
};

pub struct DBUtil {}

impl DBUtil {
    pub fn init_db_pool(app: &App) -> anyhow::Result<()> {
        let env = Conf::tauri_env();
        let db_path: String = match env {
            "development" => "../db.sqlite".to_string(),
            _ => {
                let dir_path = app.path_resolver().app_data_dir().unwrap();
                let bingding = dir_path.join("db.sqlite");
                let db_path = bingding.to_str().unwrap();
                match File::open(db_path) {
                    Ok(_) => (),
                    Err(_) => {
                        create_dir_all(dir_path)?;
                        File::create(db_path)?;
                    }
                };
                db_path.to_string()
            }
        };
        let manager = SqliteConnectionManager::file(db_path);
        let pool = r2d2::Pool::new(manager).unwrap();
        DB_POOL.set(pool).unwrap();

        Ok(())
    }

    pub fn get_pool() -> anyhow::Result<r2d2::Pool<SqliteConnectionManager>> {
        let pool = DB_POOL.get().unwrap();
        Ok(pool.clone())
    }

    pub fn get_conn() -> anyhow::Result<r2d2::PooledConnection<SqliteConnectionManager>> {
        let pool = Self::get_pool().unwrap();
        Ok(pool.get()?)
    }

    pub fn init_db_table() -> anyhow::Result<()> {
        KV::create_tables()?;
        Tag::init_db()?;
        Blog::init_db()?;
        Clipboard::init_db()?;

        Ok(())
    }
}
