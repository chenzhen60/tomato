use std::{
    collections::HashMap,
    time::{SystemTime, UNIX_EPOCH},
};

use dotenv::dotenv;
use models::blog::Blog;
use once_cell::sync::OnceCell;
use r2d2_sqlite::SqliteConnectionManager;
use uuid::Uuid;

use crate::utils::db_util::DBUtil;

pub mod models;
pub mod utils;

pub static DB_POOL: OnceCell<r2d2::Pool<SqliteConnectionManager>> = OnceCell::new();

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn blogs() -> Vec<Blog> {
    match Blog::list_all() {
        Ok(list) => list,
        Err(err) => {
            panic!("#{:?}", err)
        }
    }
}

#[tauri::command]
fn save_blog(params: HashMap<String, String>) -> bool {
    let now_seconds = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let blog = Blog {
        id: Uuid::new_v4().to_string(),
        content: params.get("content").unwrap().to_string(),
        created_at: now_seconds as i64,
    };

    blog.save().unwrap();

    true
}

fn main() {
    dotenv().ok();
    tauri::Builder::default()
        .setup(|app| {
            DBUtil::init_db_pool(app).unwrap();
            DBUtil::init_db_table().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, blogs, save_blog])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
