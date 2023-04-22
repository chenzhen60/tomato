// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use once_cell::sync::OnceCell;

use crate::utils::db_util::DBUtil;

pub mod models;
pub mod utils;

pub static DB_PATH: OnceCell<String> = OnceCell::new();

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    dotenv().ok();
    tauri::Builder::default()
        .setup(|app| {
            DBUtil::init_db_path(app).unwrap();
            DBUtil::init_db_table().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
