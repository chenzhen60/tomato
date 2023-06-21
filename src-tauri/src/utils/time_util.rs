use std::time::{SystemTime, UNIX_EPOCH};



pub struct TimeUitl();

impl TimeUitl {
    pub fn now_timestamp() -> i64 {
        let now_second = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        now_second as i64
    }
}
