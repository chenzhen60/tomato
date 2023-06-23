use dotenv::dotenv;
use log::{info, Level};
use once_cell::sync::OnceCell;
use r2d2_sqlite::SqliteConnectionManager;

use crate::{
    api::{blogs, clipboards, greet, save_blog, save_clipboard},
    utils::db_util::DBUtil,
};

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayMenu};

pub mod api;
pub mod models;
pub mod utils;

pub static DB_POOL: OnceCell<r2d2::Pool<SqliteConnectionManager>> = OnceCell::new();

fn main() {
    dotenv().ok();
    env_logger::init();
    info!("=============================");

    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_item(show);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard::init())
        .setup(|app| {
            DBUtil::init_db_pool(app).unwrap();
            DBUtil::init_db_table().unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            blogs,
            save_blog,
            save_clipboard,
            clipboards
        ])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            tauri::SystemTrayEvent::MenuItemClick { tray_id, id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                _ => {
                    {}
                }
            },
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
