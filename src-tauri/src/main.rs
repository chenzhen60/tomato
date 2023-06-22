use std::collections::HashMap;

use dotenv::dotenv;
use models::{blog::Blog, clipboard::Clipboard};
use once_cell::sync::OnceCell;
use r2d2_sqlite::SqliteConnectionManager;
use utils::time_util::TimeUitl;
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
    let blog = Blog {
        id: Uuid::new_v4().to_string(),
        content: params.get("content").unwrap().to_string(),
        created_at: TimeUitl::now_timestamp(),
    };

    match blog.save() {
        Ok(()) => true,
        Err(_) => false,
    }
}

#[tauri::command]
fn save_clipboard(text: &str) -> bool {
    let clipboard = Clipboard::new(String::from(text));
    if let Ok(()) = clipboard.save() {
        return true;        
    }
    false
}

fn main() {
    dotenv().ok();
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard::init())
        .setup(|app| {
            DBUtil::init_db_pool(app).unwrap();
            DBUtil::init_db_table().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, blogs, save_blog, save_clipboard])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
