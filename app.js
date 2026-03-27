const TICK_MS = 15 * 60 * 1000;
const MAX_COMMAND_POINTS = 24;
const LOCAL_WORLD_KEY = "mist-world";
const SEASON_LENGTH_DAYS = 90;
const KNOWN_SCREENS = new Set([
  "landing",
  "guide",
  "story",
  "faq",
  "auth",
  "character",
  "faction",
  "clan",
  "dashboard",
  "actions",
  "economy",
  "city",
  "social",
  "progression",
]);

const CITY_STAGES = [
  { tier: 1, multiplier: 1.0, needPower: 0, needIntel: 0, costCredits: 0, costAlloys: 0 },
  { tier: 2, multiplier: 1.6, needPower: 180, needIntel: 100, costCredits: 600, costAlloys: 220 },
  { tier: 3, multiplier: 2.4, needPower: 380, needIntel: 220, costCredits: 1200, costAlloys: 460 },
  { tier: 4, multiplier: 3.4, needPower: 650, needIntel: 360, costCredits: 2400, costAlloys: 900 },
  { tier: 5, multiplier: 5.0, needPower: 980, needIntel: 520, costCredits: 4400, costAlloys: 1600 },
];

const i18n = {
  he: {
    nav_landing: "דף פתיחה",
    nav_flow: "זרימת משחק",
    nav_story: "סיפור עולם",
    nav_faq: "שאלות נפוצות",
    nav_dashboard: "לוח בקרה",
    language: "שפה",
    backend_settings: "שרת",
    hero_eyebrow: "אסטרטגיית דפדפן תורית מרובת שחקנים",
    hero_title: "הקם הנהגה, בנה מועצה והובל עונה תחרותית.",
    hero_subtitle: "משחק טקסט עברי-ראשון עם כלכלה, מודיעין, תורות וקרבות בין שחקנים.",
    hero_cta_primary: "להתחיל עכשיו",
    hero_cta_secondary: "איך זה עובד",
    hero_cta_story: "קרא סיפור",
    landing_card_1_title: "קצב עולמי קבוע",
    landing_card_1_text: "נקודות פיקוד נטענות כל מחזור, כדי לתגמל תכנון ולא ספאם לחיצות.",
    landing_card_2_title: "החלטות עם מחיר",
    landing_card_2_text: "פעולה התקפית, אימון או סיור עולים משאבים ומשפיעים על הדירוג.",
    landing_card_3_title: "שיתוף פעולה אמיתי",
    landing_card_3_text: "מועצות שחקנים יוצרות תיאום מבצעי, תמיכה והתקדמות קבוצתית.",
    flow_title: "המסלול לשחקן חדש",
    flow_1: "נרשמים ובוחרים שפה.",
    flow_2: "יוצרים מפקד, מוצא ותכונת פתיחה.",
    flow_3: "בוחרים סיעה ומקימים או מצטרפים למועצה.",
    flow_4: "מבצעים תורות: סיור, פשיטה, אימון ופיתוח.",
    flow_5: "עולים בדירוג אישי וקבוצתי לאורך העונה.",
    story_title: "סיפור העולם",
    story_p1: "אחרי קריסת רשתות האנרגיה, חמש ערי-ענן ניתקו זו מזו ונאבקו על נתיבי אספקה.",
    story_p2: "כל מפקד מוביל מועצה, בוחר סיעה ומנסה לאחד אזורים בלי לאבד את עורף הכלכלה.",
    story_p3: "העונה נקבעת לא על ידי נאום, אלא על ידי תכנון תורות, מודיעין ושיתוף פעולה.",
    faq_title: "שאלות נפוצות",
    faq_q1: "כמה פעמים מקבלים תורות?",
    faq_a1: "נקודות פיקוד נטענות במחזור קבוע. אפשר לראות השפעה מיידית בלוח הבקרה.",
    faq_q2: "מה היתרון של מועצה?",
    faq_a2: "מועצה נותנת אוצר משותף, תפקידי הנהגה, חדר מלחמה ובונוס סיוע בקרב.",
    faq_q3: "איך מתקדמים בין ערים?",
    faq_a3: "שדרוג עיר דורש עוצמה, מודיעין ומשאבים. כל עיר משפרת מכפיל ייצור.",
    faq_q4: "מה נשמר בין עונות?",
    faq_a4: "דירוגי העונה נשמרים בארכיון. ההתקדמות הפעילה מתאפסת לקמפיין חדש.",
    start_now: "כניסה למשחק",
    auth_title: "הרשמה / התחברות",
    auth_sub: "למטרת אב-טיפוס, הנתונים האישיים נשמרים מקומית בדפדפן.",
    email: "אימייל",
    password: "סיסמה",
    auth_login: "התחבר",
    auth_register: "הרשמה",
    auth_or: "או",
    auth_google: "כניסה עם Google",
    auth_logout: "התנתק",
    debug_btn: "דיבאג",
    debug_route: "מסך",
    debug_auth: "אימות",
    debug_backend: "שרת",
    debug_commander: "מפקד",
    auth_ok: "התחברות בוצעה בהצלחה.",
    auth_logged_out: "התנתקת בהצלחה.",
    auth_register_ok: "ההרשמה בוצעה. אם הופעל אימות מייל, יש לאשר במייל.",
    auth_fail: "התחברות נכשלה. בדוק אימייל/סיסמה.",
    auth_no_backend: "כניסה מאובטחת זמינה לאחר חיבור Supabase.",
    guard_need_login: "יש להתחבר לפני ביצוע פעולה זו.",
    guard_need_character: "יש להשלים יצירת דמות לפני פעולה זו.",
    guard_need_faction: "יש לבחור סיעה לפני פעולה זו.",
    continue: "המשך",
    character_title: "יצירת דמות",
    char_name: "שם המפקד",
    char_origin: "מחוז מוצא",
    origin_north: "ממסר צפוני",
    origin_delta: "טבעת הדלתא",
    origin_forge: "מבצר היתוך",
    origin_dunes: "דיונות זכוכית",
    char_trait: "תכונת פתיחה",
    trait_strategist: "טקטיקן",
    trait_broker: "סוחר־על",
    trait_stalker: "צייד מודיעין",
    trait_warden: "שומר חזית",
    faction_title: "בחירת סיעה",
    continue_to_clan: "להמשך: מועצה",
    clan_title: "הקמה או הצטרפות למועצה",
    create_council: "הקמת מועצה",
    join_council: "הצטרפות למועצה",
    council_name: "שם מועצה",
    join_code: "קוד הצטרפות",
    create: "צור",
    join: "הצטרף",
    to_dashboard: "ללוח הבקרה",
    dashboard_title: "לוח בקרה ראשי",
    dash_actions: "פעולות תור",
    dash_actions_text: "בצע פעולות לפי נקודות הפיקוד הזמינות והמשאבים שלך.",
    dash_social: "מערכת חברתית",
    dash_social_text: "תאם פעולות מועצה, הקצה תפקידים ותכנן מהלכים משותפים.",
    dash_progress: "התקדמות עונתית",
    dash_progress_text: "עקוב אחרי דירוג, עוצמה אישית וקצב ההתקדמות שלך.",
    dash_economy: "כלכלה ובנק",
    dash_economy_text: "נהל הפקדות והמרות שוק כדי לשמור יציבות לאורך העונה.",
    dash_city: "פיתוח עיר",
    dash_city_text: "העלה שכבת עיר לקבלת בונוס ייצור רחב יותר.",
    open_actions: "פתח פעולות",
    open_social: "פתח חברתי",
    open_progress: "פתח התקדמות",
    open_economy: "פתח כלכלה",
    open_city: "פתח עיר",
    live_leaderboard: "דירוג חי",
    live_leaderboard_sub: "שחקנים מחוברים (מ- Supabase או סימולציה מקומית).",
    live_feed: "פיד עולם",
    live_feed_sub: "אירועי תורות אחרונים של שחקנים.",
    actions_title: "פעולות תור",
    target_player: "שחקן יעד (אופציונלי)",
    target_hint: "סיור קודם משפר דיוק תקיפה. תקיפה חוזרת על אותו יעד נחלשת אחרי 5 פעמים.",
    target_placeholder: "לדוגמה: Mira",
    action_scout: "סיור מודיעיני",
    action_strike: "פשיטה טקטית",
    action_train: "אימון מומחים",
    action_ritual: "טקס מאנה",
    cost_2: "עלות: 2 נק' פיקוד",
    cost_3: "עלות: 3 נק' פיקוד",
    cost_4: "עלות: 4 נק' פיקוד",
    cost_mana: "עלות: 2 נק' פיקוד + 8 מאנה",
    social_title: "חברה ומועצות",
    social_ops: "מבצעי מועצה",
    social_ops_text: "תיאום מטרות בין חברי המועצה מעניק בונוס השפעה עונתי.",
    council_role_label: "התפקיד שלך",
    council_treasury_label: "אוצר מועצה",
    council_deposit: "הפקד לאוצר",
    council_withdraw: "משוך מהאוצר",
    promote_member_label: "קדם חבר (לידי קצין)",
    promote_member_placeholder: "שם מפקד",
    promote_member: "קדם",
    social_chat: "יומן תיאום",
    social_chat_text: "רשום החלטות תקיפה וכלכלה כדי לשמור רצף עבודה קבוצתי.",
    clan_rankings_title: "דירוג מועצות",
    war_room_title: "חדר מלחמה",
    war_room_text: "סמן מטרות מועצה ושייך תוקפים לכל יעד.",
    war_assign_placeholder: "שם תוקף",
    war_add: "הוסף יעד",
    war_added: "יעד נוסף לחדר המלחמה.",
    war_denied: "רק מנהיג או קצין יכולים להוסיף יעדי מלחמה.",
    war_empty: "אין יעדים פעילים.",
    progress_title: "מסכי התקדמות",
    season_archive_title: "ארכיון עונות",
    rank_label: "דירוג משוער",
    season_label: "יום בעונה",
    clan_created: "המועצה נוצרה בהצלחה.",
    clan_joined: "הצטרפת למועצה.",
    clan_missing: "נדרש שם מועצה או קוד תקין.",
    need_points: "אין מספיק נקודות פיקוד לפעולה הזו.",
    need_supply: "אין מספיק אספקה לביצוע פשיטה.",
    need_alloy: "אין מספיק סגסוגת לאימון.",
    need_mana: "אין מספיק מאנה לפעולה זו.",
    log_scout: "הסיור הצליח: נוספו מודיעין והשפעה.",
    log_strike: "הפשיטה הסתיימה: רווחת אשראי, אך צרכת אספקה.",
    log_train: "האימון הסתיים: יעילות הכוחות עלתה.",
    log_ritual: "הטקס הושלם: מאנה הומרה להשפעה ומודיעין.",
    intel_reports_title: "דוחות מודיעין אחרונים",
    report_fresh: "דוח עדכני",
    report_old: "דוח ישן",
    strike_need_recon: "תקיפה בלי סיור עדכני מסוכנת ופחות יעילה.",
    strike_city_block: "ניתן לתקוף רק יעדים באותה שכבת עיר.",
    strike_farmed: "היעד הותקף כבר 5 פעמים. מתקבל רק ביזה חלקית.",
    economy_title: "כלכלה, בנק ושוק",
    workers_title: "חלוקת עובדים",
    workers_text: "חלק עובדים בין זהב, אספקה וסגסוגת כדי לשנות קצב ייצור.",
    bank_title: "בנק עירוני",
    bank_text: "הפקד אשראי לביטחון וצבור ריבית פסיבית במחזורי זמן.",
    bank_deposit: "הפקד 200",
    bank_withdraw: "משוך 200",
    market_title: "שוק אספקה",
    market_text: "המר סגסוגת ואשראי לפי צרכי הקרב הנוכחיים.",
    shop_title: "חנות ציוד",
    shop_text: "ציוד משפר תקיפה, הגנה או מודיעין. ניתן גם למכור חזרה.",
    shop_buy_blade: "קנה להב",
    shop_buy_plate: "קנה שריון",
    shop_buy_array: "קנה מערך סריקה",
    shop_sell_blade: "מכור להב",
    shop_sell_plate: "מכור שריון",
    shop_sell_array: "מכור מערך",
    market_buy_supplies: "קנה אספקה",
    market_sell_alloys: "מכור סגסוגת",
    city_title: "שכבת עיר",
    city_tier_label: "שכבה נוכחית",
    city_bonus_label: "בונוס ייצור",
    city_gate_title: "שערי התקדמות עיר",
    city_upgrade_text: "שדרוג דורש אשראי וסגסוגת, ומגדיל בונוס משאבים.",
    city_upgrade: "שדרג עיר",
    city_next_label: "עיר הבאה",
    city_req_power: "דרישת עוצמה",
    city_req_intel: "דרישת מודיעין",
    city_req_credits: "עלות אשראי",
    city_req_alloys: "עלות סגסוגת",
    city_multiplier_label: "מכפיל ייצור",
    city_max_reached: "הגעת לעיר המקסימלית לעונה זו.",
    bank_low_credits: "אין מספיק אשראי להפקדה.",
    bank_low_bank: "אין מספיק יתרה בבנק.",
    bank_deposit_done: "הפקדה הושלמה. היתרה בבנק עלתה.",
    bank_withdraw_done: "משיכה הושלמה. האשראי זמין לפעולות.",
    market_buy_done: "רכישת אספקה בוצעה.",
    market_sell_done: "מכירת סגסוגת בוצעה.",
    market_low_credits: "אין מספיק אשראי לרכישה.",
    market_low_alloys: "אין מספיק סגסוגת למכירה.",
    city_upgrade_done: "שדרוג עיר הושלם. בונוס הייצור עלה.",
    city_upgrade_fail: "אין מספיק משאבים לשדרוג.",
    target_none: "ללא יעד",
    pvp_win: "ניצחון בקרב מול",
    pvp_loss: "הפסד בקרב מול",
    pvp_draw: "קרב שקול מול",
    no_target: "לא נבחר יעד.",
    no_council: "יש להצטרף למועצה כדי לבצע פעולה זו.",
    treasury_deposit_done: "ההפקדה לאוצר הושלמה.",
    treasury_withdraw_done: "המשיכה מאוצר המועצה הושלמה.",
    treasury_insufficient: "אין מספיק יתרה לביצוע הפעולה.",
    treasury_denied: "אין הרשאה לפעולה זו.",
    role_leader: "מנהיג",
    role_officer: "קצין",
    role_member: "חבר",
    promote_done: "החבר קודם בהצלחה.",
    promote_denied: "רק מנהיג יכול לקדם חברים.",
    member_not_found: "לא נמצא חבר בשם זה במועצה.",
    season_reset_done: "עונה חדשה התחילה. דירוגי העונה נשמרו בארכיון.",
    shop_no_credits: "אין מספיק אשראי לקניה.",
    shop_no_item: "אין פריט כזה למכירה.",
    shop_buy_done: "הקניה הושלמה.",
    shop_sell_done: "המכירה הושלמה.",
    drop_found: "נפל ציוד",
    drop_none: "לא נפל ציוד הפעם.",
    tier_common: "רגיל",
    tier_rare: "נדיר",
    tier_elite: "עלית",
    gear_blade: "להב",
    gear_plate: "שריון",
    gear_array: "מערך סריקה",
    workers_gold: "עובדי אשראי",
    workers_supply: "עובדי אספקה",
    workers_alloy: "עובדי סגסוגת",
    workers_assign: "שנה",
    workers_invalid: "חלוקה לא תקינה. סך העובדים הוא 100.",
    workers_saved: "חלוקת עובדים עודכנה.",
    clan_assist_note: "סיוע מועצה הופעל בקרב.",
    backend_title: "חיבור שירות משותף",
    backend_text: "כדי לאפשר סימולציה מרובת שחקנים אמיתית, חבר פרויקט Supabase חינמי.",
    backend_url: "Supabase URL",
    backend_key: "Supabase Anon Key",
    save_connect: "שמור והתחבר",
    close: "סגור",
    connected_remote: "מחובר לשכבת עולם משותפת (Supabase).",
    connected_local: "לא הוגדר שירות חיצוני. פועל על סימולציה מקומית.",
    connected_error: "החיבור נכשל. בדוק URL/Key והגדרת טבלאות.",
    no_data: "עדיין אין נתונים.",
    stat_cp: "נק' פיקוד",
    stat_credits: "אשראי",
    stat_supplies: "אספקה",
    stat_alloys: "סגסוגת",
    stat_intel: "מודיעין",
    stat_influence: "השפעה",
    stat_mana: "מאנה",
    stat_bank: "יתרת בנק",
    tips_next: "טיפ הבא",
    tips_skip: "סגור הדרכה",
    tip_landing_t: "ברוך הבא",
    tip_landing_b: "כאן מתחילים: מעבר מהיר להרשמה והיכרות עם קצב המשחק.",
    tip_auth_t: "כניסה מהירה",
    tip_auth_b: "הזן פרטים כדי ליצור פרופיל מקומי ולהתקדם ליצירת דמות.",
    tip_character_t: "זהות שחקן",
    tip_character_b: "הבחירות כאן משפיעות על תחילת ההתקדמות שלך.",
    tip_faction_t: "בחירת סיעה",
    tip_faction_b: "בחר סיעה לפי סגנון: הגנה, תקיפה, מודיעין או כלכלה.",
    tip_clan_t: "מערכת מועצות",
    tip_clan_b: "מועצה מאפשרת תיאום חברתי ומקדמת יעדי עונה קבוצתיים.",
    tip_dashboard_t: "המרכז שלך",
    tip_dashboard_b: "בדוק משאבים, דירוג ופיד עולם לפני כל מהלך.",
    tip_actions_t: "ניהול תורות",
    tip_actions_b: "בצע פעולות רק כשיש מספיק נקודות פיקוד ומשאבים תומכים.",
    tip_economy_t: "כלכלה יציבה",
    tip_economy_b: "השתמש בבנק ובשוק כדי למנוע מחסור לפני מהלכי תקיפה.",
    tip_city_t: "צמיחה ארוכת טווח",
    tip_city_b: "שדרוג שכבת עיר מגדיל בונוס ייצור ומאיץ התקדמות.",
  },
  en: {
    nav_landing: "Landing",
    nav_flow: "Flow",
    nav_story: "Story",
    nav_faq: "FAQ",
    nav_dashboard: "Dashboard",
    language: "Language",
    backend_settings: "Server",
    hero_eyebrow: "Multiplayer turn-based browser strategy",
    hero_title: "Build command, grow a council, and dominate the season.",
    hero_subtitle: "Hebrew-first text strategy with economy, intel, turns, and PvP pressure.",
    hero_cta_primary: "Start Now",
    hero_cta_secondary: "How It Works",
    hero_cta_story: "Read Story",
    landing_card_1_title: "Steady world pacing",
    landing_card_1_text: "Command points regenerate on schedule to reward planning over click spam.",
    landing_card_2_title: "Meaningful costs",
    landing_card_2_text: "Raid, scout, and train all consume resources and shift your ranking.",
    landing_card_3_title: "Real social play",
    landing_card_3_text: "Councils coordinate operations and shared progression goals.",
    flow_title: "New Player Path",
    flow_1: "Register and choose your language.",
    flow_2: "Create commander profile and starting trait.",
    flow_3: "Pick faction and create/join a council.",
    flow_4: "Spend turns on scouting, raids, training, and growth.",
    flow_5: "Climb personal and group season ranks.",
    story_title: "World Story",
    story_p1: "After the energy grid collapse, five sky-cities split and fought over supply routes.",
    story_p2: "Each commander leads a council, chooses a faction, and tries to unify districts without breaking economy.",
    story_p3: "This season is won by planning turns, intelligence, and coordinated execution.",
    faq_title: "Frequently Asked Questions",
    faq_q1: "How often do turns regenerate?",
    faq_a1: "Command points regenerate on a fixed cycle and are reflected live on the dashboard.",
    faq_q2: "Why join a council?",
    faq_a2: "Councils provide shared treasury, leadership roles, war room targets, and battle assist bonuses.",
    faq_q3: "How do city tiers progress?",
    faq_a3: "City upgrades require power, intel, and resources. Each tier raises production multiplier.",
    faq_q4: "What persists between seasons?",
    faq_a4: "Season ranking snapshots are archived. Active campaign progression resets.",
    start_now: "Enter Game",
    auth_title: "Register / Login",
    auth_sub: "For prototype use, personal data is stored in your browser.",
    email: "Email",
    password: "Password",
    auth_login: "Login",
    auth_register: "Register",
    auth_or: "or",
    auth_google: "Continue with Google",
    auth_logout: "Logout",
    debug_btn: "Debug",
    debug_route: "Route",
    debug_auth: "Auth",
    debug_backend: "Backend",
    debug_commander: "Commander",
    auth_ok: "Login completed successfully.",
    auth_logged_out: "Logged out successfully.",
    auth_register_ok: "Registration completed. Confirm email if verification is enabled.",
    auth_fail: "Login failed. Check email and password.",
    auth_no_backend: "Secure auth is available after Supabase is connected.",
    guard_need_login: "You must be logged in before this action.",
    guard_need_character: "Complete character creation before this action.",
    guard_need_faction: "Select a faction before this action.",
    continue: "Continue",
    character_title: "Character Creation",
    char_name: "Commander Name",
    char_origin: "Origin District",
    origin_north: "North Relay",
    origin_delta: "Delta Ring",
    origin_forge: "Forge Bastion",
    origin_dunes: "Glass Dunes",
    char_trait: "Starting Trait",
    trait_strategist: "Strategist",
    trait_broker: "Broker",
    trait_stalker: "Intel Hunter",
    trait_warden: "Frontier Warden",
    faction_title: "Faction Selection",
    continue_to_clan: "Continue: Council",
    clan_title: "Create or Join Council",
    create_council: "Create Council",
    join_council: "Join Council",
    council_name: "Council Name",
    join_code: "Join Code",
    create: "Create",
    join: "Join",
    to_dashboard: "Go To Dashboard",
    dashboard_title: "Main Dashboard",
    dash_actions: "Turn Actions",
    dash_actions_text: "Run actions based on available command points and resources.",
    dash_social: "Social Layer",
    dash_social_text: "Coordinate council operations and assign team roles.",
    dash_progress: "Season Progress",
    dash_progress_text: "Track your rank, power, and pace this season.",
    dash_economy: "Economy & Bank",
    dash_economy_text: "Use deposits and market exchanges to keep your season stable.",
    dash_city: "City Growth",
    dash_city_text: "Upgrade your city tier for stronger production bonuses.",
    open_actions: "Open Actions",
    open_social: "Open Social",
    open_progress: "Open Progress",
    open_economy: "Open Economy",
    open_city: "Open City",
    live_leaderboard: "Live Leaderboard",
    live_leaderboard_sub: "Connected players (from Supabase or local simulation).",
    live_feed: "World Feed",
    live_feed_sub: "Latest turn events from active players.",
    actions_title: "Turn Actions",
    target_player: "Target player (optional)",
    target_hint: "Scouting first improves strike accuracy. Repeated strikes on same target weaken after 5.",
    target_placeholder: "Example: Mira",
    action_scout: "Intel Sweep",
    action_strike: "Tactical Raid",
    action_train: "Specialist Training",
    action_ritual: "Mana Ritual",
    cost_2: "Cost: 2 command points",
    cost_3: "Cost: 3 command points",
    cost_4: "Cost: 4 command points",
    cost_mana: "Cost: 2 command points + 8 mana",
    social_title: "Social and Councils",
    social_ops: "Council Operations",
    social_ops_text: "Aligned targets grant stronger seasonal influence.",
    council_role_label: "Your role",
    council_treasury_label: "Council treasury",
    council_deposit: "Deposit to treasury",
    council_withdraw: "Withdraw from treasury",
    promote_member_label: "Promote member (to officer)",
    promote_member_placeholder: "Commander name",
    promote_member: "Promote",
    social_chat: "Coordination Log",
    social_chat_text: "Capture battle and economy decisions to keep your group aligned.",
    clan_rankings_title: "Council Rankings",
    war_room_title: "War Room",
    war_room_text: "Mark council targets and assign attackers per target.",
    war_assign_placeholder: "Attacker name",
    war_add: "Add Target",
    war_added: "Target added to war room.",
    war_denied: "Only leader or officer can add war targets.",
    war_empty: "No active targets.",
    progress_title: "Progression Screens",
    season_archive_title: "Season Archive",
    rank_label: "Estimated Rank",
    season_label: "Season Day",
    clan_created: "Council created successfully.",
    clan_joined: "You joined the council.",
    clan_missing: "Enter a valid council name or code.",
    need_points: "Not enough command points for this action.",
    need_supply: "Not enough supplies for a raid.",
    need_alloy: "Not enough alloy for training.",
    need_mana: "Not enough mana for this action.",
    log_scout: "Sweep complete: intel and influence increased.",
    log_strike: "Raid complete: credits gained, supplies consumed.",
    log_train: "Training complete: combat efficiency increased.",
    log_ritual: "Ritual complete: mana converted into influence and intel.",
    intel_reports_title: "Recent Intel Reports",
    report_fresh: "Fresh report",
    report_old: "Outdated report",
    strike_need_recon: "Attacking without fresh recon is risky and less effective.",
    strike_city_block: "You can only attack targets in the same city tier.",
    strike_farmed: "Target already hit 5 times. Only partial loot applies.",
    economy_title: "Economy, Bank, and Market",
    workers_title: "Worker Allocation",
    workers_text: "Split workers between credits, supplies, and alloys to shape production.",
    bank_title: "City Bank",
    bank_text: "Deposit credits for safety and passive interest over time.",
    bank_deposit: "Deposit 200",
    bank_withdraw: "Withdraw 200",
    market_title: "Supply Market",
    market_text: "Convert alloys and credits based on current strategic needs.",
    shop_title: "Equipment Shop",
    shop_text: "Gear improves offense, defense, or intel. You can also sell it back.",
    shop_buy_blade: "Buy Blade",
    shop_buy_plate: "Buy Plate",
    shop_buy_array: "Buy Scanner",
    shop_sell_blade: "Sell Blade",
    shop_sell_plate: "Sell Plate",
    shop_sell_array: "Sell Scanner",
    market_buy_supplies: "Buy Supplies",
    market_sell_alloys: "Sell Alloys",
    city_title: "City Tier",
    city_tier_label: "Current Tier",
    city_bonus_label: "Production Bonus",
    city_gate_title: "City Progress Gates",
    city_upgrade_text: "Upgrading costs credits and alloys, then boosts resource gain.",
    city_upgrade: "Upgrade City",
    city_next_label: "Next city",
    city_req_power: "Power required",
    city_req_intel: "Intel required",
    city_req_credits: "Credits cost",
    city_req_alloys: "Alloy cost",
    city_multiplier_label: "Production multiplier",
    city_max_reached: "You reached the max city for this season.",
    bank_low_credits: "Not enough credits to deposit.",
    bank_low_bank: "Not enough bank balance.",
    bank_deposit_done: "Deposit complete. Bank balance increased.",
    bank_withdraw_done: "Withdraw complete. Credits are now available.",
    market_buy_done: "Supplies purchase complete.",
    market_sell_done: "Alloy sale complete.",
    market_low_credits: "Not enough credits to buy supplies.",
    market_low_alloys: "Not enough alloys to sell.",
    city_upgrade_done: "City upgraded. Production bonus increased.",
    city_upgrade_fail: "Not enough resources to upgrade city.",
    target_none: "No target",
    pvp_win: "Battle victory against",
    pvp_loss: "Battle lost against",
    pvp_draw: "Battle draw against",
    no_target: "No target selected.",
    no_council: "Join a council to perform this action.",
    treasury_deposit_done: "Treasury deposit completed.",
    treasury_withdraw_done: "Treasury withdrawal completed.",
    treasury_insufficient: "Insufficient balance for this action.",
    treasury_denied: "You do not have permission for this action.",
    role_leader: "Leader",
    role_officer: "Officer",
    role_member: "Member",
    promote_done: "Member promoted successfully.",
    promote_denied: "Only leaders can promote members.",
    member_not_found: "Member not found in your council.",
    season_reset_done: "New season started. Previous season rankings archived.",
    shop_no_credits: "Not enough credits to buy.",
    shop_no_item: "You do not own this item.",
    shop_buy_done: "Purchase completed.",
    shop_sell_done: "Sale completed.",
    drop_found: "Gear drop",
    drop_none: "No gear dropped this time.",
    tier_common: "Common",
    tier_rare: "Rare",
    tier_elite: "Elite",
    gear_blade: "Blade",
    gear_plate: "Plate",
    gear_array: "Scanner",
    workers_gold: "Credit workers",
    workers_supply: "Supply workers",
    workers_alloy: "Alloy workers",
    workers_assign: "Update",
    workers_invalid: "Invalid allocation. Total workers must equal 100.",
    workers_saved: "Worker allocation updated.",
    clan_assist_note: "Council assist activated in battle.",
    backend_title: "Shared Service Connection",
    backend_text: "Connect a free Supabase project for real shared multiplayer simulation.",
    backend_url: "Supabase URL",
    backend_key: "Supabase Anon Key",
    save_connect: "Save & Connect",
    close: "Close",
    connected_remote: "Connected to shared world layer (Supabase).",
    connected_local: "No external service set. Running local simulation mode.",
    connected_error: "Connection failed. Check URL/Key and table setup.",
    no_data: "No data yet.",
    stat_cp: "Command Points",
    stat_credits: "Credits",
    stat_supplies: "Supplies",
    stat_alloys: "Alloys",
    stat_intel: "Intel",
    stat_influence: "Influence",
    stat_mana: "Mana",
    stat_bank: "Bank",
    tips_next: "Next Tip",
    tips_skip: "Close",
    tip_landing_t: "Welcome",
    tip_landing_b: "Start here for quick entry and game pacing context.",
    tip_auth_t: "Quick Entry",
    tip_auth_b: "Submit details to build your local profile and continue.",
    tip_character_t: "Player Identity",
    tip_character_b: "These choices shape your early progression profile.",
    tip_faction_t: "Faction Fit",
    tip_faction_b: "Pick defense, offense, intel, or economy style.",
    tip_clan_t: "Council Layer",
    tip_clan_b: "Councils enable social coordination and shared season goals.",
    tip_dashboard_t: "Your Command Hub",
    tip_dashboard_b: "Review resources, rank, and live feed before acting.",
    tip_actions_t: "Turn Budget",
    tip_actions_b: "Only fire actions when you have command points and support resources.",
    tip_economy_t: "Economy Control",
    tip_economy_b: "Use bank and market tools to avoid shortages before combat cycles.",
    tip_city_t: "Long-Term Growth",
    tip_city_b: "City tier upgrades raise production and accelerate progression.",
  },
  ru: {
    nav_landing: "Главная",
    nav_flow: "Поток",
    nav_story: "История",
    nav_faq: "FAQ",
    nav_dashboard: "Панель",
    language: "Язык",
    backend_settings: "Сервер",
    hero_eyebrow: "Пошаговая браузерная стратегия",
    hero_title: "Построй командование, собери совет и веди сезон.",
    hero_subtitle: "Текстовая стратегия с экономикой, разведкой, ходами и PvP.",
    hero_cta_primary: "Начать",
    hero_cta_secondary: "Как это работает",
    hero_cta_story: "Читать историю",
    landing_card_1_title: "Стабильный ритм",
    landing_card_1_text: "Очки командования восстанавливаются по расписанию.",
    landing_card_2_title: "Цена решений",
    landing_card_2_text: "Рейды, разведка и тренировки тратят ресурсы.",
    landing_card_3_title: "Социальная игра",
    landing_card_3_text: "Советы координируют операции и рост команды.",
    flow_title: "Путь нового игрока",
    flow_1: "Регистрация и выбор языка.",
    flow_2: "Создание командира и стартовой черты.",
    flow_3: "Выбор фракции и создание/вход в совет.",
    flow_4: "Траты ходов на разведку, рейды, тренировки и рост.",
    flow_5: "Рост в личном и командном рейтинге сезона.",
    story_title: "История мира",
    story_p1: "После коллапса энергосети пять небесных городов разделились и начали борьбу за маршруты снабжения.",
    story_p2: "Каждый командир ведет совет, выбирает фракцию и удерживает баланс между войной и экономикой.",
    story_p3: "Сезон выигрывается не словами, а расчетом ходов, разведкой и координацией.",
    faq_title: "Частые вопросы",
    faq_q1: "Как часто восстанавливаются ходы?",
    faq_a1: "Очки командования восстанавливаются по фиксированному циклу и видны на панели.",
    faq_q2: "Зачем вступать в совет?",
    faq_a2: "Совет дает общую казну, роли, военную комнату и бонус поддержки в бою.",
    faq_q3: "Как идет прогресс по городам?",
    faq_a3: "Для повышения уровня города нужны мощь, разведка и ресурсы. Каждый уровень повышает добычу.",
    faq_q4: "Что сохраняется между сезонами?",
    faq_a4: "Снимки рейтинга сохраняются в архив. Активный прогресс кампании сбрасывается.",
    start_now: "Войти",
    auth_title: "Регистрация / Вход",
    auth_sub: "Для прототипа данные сохраняются локально в браузере.",
    email: "Email",
    password: "Пароль",
    auth_login: "Войти",
    auth_register: "Регистрация",
    auth_or: "или",
    auth_google: "Войти через Google",
    auth_logout: "Выйти",
    debug_btn: "Дебаг",
    debug_route: "Экран",
    debug_auth: "Авторизация",
    debug_backend: "Сервер",
    debug_commander: "Командир",
    auth_ok: "Вход выполнен успешно.",
    auth_logged_out: "Вы успешно вышли.",
    auth_register_ok: "Регистрация завершена. Подтвердите email при необходимости.",
    auth_fail: "Ошибка входа. Проверьте email и пароль.",
    auth_no_backend: "Защищенный вход доступен после подключения Supabase.",
    guard_need_login: "Сначала войдите в систему.",
    guard_need_character: "Сначала завершите создание персонажа.",
    guard_need_faction: "Сначала выберите фракцию.",
    continue: "Далее",
    character_title: "Создание персонажа",
    char_name: "Имя командира",
    char_origin: "Родной округ",
    origin_north: "Северный Релей",
    origin_delta: "Кольцо Дельты",
    origin_forge: "Кузнечный Бастион",
    origin_dunes: "Стеклянные Дюны",
    char_trait: "Стартовая черта",
    trait_strategist: "Стратег",
    trait_broker: "Брокер",
    trait_stalker: "Охотник разведки",
    trait_warden: "Страж фронтира",
    faction_title: "Выбор фракции",
    continue_to_clan: "Далее: Совет",
    clan_title: "Создать или вступить в совет",
    create_council: "Создать совет",
    join_council: "Вступить в совет",
    council_name: "Название совета",
    join_code: "Код вступления",
    create: "Создать",
    join: "Вступить",
    to_dashboard: "К панели",
    dashboard_title: "Главная панель",
    dash_actions: "Действия хода",
    dash_actions_text: "Выполняйте действия по доступным очкам и ресурсам.",
    dash_social: "Социальный слой",
    dash_social_text: "Координируйте операции совета и распределение ролей.",
    dash_progress: "Прогресс сезона",
    dash_progress_text: "Следите за рангом, мощью и темпом роста.",
    dash_economy: "Экономика и банк",
    dash_economy_text: "Используйте депозиты и рынок для стабильной экономики сезона.",
    dash_city: "Рост города",
    dash_city_text: "Повышайте уровень города для усиления добычи.",
    open_actions: "Открыть действия",
    open_social: "Открыть социал",
    open_progress: "Открыть прогресс",
    open_economy: "Открыть экономику",
    open_city: "Открыть город",
    live_leaderboard: "Живой рейтинг",
    live_leaderboard_sub: "Подключенные игроки (Supabase или локальная симуляция).",
    live_feed: "Лента мира",
    live_feed_sub: "Последние события ходов игроков.",
    actions_title: "Действия хода",
    target_player: "Цель (необязательно)",
    target_hint: "Разведка перед ударом повышает точность. После 5 ударов по цели выгода падает.",
    target_placeholder: "Например: Mira",
    action_scout: "Разведка",
    action_strike: "Тактический рейд",
    action_train: "Подготовка специалистов",
    action_ritual: "Ритуал маны",
    cost_2: "Цена: 2 очка",
    cost_3: "Цена: 3 очка",
    cost_4: "Цена: 4 очка",
    cost_mana: "Цена: 2 очка + 8 маны",
    social_title: "Социальная система",
    social_ops: "Операции совета",
    social_ops_text: "Согласованные цели усиливают сезонное влияние.",
    council_role_label: "Ваша роль",
    council_treasury_label: "Казна совета",
    council_deposit: "Внести в казну",
    council_withdraw: "Снять из казны",
    promote_member_label: "Повысить участника (до офицера)",
    promote_member_placeholder: "Имя командира",
    promote_member: "Повысить",
    social_chat: "Журнал координации",
    social_chat_text: "Фиксируйте боевые и экономические решения команды.",
    clan_rankings_title: "Рейтинг советов",
    war_room_title: "Военная комната",
    war_room_text: "Отмечайте цели совета и назначайте атакующих.",
    war_assign_placeholder: "Имя атакующего",
    war_add: "Добавить цель",
    war_added: "Цель добавлена в военную комнату.",
    war_denied: "Только лидер или офицер может добавлять цели.",
    war_empty: "Активных целей нет.",
    progress_title: "Экраны прогресса",
    season_archive_title: "Архив сезонов",
    rank_label: "Оценочный ранг",
    season_label: "День сезона",
    clan_created: "Совет успешно создан.",
    clan_joined: "Вы вступили в совет.",
    clan_missing: "Введите корректное имя или код.",
    need_points: "Недостаточно очков командования.",
    need_supply: "Недостаточно припасов для рейда.",
    need_alloy: "Недостаточно сплава для тренировки.",
    need_mana: "Недостаточно маны для этого действия.",
    log_scout: "Разведка завершена: разведданные и влияние выросли.",
    log_strike: "Рейд завершен: кредиты получены, припасы потрачены.",
    log_train: "Тренировка завершена: эффективность выросла.",
    log_ritual: "Ритуал завершен: мана преобразована во влияние и разведку.",
    intel_reports_title: "Последние разведотчеты",
    report_fresh: "Свежий отчет",
    report_old: "Устаревший отчет",
    strike_need_recon: "Атака без свежей разведки рискованна и менее эффективна.",
    strike_city_block: "Можно атаковать только цели того же уровня города.",
    strike_farmed: "Цель уже атакована 5 раз. Доступна только частичная добыча.",
    economy_title: "Экономика, банк и рынок",
    workers_title: "Распределение работников",
    workers_text: "Распределяйте работников между кредитами, припасами и сплавом.",
    bank_title: "Городской банк",
    bank_text: "Депозит защищает средства и дает пассивный прирост.",
    bank_deposit: "Депозит 200",
    bank_withdraw: "Снять 200",
    market_title: "Рынок снабжения",
    market_text: "Обменивайте сплав и кредиты под текущие задачи.",
    shop_title: "Магазин снаряжения",
    shop_text: "Снаряжение усиливает атаку, защиту и разведку. Можно продавать обратно.",
    shop_buy_blade: "Купить клинок",
    shop_buy_plate: "Купить броню",
    shop_buy_array: "Купить сканер",
    shop_sell_blade: "Продать клинок",
    shop_sell_plate: "Продать броню",
    shop_sell_array: "Продать сканер",
    market_buy_supplies: "Купить припасы",
    market_sell_alloys: "Продать сплав",
    city_title: "Уровень города",
    city_tier_label: "Текущий уровень",
    city_bonus_label: "Бонус добычи",
    city_gate_title: "Городские пороги",
    city_upgrade_text: "Улучшение требует кредиты и сплав, затем повышает добычу.",
    city_upgrade: "Улучшить город",
    city_next_label: "Следующий город",
    city_req_power: "Требуемая мощь",
    city_req_intel: "Требуемая разведка",
    city_req_credits: "Стоимость кредитов",
    city_req_alloys: "Стоимость сплава",
    city_multiplier_label: "Множитель добычи",
    city_max_reached: "Достигнут максимум города на этот сезон.",
    bank_low_credits: "Недостаточно кредитов для депозита.",
    bank_low_bank: "Недостаточно средств в банке.",
    bank_deposit_done: "Депозит выполнен. Баланс банка вырос.",
    bank_withdraw_done: "Снятие выполнено. Кредиты доступны.",
    market_buy_done: "Покупка припасов завершена.",
    market_sell_done: "Продажа сплава завершена.",
    market_low_credits: "Недостаточно кредитов для покупки.",
    market_low_alloys: "Недостаточно сплава для продажи.",
    city_upgrade_done: "Город улучшен. Бонус добычи вырос.",
    city_upgrade_fail: "Недостаточно ресурсов для улучшения.",
    target_none: "Без цели",
    pvp_win: "Победа в бою против",
    pvp_loss: "Поражение в бою против",
    pvp_draw: "Ничья в бою против",
    no_target: "Цель не выбрана.",
    no_council: "Вступите в совет, чтобы выполнить это действие.",
    treasury_deposit_done: "Пополнение казны выполнено.",
    treasury_withdraw_done: "Снятие из казны выполнено.",
    treasury_insufficient: "Недостаточно средств для операции.",
    treasury_denied: "Недостаточно прав для этой операции.",
    role_leader: "Лидер",
    role_officer: "Офицер",
    role_member: "Участник",
    promote_done: "Участник успешно повышен.",
    promote_denied: "Только лидер может повышать участников.",
    member_not_found: "Участник с таким именем не найден.",
    season_reset_done: "Начался новый сезон. Результаты прошлой кампании сохранены.",
    shop_no_credits: "Недостаточно кредитов для покупки.",
    shop_no_item: "У вас нет этого предмета.",
    shop_buy_done: "Покупка завершена.",
    shop_sell_done: "Продажа завершена.",
    drop_found: "Выпал предмет",
    drop_none: "Предмет не выпал.",
    tier_common: "Обычный",
    tier_rare: "Редкий",
    tier_elite: "Элитный",
    gear_blade: "Клинок",
    gear_plate: "Броня",
    gear_array: "Сканер",
    workers_gold: "Рабочие кредитов",
    workers_supply: "Рабочие припасов",
    workers_alloy: "Рабочие сплава",
    workers_assign: "Обновить",
    workers_invalid: "Неверное распределение. Сумма должна быть 100.",
    workers_saved: "Распределение работников обновлено.",
    clan_assist_note: "Активирована поддержка совета в бою.",
    backend_title: "Подключение общего сервиса",
    backend_text: "Подключите бесплатный Supabase для общей мультиплеерной симуляции.",
    backend_url: "Supabase URL",
    backend_key: "Supabase Anon Key",
    save_connect: "Сохранить и подключить",
    close: "Закрыть",
    connected_remote: "Подключено к общему миру (Supabase).",
    connected_local: "Внешний сервис не настроен. Работает локальная симуляция.",
    connected_error: "Ошибка подключения. Проверьте URL/Key и таблицы.",
    no_data: "Пока нет данных.",
    stat_cp: "Очки",
    stat_credits: "Кредиты",
    stat_supplies: "Припасы",
    stat_alloys: "Сплав",
    stat_intel: "Разведка",
    stat_influence: "Влияние",
    stat_mana: "Мана",
    stat_bank: "Банк",
    tips_next: "След. совет",
    tips_skip: "Закрыть",
    tip_landing_t: "Добро пожаловать",
    tip_landing_b: "Здесь быстрый старт и понимание ритма игры.",
    tip_auth_t: "Быстрый вход",
    tip_auth_b: "Введите данные, чтобы создать локальный профиль.",
    tip_character_t: "Профиль игрока",
    tip_character_b: "Выборы здесь формируют ранний стиль игры.",
    tip_faction_t: "Выбор фракции",
    tip_faction_b: "Выберите стиль: защита, атака, разведка или экономика.",
    tip_clan_t: "Слой советов",
    tip_clan_b: "Советы дают координацию и общие цели сезона.",
    tip_dashboard_t: "Ваш центр",
    tip_dashboard_b: "Проверяйте ресурсы, ранг и ленту перед действиями.",
    tip_actions_t: "Бюджет хода",
    tip_actions_b: "Запускайте действия только при достаточных очках и ресурсах.",
    tip_economy_t: "Контроль экономики",
    tip_economy_b: "Банк и рынок помогают избегать дефицита перед боями.",
    tip_city_t: "Долгий рост",
    tip_city_b: "Уровень города повышает добычу и ускоряет прогресс.",
  },
};

const factions = {
  he: [
    { id: "wardens", name: "משמר הכבלים", bonus: "+15% הגנה לוגיסטית" },
    { id: "embers", name: "ברית הגחלים", bonus: "+12% עוצמת פשיטה" },
    { id: "veil", name: "אריג הצל", bonus: "+20% רווח מודיעין" },
    { id: "compass", name: "בתי המצפן", bonus: "+12% הכנסות" },
  ],
  en: [
    { id: "wardens", name: "Cable Wardens", bonus: "+15% logistic defense" },
    { id: "embers", name: "Ember Pact", bonus: "+12% raid impact" },
    { id: "veil", name: "Veil Weave", bonus: "+20% intel gain" },
    { id: "compass", name: "Compass Houses", bonus: "+12% income" },
  ],
  ru: [
    { id: "wardens", name: "Стражи Кабеля", bonus: "+15% логистическая защита" },
    { id: "embers", name: "Пакт Углей", bonus: "+12% сила рейда" },
    { id: "veil", name: "Ткань Тени", bonus: "+20% разведданные" },
    { id: "compass", name: "Дома Компаса", bonus: "+12% доход" },
  ],
};

const botNames = ["Astra", "Nox", "Relay-7", "Vael", "Cinder", "Mira", "Talon", "Cobalt"];

const backend = {
  mode: "local",
  client: null,
  channel: null,
};

const state = {
  step: "landing",
  language: localStorage.getItem("mist-lang") || "he",
  user: loadUser(),
  authReady: false,
  authUserId: null,
  debugOpen: false,
  actionLock: false,
  backendStatus: "",
  leaderboard: [],
  feed: [],
  seasonArchive: [],
  warTargets: [],
  councilInfo: null,
  councilRole: "member",
  councilMemberCount: 0,
  tipsDisabled: localStorage.getItem("mist-tips-disabled") === "1",
  tipShown: {},
};

function defaultUser() {
  return {
    id: crypto.randomUUID(),
    email: "",
    commander: "",
    origin: "north",
    trait: "strategist",
    faction: "",
    council: "",
    code: "",
    commandPoints: 12,
    lastTick: Date.now(),
    credits: 1200,
    supplies: 840,
    alloys: 420,
    intel: 75,
    influence: 20,
    mana: 30,
    power: 110,
    bankGold: 0,
    cityTier: 1,
    seasonNumber: 1,
    gear: { blade: 0, plate: 0, array: 0 },
    tierGear: {
      blade: { common: 0, rare: 0, elite: 0 },
      plate: { common: 0, rare: 0, elite: 0 },
      array: { common: 0, rare: 0, elite: 0 },
    },
    workers: { gold: 34, supply: 33, alloy: 33 },
    reports: {},
    attackHistory: {},
    seasonStart: Date.now(),
  };
}

function loadUser() {
  try {
    const parsed = JSON.parse(localStorage.getItem("mist-user"));
    if (!parsed) return defaultUser();
    const merged = { ...defaultUser(), ...parsed };
    merged.gear = { ...defaultUser().gear, ...(parsed.gear || {}) };
    const baseTier = defaultUser().tierGear;
    merged.tierGear = {
      blade: { ...baseTier.blade, ...(parsed.tierGear?.blade || {}) },
      plate: { ...baseTier.plate, ...(parsed.tierGear?.plate || {}) },
      array: { ...baseTier.array, ...(parsed.tierGear?.array || {}) },
    };
    merged.workers = { ...defaultUser().workers, ...(parsed.workers || {}) };
    merged.reports = parsed.reports || {};
    merged.attackHistory = parsed.attackHistory || {};
    return merged;
  } catch {
    return defaultUser();
  }
}

function saveUser() {
  localStorage.setItem("mist-user", JSON.stringify(state.user));
}

function t(key) {
  return i18n[state.language][key] || key;
}

function setLanguage(lang) {
  state.language = lang;
  localStorage.setItem("mist-lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  translatePage();
  renderFactions();
  renderBackendStatus();
  refreshUI();
  maybeShowTip();
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });
}

function show(step) {
  navigate(step);
}

function renderScreen(step) {
  state.step = step;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === step);
  });
  refreshUI();
  maybeShowTip();
}

function hasCharacterProfile() {
  return Boolean(state.user.commander && state.user.commander.trim());
}

function isAuthenticated() {
  if (backend.mode !== "supabase") return true;
  return Boolean(state.authUserId);
}

function routeByAuth(requestedStep) {
  const publicRoutes = new Set(["landing", "guide", "story", "faq", "auth"]);
  const rawTarget = requestedStep || "landing";
  const target = KNOWN_SCREENS.has(rawTarget) ? rawTarget : "landing";

  if (!isAuthenticated()) {
    return publicRoutes.has(target) ? target : "auth";
  }

  if (!hasCharacterProfile()) {
    return "character";
  }

  return target === "auth" ? "dashboard" : target;
}

function navigate(step) {
  const next = routeByAuth(step || state.step || "landing");
  renderScreen(next);
}

function resetLocalProfileState() {
  localStorage.removeItem("mist-user");
  localStorage.removeItem(LOCAL_WORLD_KEY);
  state.user = defaultUser();
}

function renderAuthUi() {
  const logoutBtn = document.getElementById("logout-btn");
  if (!logoutBtn) return;
  logoutBtn.style.display = isAuthenticated() ? "inline-flex" : "none";
}

function renderDebugPanel() {
  const panel = document.getElementById("debug-panel");
  if (!panel) return;
  panel.classList.toggle("open", state.debugOpen);
  panel.setAttribute("aria-hidden", String(!state.debugOpen));
  document.getElementById("debug-route").textContent = state.step;
  document.getElementById("debug-auth").textContent = isAuthenticated() ? "yes" : "no";
  document.getElementById("debug-backend").textContent = backend.mode;
  document.getElementById("debug-commander").textContent = state.user.commander || "-";
}

function toggleDebugPanel() {
  state.debugOpen = !state.debugOpen;
  renderDebugPanel();
}

function setActionLock(locked) {
  state.actionLock = locked;
  document.body.classList.toggle("busy", locked);
}

function isLockedAction(action) {
  return new Set([
    "turn",
    "bank",
    "market",
    "upgrade-city",
    "council-treasury",
    "promote-member",
    "auth-register",
    "auth-login",
    "auth-google",
    "auth-logout",
    "shop",
    "workers-save",
    "war-add",
    "pick-faction",
  ]).has(action);
}

function assertGameplayReady() {
  if (!isAuthenticated()) {
    authStatus("guard_need_login");
    navigate("auth");
    return false;
  }
  if (!hasCharacterProfile()) {
    authStatus("guard_need_character");
    navigate("character");
    return false;
  }
  if (!state.user.faction) {
    authStatus("guard_need_faction");
    navigate("faction");
    return false;
  }
  return true;
}

function regen() {
  const now = Date.now();
  const gained = Math.floor((now - state.user.lastTick) / TICK_MS);
  if (gained > 0) {
    state.user.commandPoints = Math.min(MAX_COMMAND_POINTS, state.user.commandPoints + gained);
    const bonus = 1 + getCityBonus() / 100;
    const workers = state.user.workers || { gold: 34, supply: 33, alloy: 33 };
    state.user.credits += Math.floor(90 * gained * bonus * (workers.gold / 100));
    state.user.supplies += Math.floor(90 * gained * bonus * (workers.supply / 100));
    state.user.alloys += Math.floor(90 * gained * bonus * (workers.alloy / 100));
    state.user.mana = Math.min(240, (state.user.mana || 0) + 4 * gained);
    state.user.bankGold += Math.floor(state.user.bankGold * 0.01 * gained);
    state.user.lastTick += gained * TICK_MS;
    saveUser();
  }
}

function getSeasonDay() {
  const ms = Date.now() - state.user.seasonStart;
  return Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

function getRank() {
  const score = state.user.power * 3 + state.user.intel * 2 + state.user.influence * 4 + state.user.credits / 20;
  if (score > 3800) return 12;
  if (score > 3000) return 24;
  if (score > 2200) return 45;
  if (score > 1600) return 80;
  return 140;
}

function getCityBonus() {
  const stage = CITY_STAGES.find((s) => s.tier === state.user.cityTier) || CITY_STAGES[0];
  return Math.round((stage.multiplier - 1) * 100);
}

function getCityStage(tier) {
  return CITY_STAGES.find((s) => s.tier === tier) || CITY_STAGES[0];
}

function getNextCityStage() {
  return CITY_STAGES.find((s) => s.tier === state.user.cityTier + 1) || null;
}

function openSettings(open) {
  const panel = document.getElementById("settings-panel");
  panel.classList.toggle("open", open);
  panel.setAttribute("aria-hidden", String(!open));
}

function tipsForStep(step) {
  const map = {
    landing: ["tip_landing_t", "tip_landing_b"],
    auth: ["tip_auth_t", "tip_auth_b"],
    character: ["tip_character_t", "tip_character_b"],
    faction: ["tip_faction_t", "tip_faction_b"],
    clan: ["tip_clan_t", "tip_clan_b"],
    dashboard: ["tip_dashboard_t", "tip_dashboard_b"],
    actions: ["tip_actions_t", "tip_actions_b"],
    economy: ["tip_economy_t", "tip_economy_b"],
    city: ["tip_city_t", "tip_city_b"],
  };
  return map[step] || null;
}

function maybeShowTip(force = false) {
  const wrap = document.getElementById("onboarding");
  if (state.tipsDisabled || (!force && state.tipShown[state.step])) {
    wrap.classList.remove("open");
    return;
  }

  const pair = tipsForStep(state.step);
  if (!pair) {
    wrap.classList.remove("open");
    return;
  }

  document.getElementById("onboarding-title").textContent = t(pair[0]);
  document.getElementById("onboarding-text").textContent = t(pair[1]);
  wrap.classList.add("open");
  state.tipShown[state.step] = true;
}

function hideTipsForever() {
  state.tipsDisabled = true;
  localStorage.setItem("mist-tips-disabled", "1");
  document.getElementById("onboarding").classList.remove("open");
}

function refreshUI() {
  regen();
  renderAuthUi();
  renderDebugPanel();
  renderStats();
  document.getElementById("rank-value").textContent = `#${getRank()}`;
  document.getElementById("season-value").textContent = String(getSeasonDay());
  const cityTier = document.getElementById("city-tier");
  if (cityTier) cityTier.textContent = String(state.user.cityTier);
  const cityBonus = document.getElementById("city-bonus");
  if (cityBonus) cityBonus.textContent = `+${getCityBonus()}%`;
  renderLeaderboard();
  renderFeed();
  renderTargetOptions();
  renderWarTargetSelect();
  renderSocialPanel();
  renderSeasonArchive();
  renderIntelReports();
  renderGearStats();
  renderWorkersPanel();
  renderClanRankings();
  renderCityRequirements();
  renderWarRoom();
}

function renderStats() {
  const stats = document.getElementById("stats");
  if (!stats) return;
  const rows = [
    { label: t("stat_cp"), value: state.user.commandPoints, icon: "assets/icons/power.svg" },
    { label: t("stat_credits"), value: state.user.credits, icon: "assets/icons/gold.svg" },
    { label: t("stat_bank"), value: state.user.bankGold, icon: "assets/icons/bank.svg" },
    { label: t("stat_supplies"), value: state.user.supplies, icon: "assets/icons/food.svg" },
    { label: t("stat_alloys"), value: state.user.alloys, icon: "assets/icons/iron.svg" },
    { label: t("stat_intel"), value: state.user.intel, icon: "assets/icons/intel.svg" },
    { label: t("stat_influence"), value: state.user.influence, icon: "assets/icons/wood.svg" },
    { label: t("stat_mana"), value: state.user.mana || 0, icon: "assets/icons/mana.svg" },
  ];

  stats.innerHTML = "";
  rows.forEach((row) => {
    const node = document.createElement("div");
    node.className = "stat";
    node.innerHTML = `<div class="k"><img class="stat-icon" src="${row.icon}" alt="">${row.label}</div><div class="v">${Number(row.value).toLocaleString()}</div>`;
    stats.appendChild(node);
  });
}

function renderFactions() {
  const wrap = document.getElementById("faction-cards");
  wrap.innerHTML = "";
  factions[state.language].forEach((f) => {
    const btn = document.createElement("button");
    btn.className = "action-card";
    btn.dataset.action = "pick-faction";
    btn.dataset.value = f.id;
    btn.innerHTML = `<strong>${f.name}</strong><span>${f.bonus}</span>`;
    if (state.user.faction === f.id) btn.style.borderColor = "var(--accent)";
    wrap.appendChild(btn);
  });
}

function renderBackendStatus() {
  const status = document.getElementById("backend-status");
  status.textContent = state.backendStatus || (backend.mode === "supabase" ? t("connected_remote") : t("connected_local"));
}

function renderLeaderboard() {
  const wrap = document.getElementById("leaderboard");
  wrap.innerHTML = "";
  const rows = state.leaderboard.slice(0, 8);
  if (!rows.length) {
    wrap.innerHTML = `<div class="row-item"><span>${t("no_data")}</span></div>`;
    return;
  }

  rows.forEach((row, idx) => {
    const name = row.commander || row.player_name || "-";
    const power = row.power || 0;
    const item = document.createElement("div");
    item.className = "row-item";
    item.innerHTML = `<span>#${idx + 1} ${escapeHtml(name)}</span><span class="minor">${Number(power).toLocaleString()}</span>`;
    wrap.appendChild(item);
  });
}

function renderFeed() {
  const wrap = document.getElementById("feed");
  wrap.innerHTML = "";
  const rows = state.feed.slice(0, 8);
  if (!rows.length) {
    wrap.innerHTML = `<div class="row-item"><span>${t("no_data")}</span></div>`;
    return;
  }
  rows.forEach((row) => {
    const item = document.createElement("div");
    item.className = "row-item";
    const msg = row.summary || row.message || "-";
    const actor = row.commander || row.player_name || "-";
    item.innerHTML = `<span>${escapeHtml(actor)}: ${escapeHtml(msg)}</span>`;
    wrap.appendChild(item);
  });
}

function renderTargetOptions() {
  const select = document.getElementById("actionTargetSelect");
  if (!select) return;
  const current = select.value;
  const options = state.leaderboard.filter((row) => row.player_id !== state.user.id);
  select.innerHTML = `<option value="">${t("target_none")}</option>`;
  options.forEach((row) => {
    const option = document.createElement("option");
    option.value = row.player_id;
    option.textContent = `${row.commander || "-"} (#${row.power || 0})`;
    select.appendChild(option);
  });
  if ([...select.options].some((x) => x.value === current)) {
    select.value = current;
  }
  updateTargetHint();
}

function renderWarTargetSelect() {
  const select = document.getElementById("warTargetSelect");
  if (!select) return;
  const current = select.value;
  const targets = state.leaderboard.filter((row) => row.player_id !== state.user.id);
  select.innerHTML = `<option value="">${t("target_none")}</option>`;
  targets.forEach((row) => {
    const option = document.createElement("option");
    option.value = row.player_id;
    option.textContent = `${row.commander || "-"} (#${row.power || 0})`;
    select.appendChild(option);
  });
  if ([...select.options].some((x) => x.value === current)) select.value = current;
}

function updateTargetHint() {
  const hint = document.getElementById("target-hint");
  const select = document.getElementById("actionTargetSelect");
  if (!hint || !select) return;
  const target = findTargetPlayer(select.value);
  if (!target) {
    hint.textContent = t("target_hint");
    return;
  }
  const report = getReportForTarget(target.player_id);
  const status = report && Date.now() - report.timestamp < 60 * 60 * 1000 ? t("report_fresh") : t("report_old");
  const city = target.city_tier || 1;
  hint.textContent = `${status} · City ${city} · ${t("target_hint")}`;
}

function renderSocialPanel() {
  const role = document.getElementById("council-role");
  const treasury = document.getElementById("council-treasury");
  if (!role || !treasury) return;
  const roleMap = {
    leader: t("role_leader"),
    officer: t("role_officer"),
    member: t("role_member"),
  };
  role.textContent = roleMap[state.councilRole] || roleMap.member;
  treasury.textContent = Number(state.councilInfo?.treasury || 0).toLocaleString();
}

function renderSeasonArchive() {
  const wrap = document.getElementById("season-archive");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!state.seasonArchive.length) {
    wrap.innerHTML = `<div class="row-item"><span>${t("no_data")}</span></div>`;
    return;
  }
  state.seasonArchive.slice(0, 8).forEach((row) => {
    const item = document.createElement("div");
    item.className = "row-item";
    item.innerHTML = `<span>S${row.season_number} · ${escapeHtml(row.commander)}</span><span class="minor">${row.rank_position}</span>`;
    wrap.appendChild(item);
  });
}

function renderCityRequirements() {
  const wrap = document.getElementById("city-reqs");
  if (!wrap) return;
  const next = getNextCityStage();
  const current = getCityStage(state.user.cityTier);
  if (!next) {
    wrap.innerHTML = `<div class="row-item"><span>${t("city_max_reached")}</span><span class="minor">x${current.multiplier.toFixed(1)}</span></div>`;
    return;
  }
  wrap.innerHTML = "";
  const rows = [
    [t("city_next_label"), `T${next.tier}`],
    [t("city_multiplier_label"), `x${next.multiplier.toFixed(1)}`],
    [t("city_req_power"), `${state.user.power}/${next.needPower}`],
    [t("city_req_intel"), `${state.user.intel}/${next.needIntel}`],
    [t("city_req_credits"), `${state.user.credits}/${next.costCredits}`],
    [t("city_req_alloys"), `${state.user.alloys}/${next.costAlloys}`],
  ];
  rows.forEach(([k, v]) => {
    const item = document.createElement("div");
    item.className = "row-item";
    item.innerHTML = `<span>${k}</span><span class="minor">${v}</span>`;
    wrap.appendChild(item);
  });
}

function renderWarRoom() {
  const wrap = document.getElementById("war-room-list");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!state.warTargets.length) {
    wrap.innerHTML = `<div class="row-item"><span>${t("war_empty")}</span></div>`;
    return;
  }
  state.warTargets.slice(0, 8).forEach((row) => {
    const item = document.createElement("div");
    item.className = "row-item";
    const assignee = row.assigned_to || "-";
    item.innerHTML = `<span>${escapeHtml(row.target_commander || row.target_player_id || "-")}</span><span class="minor">${escapeHtml(assignee)}</span>`;
    wrap.appendChild(item);
  });
}

function renderIntelReports() {
  const wrap = document.getElementById("intel-reports");
  if (!wrap) return;
  wrap.innerHTML = "";
  const entries = Object.entries(state.user.reports || {})
    .map(([playerId, report]) => ({ playerId, ...report }))
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 6);

  if (!entries.length) {
    wrap.innerHTML = `<div class="row-item"><span>${t("no_data")}</span></div>`;
    return;
  }

  entries.forEach((report) => {
    const ageMs = Date.now() - report.timestamp;
    const fresh = ageMs < 60 * 60 * 1000;
    const title = `${report.commander || "-"} · P:${report.power} I:${report.intel}`;
    const item = document.createElement("div");
    item.className = "row-item";
    item.innerHTML = `<span>${escapeHtml(title)}</span><span class="minor">${fresh ? t("report_fresh") : t("report_old")}</span>`;
    wrap.appendChild(item);
  });
}

function renderGearStats() {
  const wrap = document.getElementById("gear-stats");
  if (!wrap) return;
  const tg = state.user.tierGear || defaultUser().tierGear;
  const rows = [
    [t("gear_blade"), state.user.gear?.blade || 0],
    [t("gear_plate"), state.user.gear?.plate || 0],
    [t("gear_array"), state.user.gear?.array || 0],
    [`${t("gear_blade")} · ${t("tier_common")}/${t("tier_rare")}/${t("tier_elite")}`, `${tg.blade.common}/${tg.blade.rare}/${tg.blade.elite}`],
    [`${t("gear_plate")} · ${t("tier_common")}/${t("tier_rare")}/${t("tier_elite")}`, `${tg.plate.common}/${tg.plate.rare}/${tg.plate.elite}`],
    [`${t("gear_array")} · ${t("tier_common")}/${t("tier_rare")}/${t("tier_elite")}`, `${tg.array.common}/${tg.array.rare}/${tg.array.elite}`],
  ];
  wrap.innerHTML = "";
  rows.forEach(([k, v]) => {
    const item = document.createElement("div");
    item.className = "row-item";
    item.innerHTML = `<span>${k}</span><span class="minor">${v}</span>`;
    wrap.appendChild(item);
  });
}

function renderWorkersPanel() {
  const wrap = document.getElementById("workers-panel");
  if (!wrap) return;
  const w = state.user.workers || { gold: 34, supply: 33, alloy: 33 };
  wrap.innerHTML = `
    <div class="row-item"><span>${t("workers_gold")}</span><input id="workers-gold" type="number" min="0" max="100" value="${w.gold}"></div>
    <div class="row-item"><span>${t("workers_supply")}</span><input id="workers-supply" type="number" min="0" max="100" value="${w.supply}"></div>
    <div class="row-item"><span>${t("workers_alloy")}</span><input id="workers-alloy" type="number" min="0" max="100" value="${w.alloy}"></div>
    <button class="btn btn-secondary" data-action="workers-save">${t("workers_assign")}</button>
  `;
}

function renderClanRankings() {
  const wrap = document.getElementById("clan-rankings");
  if (!wrap) return;
  wrap.innerHTML = "";
  const scores = new Map();
  state.leaderboard.forEach((p) => {
    const key = p.council_code || p.council || "-";
    if (key === "-") return;
    scores.set(key, (scores.get(key) || 0) + (p.power || 0));
  });
  const rows = [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!rows.length) {
    wrap.innerHTML = `<div class="row-item"><span>${t("no_data")}</span></div>`;
    return;
  }
  rows.forEach(([name, score], idx) => {
    const item = document.createElement("div");
    item.className = "row-item";
    item.innerHTML = `<span>#${idx + 1} ${escapeHtml(name)}</span><span class="minor">${Number(score).toLocaleString()}</span>`;
    wrap.appendChild(item);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function spendPoints(cost) {
  regen();
  if (state.user.commandPoints < cost) return false;
  state.user.commandPoints -= cost;
  return true;
}

function findTargetPlayer(targetId) {
  return state.leaderboard.find((row) => row.player_id === targetId) || null;
}

function getReportForTarget(targetId) {
  return (state.user.reports || {})[targetId] || null;
}

function setReportForTarget(target) {
  state.user.reports = state.user.reports || {};
  state.user.reports[target.player_id] = {
    commander: target.commander,
    power: target.power || 0,
    intel: target.intel || 0,
    influence: target.influence || 0,
    cityTier: target.city_tier || 1,
    timestamp: Date.now(),
  };
}

function attackCountForTarget(targetId) {
  return (state.user.attackHistory || {})[targetId] || 0;
}

function increaseAttackCount(targetId) {
  state.user.attackHistory = state.user.attackHistory || {};
  state.user.attackHistory[targetId] = attackCountForTarget(targetId) + 1;
}

function getGearBonus() {
  const gear = state.user.gear || { blade: 0, plate: 0, array: 0 };
  const tg = state.user.tierGear || defaultUser().tierGear;
  const tierWeight = (slot) => tg[slot].common * 1 + tg[slot].rare * 3 + tg[slot].elite * 6;
  return {
    attack: gear.blade * 6 + tierWeight("blade"),
    defense: gear.plate * 6 + tierWeight("plate"),
    intel: gear.array * 6 + tierWeight("array"),
  };
}

function getClanAssistBonus(target) {
  if (!state.user.code || !target) return { value: 0, active: false };
  if ((target.council_code || target.council || "") === state.user.code) return { value: 0, active: false };
  const treasuryBoost = Math.min(20, Math.floor((state.councilInfo?.treasury || 0) / 500));
  const memberBoost = Math.min(20, (state.councilMemberCount || 0) * 2);
  const total = treasuryBoost + memberBoost;
  return { value: total, active: total > 0 };
}

function rollPvpDrop() {
  const r = Math.random();
  let tier = null;
  if (r < 0.5) tier = "common";
  else if (r < 0.75) tier = "rare";
  else if (r < 0.85) tier = "elite";
  if (!tier) return null;

  const slots = ["blade", "plate", "array"];
  const slot = slots[Math.floor(Math.random() * slots.length)];
  state.user.tierGear = state.user.tierGear || defaultUser().tierGear;
  state.user.tierGear[slot][tier] += 1;
  return { slot, tier };
}

async function applyTargetDamage(target, deltaPower) {
  if (!target || !deltaPower) return;
  if (backend.mode === "supabase") {
    const nextPower = Math.max(0, (target.power || 0) + deltaPower);
    await backend.client.from("world_players").update({ power: nextPower }).eq("player_id", target.player_id);
    return;
  }
  const world = getLocalWorld();
  const player = world.players.find((p) => p.player_id === target.player_id);
  if (player) player.power = Math.max(0, (player.power || 0) + deltaPower);
  saveLocalWorld(world);
}

async function resolvePvpStrike(target) {
  if (!target) return t("no_target");
  if ((target.city_tier || 1) !== state.user.cityTier) return t("strike_city_block");

  const report = getReportForTarget(target.player_id);
  const hasFreshRecon = report && Date.now() - report.timestamp < 60 * 60 * 1000;
  const reconBonus = hasFreshRecon ? 24 : -18;
  const gear = getGearBonus();
  const clanAssist = getClanAssistBonus(target);
  const attackScore = state.user.power + state.user.intel * 0.45 + Math.random() * 40 + getCityBonus() + reconBonus + gear.attack + clanAssist.value;
  const defenseScore = (target.power || 0) + (target.intel || 0) * 0.3 + (target.influence || 0) * 0.2 + Math.random() * 35 + gear.defense;
  const diff = attackScore - defenseScore;
  const repeated = attackCountForTarget(target.player_id) >= 5;

  if (diff > 30) {
    const lootBase = 160 + Math.floor(Math.random() * 90);
    const loot = repeated ? Math.floor(lootBase * 0.35) : lootBase;
    state.user.credits += loot;
    state.user.power += 10;
    await applyTargetDamage(target, -12);
    increaseAttackCount(target.player_id);
    const drop = rollPvpDrop();
    const warning = hasFreshRecon ? "" : ` ${t("strike_need_recon")}`;
    const farm = repeated ? ` ${t("strike_farmed")}` : "";
    const assist = clanAssist.active ? ` ${t("clan_assist_note")}` : "";
    const dropText = drop
      ? ` ${t("drop_found")}: ${t(`gear_${drop.slot}`)} ${t(`tier_${drop.tier}`)}.`
      : ` ${t("drop_none")}`;
    return `${t("pvp_win")} ${target.commander} (+${loot}).${warning}${farm}${assist}${dropText}`;
  }
  if (diff < -30) {
    state.user.power = Math.max(0, state.user.power - 10);
    state.user.supplies = Math.max(0, state.user.supplies - 60);
    await applyTargetDamage(target, 4);
    increaseAttackCount(target.player_id);
    const warning = hasFreshRecon ? "" : ` ${t("strike_need_recon")}`;
    const assist = clanAssist.active ? ` ${t("clan_assist_note")}` : "";
    return `${t("pvp_loss")} ${target.commander}.${warning}${assist}`;
  }
  state.user.power += 1;
  await applyTargetDamage(target, -2);
  increaseAttackCount(target.player_id);
  const warning = hasFreshRecon ? "" : ` ${t("strike_need_recon")}`;
  const assist = clanAssist.active ? ` ${t("clan_assist_note")}` : "";
  return `${t("pvp_draw")} ${target.commander}.${warning}${assist}`;
}

async function doAction(type) {
  const log = document.getElementById("action-log");
  const targetId = document.getElementById("actionTargetSelect")?.value;
  const targetPlayer = findTargetPlayer(targetId);
  const effects = {
    scout: () => {
      if (!spendPoints(2)) return t("need_points");
      const gain = targetPlayer ? 18 : 14;
      state.user.intel += 14 + Math.floor((state.user.gear?.array || 0) * 1.5);
      state.user.influence += 7;
      state.user.power += 2;
      state.user.intel += gain - 14;
      if (targetPlayer) {
        setReportForTarget(targetPlayer);
      }
      return targetPlayer ? `${t("log_scout")} [${targetPlayer.commander}]` : t("log_scout");
    },
    strike: async () => {
      if (!spendPoints(4)) return t("need_points");
      if (state.user.supplies < 90) return t("need_supply");
      state.user.supplies -= 90;
      if (!targetPlayer) {
        state.user.credits += 190;
        state.user.power += 9;
        return t("log_strike");
      }
      return resolvePvpStrike(targetPlayer);
    },
    train: () => {
      if (!spendPoints(3)) return t("need_points");
      if (state.user.alloys < 35) return t("need_alloy");
      state.user.alloys -= 35;
      state.user.power += 12;
      return t("log_train");
    },
    ritual: () => {
      if (!spendPoints(2)) return t("need_points");
      if ((state.user.mana || 0) < 8) return t("need_mana");
      state.user.mana -= 8;
      state.user.influence += 10;
      state.user.intel += 6;
      return t("log_ritual");
    },
  };

  const summary = await effects[type]();
  log.textContent = summary;
  saveUser();
  await syncPresence();
  await publishWorldEvent(type, summary);
  await refreshWorldPanels();
  refreshUI();
}

function getBackendConfig() {
  const saved = JSON.parse(localStorage.getItem("mist-backend") || "{}");
  const envConfig = window.GAME_CONFIG || {};
  return {
    url: saved.url || envConfig.supabaseUrl || "",
    key: saved.key || envConfig.supabaseAnonKey || "",
  };
}

function saveBackendConfig(url, key) {
  localStorage.setItem("mist-backend", JSON.stringify({ url, key }));
}

async function initBackend() {
  const config = getBackendConfig();
  document.getElementById("supabaseUrl").value = config.url;
  document.getElementById("supabaseAnonKey").value = config.key;

  if (!config.url || !config.key || !window.supabase?.createClient) {
    backend.mode = "local";
    state.authReady = true;
    state.authUserId = state.user.id;
    state.backendStatus = t("connected_local");
    seedLocalWorld();
    await refreshWorldPanels();
    renderBackendStatus();
    return;
  }

  try {
    backend.client = window.supabase.createClient(config.url, config.key, {
      auth: { persistSession: true },
    });

    const ping = await backend.client.from("world_actions").select("id", { count: "exact", head: true });
    if (ping.error) throw ping.error;

    backend.mode = "supabase";
    state.backendStatus = t("connected_remote");
    backend.client.auth.onAuthStateChange(async (_event, session) => {
      await applyAuthSession(session, { silentIfMissing: true, statusOnSuccess: "auth_ok" });
    });
    wireRealtime();
    await pullAuthSession();
    await refreshWorldPanels();
  } catch {
    backend.mode = "local";
    state.authReady = true;
    state.authUserId = state.user.id;
    state.backendStatus = t("connected_error");
    seedLocalWorld();
    await refreshWorldPanels();
  }
  renderBackendStatus();
}

function wireRealtime() {
  if (backend.channel) backend.client.removeChannel(backend.channel);
  backend.channel = backend.client
    .channel("public:world_actions")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "world_actions" }, async () => {
      await refreshWorldPanels();
    })
    .subscribe();
}

async function syncPresence() {
  if (backend.mode === "supabase") {
    if (!isAuthenticated()) return;
    const payload = {
      player_id: state.user.id,
      commander: state.user.commander || state.user.email || "Commander",
      faction: state.user.faction || "none",
      council: state.user.council || null,
      council_code: state.user.code || null,
      power: state.user.power,
      intel: state.user.intel,
      influence: state.user.influence,
      city_tier: state.user.cityTier,
      season_number: state.user.seasonNumber,
      updated_at: new Date().toISOString(),
    };
    await backend.client.from("world_players").upsert(payload, { onConflict: "player_id" });
    return;
  }
  updateLocalWorldPlayer();
}

async function publishWorldEvent(type, summary) {
  if (backend.mode === "supabase") {
    await backend.client.from("world_actions").insert({
      player_id: state.user.id,
      commander: state.user.commander || state.user.email || "Commander",
      action_type: type,
      summary,
      created_at: new Date().toISOString(),
    });
    return;
  }
  pushLocalFeed({
    commander: state.user.commander || "Commander",
    action_type: type,
    summary,
    created_at: new Date().toISOString(),
  });
}

async function refreshWorldPanels() {
  if (backend.mode === "supabase") {
    const [lb, fd] = await Promise.all([
      backend.client.from("world_players").select("player_id,commander,power,intel,influence,council,city_tier").order("power", { ascending: false }).limit(10),
      backend.client.from("world_actions").select("commander,summary,created_at").order("created_at", { ascending: false }).limit(12),
    ]);
    state.leaderboard = lb.data || [];
    state.feed = fd.data || [];
    await loadCouncilInfo();
    await loadSeasonArchive();
    await loadWarTargets();
    return;
  }
  tickLocalWorld();
  const world = getLocalWorld();
  state.leaderboard = [...world.players].sort((a, b) => b.power - a.power).slice(0, 10);
  state.feed = [...world.actions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 12);
  state.seasonArchive = [...(world.seasonArchive || [])].sort((a, b) => b.season_number - a.season_number);
  loadLocalCouncilInfo();
  state.warTargets = [...(world.warTargets || [])]
    .filter((w) => !state.user.code || w.council_code === state.user.code)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function getLocalWorld() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_WORLD_KEY)) || { players: [], actions: [], councils: [], members: [], warTargets: [], seasonArchive: [], lastSim: Date.now() };
  } catch {
    return { players: [], actions: [], councils: [], members: [], warTargets: [], seasonArchive: [], lastSim: Date.now() };
  }
}

function saveLocalWorld(world) {
  localStorage.setItem(LOCAL_WORLD_KEY, JSON.stringify(world));
}

function seedLocalWorld() {
  const world = getLocalWorld();
  if (world.players.length) return;
  world.players = botNames.map((name, idx) => ({
    player_id: `bot-${idx + 1}`,
    commander: name,
    power: 90 + idx * 22,
    intel: 40 + idx * 5,
    influence: 20 + idx * 4,
    city_tier: 1 + (idx % 3),
  }));
  world.actions = [
    { commander: "Astra", summary: "Performed scouting route.", created_at: new Date().toISOString() },
  ];
  world.lastSim = Date.now();
  saveLocalWorld(world);
}

function updateLocalWorldPlayer() {
  const world = getLocalWorld();
  const name = state.user.commander || state.user.email || "Commander";
  const existing = world.players.find((p) => p.player_id === state.user.id);
  if (existing) {
    existing.commander = name;
    existing.power = state.user.power;
    existing.intel = state.user.intel;
    existing.influence = state.user.influence;
    existing.council_code = state.user.code || null;
    existing.city_tier = state.user.cityTier;
  } else {
    world.players.push({
      player_id: state.user.id,
      commander: name,
      power: state.user.power,
      intel: state.user.intel,
      influence: state.user.influence,
      council_code: state.user.code || null,
      city_tier: state.user.cityTier,
    });
  }
  saveLocalWorld(world);
}

function pushLocalFeed(entry) {
  const world = getLocalWorld();
  world.actions.push(entry);
  world.actions = world.actions.slice(-50);
  saveLocalWorld(world);
}

function tickLocalWorld() {
  const world = getLocalWorld();
  const now = Date.now();
  if (now - world.lastSim < 20000) return;
  world.lastSim = now;
  world.players.forEach((p) => {
    if (p.player_id.startsWith("bot-")) p.power += Math.floor(Math.random() * 12);
  });
  const actor = world.players.filter((p) => p.player_id.startsWith("bot-"))[Math.floor(Math.random() * botNames.length)];
  if (actor) {
    const list = ["Launched patrol.", "Finished training cycle.", "Ran tactical raid."];
    world.actions.push({ commander: actor.commander, summary: list[Math.floor(Math.random() * list.length)], created_at: new Date().toISOString() });
    world.actions = world.actions.slice(-50);
  }
  saveLocalWorld(world);
}

async function createCouncil(name) {
  if (backend.mode === "supabase") {
    const code = Math.random().toString(36).slice(2, 10).toUpperCase();
    const { error } = await backend.client.from("world_councils").insert({
      council_code: code,
      council_name: name,
      leader_id: state.user.id,
      treasury: 0,
    });
    if (error) return null;
    await backend.client.from("world_council_members").upsert({
      council_code: code,
      player_id: state.user.id,
      commander: state.user.commander || state.user.email || "Commander",
      role: "leader",
    });
    state.councilRole = "leader";
    return code;
  }
  const world = getLocalWorld();
  const code = Math.random().toString(36).slice(2, 10).toUpperCase();
  world.councils.push({ council_code: code, council_name: name, leader_id: state.user.id, treasury: 0 });
  world.members.push({ council_code: code, player_id: state.user.id, commander: state.user.commander || "Commander", role: "leader" });
  saveLocalWorld(world);
  state.councilRole = "leader";
  return code;
}

async function joinCouncil(code) {
  if (backend.mode === "supabase") {
    const { data } = await backend.client.from("world_councils").select("council_name").eq("council_code", code).single();
    if (data?.council_name) {
      await backend.client.from("world_council_members").upsert({
        council_code: code,
        player_id: state.user.id,
        commander: state.user.commander || state.user.email || "Commander",
        role: "member",
      });
      state.councilRole = "member";
    }
    return data?.council_name || null;
  }
  const world = getLocalWorld();
  const council = world.councils.find((c) => c.council_code === code);
  if (!council) return null;
  const member = world.members.find((m) => m.council_code === code && m.player_id === state.user.id);
  if (!member) {
    world.members.push({ council_code: code, player_id: state.user.id, commander: state.user.commander || "Commander", role: "member" });
    saveLocalWorld(world);
  }
  state.councilRole = "member";
  return council.council_name;
}

async function loadCouncilInfo() {
  if (!state.user.code) {
    state.councilInfo = null;
    state.councilRole = "member";
    return;
  }
  if (backend.mode === "supabase") {
    const [councilRes, memberRes, membersRes] = await Promise.all([
      backend.client.from("world_councils").select("council_code,council_name,treasury").eq("council_code", state.user.code).maybeSingle(),
      backend.client.from("world_council_members").select("role").eq("council_code", state.user.code).eq("player_id", state.user.id).maybeSingle(),
      backend.client.from("world_council_members").select("player_id", { count: "exact", head: true }).eq("council_code", state.user.code),
    ]);
    state.councilInfo = councilRes.data || null;
    state.councilRole = memberRes.data?.role || "member";
    state.councilMemberCount = membersRes.count || 0;
    return;
  }
  loadLocalCouncilInfo();
}

function loadLocalCouncilInfo() {
  const world = getLocalWorld();
  if (!state.user.code) {
    state.councilInfo = null;
    state.councilRole = "member";
    return;
  }
  state.councilInfo = world.councils.find((c) => c.council_code === state.user.code) || null;
  state.councilRole = world.members.find((m) => m.council_code === state.user.code && m.player_id === state.user.id)?.role || "member";
  state.councilMemberCount = world.members.filter((m) => m.council_code === state.user.code).length;
}

async function doBank(type) {
  const log = document.getElementById("economy-log");
  if (type === "deposit") {
    if (state.user.credits < 200) {
      log.textContent = t("bank_low_credits");
      return;
    }
    state.user.credits -= 200;
    state.user.bankGold += 200;
    log.textContent = t("bank_deposit_done");
  }
  if (type === "withdraw") {
    if (state.user.bankGold < 200) {
      log.textContent = t("bank_low_bank");
      return;
    }
    state.user.bankGold -= 200;
    state.user.credits += 200;
    log.textContent = t("bank_withdraw_done");
  }
  saveUser();
  await syncPresence();
  refreshUI();
}

async function doMarket(type) {
  const log = document.getElementById("economy-log");
  if (type === "buy-supplies") {
    if (state.user.credits < 120) {
      log.textContent = t("market_low_credits");
      return;
    }
    state.user.credits -= 120;
    state.user.supplies += 180;
    log.textContent = t("market_buy_done");
  }
  if (type === "sell-alloys") {
    if (state.user.alloys < 50) {
      log.textContent = t("market_low_alloys");
      return;
    }
    state.user.alloys -= 50;
    state.user.credits += 140;
    log.textContent = t("market_sell_done");
  }
  saveUser();
  await syncPresence();
  refreshUI();
}

async function doCityUpgrade() {
  const log = document.getElementById("city-log");
  const next = getNextCityStage();
  if (!next) {
    log.textContent = t("city_max_reached");
    return;
  }
  if (
    state.user.power < next.needPower ||
    state.user.intel < next.needIntel ||
    state.user.credits < next.costCredits ||
    state.user.alloys < next.costAlloys
  ) {
    log.textContent = t("city_upgrade_fail");
    return;
  }
  state.user.credits -= next.costCredits;
  state.user.alloys -= next.costAlloys;
  state.user.cityTier += 1;
  log.textContent = t("city_upgrade_done");
  saveUser();
  await syncPresence();
  refreshUI();
}

function itemCost(item) {
  const map = {
    blade: { buy: 280, sell: 120 },
    plate: { buy: 280, sell: 120 },
    array: { buy: 320, sell: 140 },
  };
  return map[item];
}

async function doShop(item, mode) {
  const log = document.getElementById("economy-log");
  const cost = itemCost(item);
  if (!cost) return;
  state.user.gear = state.user.gear || { blade: 0, plate: 0, array: 0 };

  if (mode === "buy") {
    if (state.user.credits < cost.buy) {
      log.textContent = t("shop_no_credits");
      return;
    }
    state.user.credits -= cost.buy;
    state.user.gear[item] += 1;
    log.textContent = t("shop_buy_done");
  }

  if (mode === "sell") {
    if ((state.user.gear[item] || 0) <= 0) {
      log.textContent = t("shop_no_item");
      return;
    }
    state.user.gear[item] -= 1;
    state.user.credits += cost.sell;
    log.textContent = t("shop_sell_done");
  }

  saveUser();
  await syncPresence();
  refreshUI();
}

async function saveWorkers() {
  const gold = Number(document.getElementById("workers-gold")?.value || 0);
  const supply = Number(document.getElementById("workers-supply")?.value || 0);
  const alloy = Number(document.getElementById("workers-alloy")?.value || 0);
  const log = document.getElementById("economy-log");
  if (gold < 0 || supply < 0 || alloy < 0 || gold + supply + alloy !== 100) {
    log.textContent = t("workers_invalid");
    return;
  }
  state.user.workers = { gold, supply, alloy };
  saveUser();
  await syncPresence();
  log.textContent = t("workers_saved");
  refreshUI();
}

async function doCouncilTreasury(type) {
  const log = document.getElementById("social-log");
  if (!state.user.code) {
    log.textContent = t("no_council");
    return;
  }
  await loadCouncilInfo();
  if (!state.councilInfo) {
    log.textContent = t("no_council");
    return;
  }

  if (type === "deposit") {
    if (state.user.credits < 100) {
      log.textContent = t("treasury_insufficient");
      return;
    }
    state.user.credits -= 100;
    const nextTreasury = (state.councilInfo.treasury || 0) + 100;
    await updateCouncilTreasury(nextTreasury);
    log.textContent = t("treasury_deposit_done");
  }

  if (type === "withdraw") {
    if (!["leader", "officer"].includes(state.councilRole)) {
      log.textContent = t("treasury_denied");
      return;
    }
    if ((state.councilInfo.treasury || 0) < 100) {
      log.textContent = t("treasury_insufficient");
      return;
    }
    state.user.credits += 100;
    const nextTreasury = (state.councilInfo.treasury || 0) - 100;
    await updateCouncilTreasury(nextTreasury);
    log.textContent = t("treasury_withdraw_done");
  }

  saveUser();
  await syncPresence();
  await loadCouncilInfo();
  refreshUI();
}

async function updateCouncilTreasury(nextTreasury) {
  if (backend.mode === "supabase") {
    await backend.client.from("world_councils").update({ treasury: nextTreasury }).eq("council_code", state.user.code);
    return;
  }
  const world = getLocalWorld();
  const council = world.councils.find((c) => c.council_code === state.user.code);
  if (council) council.treasury = nextTreasury;
  saveLocalWorld(world);
}

async function promoteMemberToOfficer(commanderName) {
  const log = document.getElementById("social-log");
  if (!state.user.code) {
    log.textContent = t("no_council");
    return;
  }
  await loadCouncilInfo();
  if (state.councilRole !== "leader") {
    log.textContent = t("promote_denied");
    return;
  }
  if (!commanderName) {
    log.textContent = t("member_not_found");
    return;
  }

  if (backend.mode === "supabase") {
    const { data } = await backend.client
      .from("world_council_members")
      .select("player_id")
      .eq("council_code", state.user.code)
      .eq("commander", commanderName)
      .maybeSingle();
    if (!data?.player_id) {
      log.textContent = t("member_not_found");
      return;
    }
    await backend.client
      .from("world_council_members")
      .update({ role: "officer" })
      .eq("council_code", state.user.code)
      .eq("player_id", data.player_id);
  } else {
    const world = getLocalWorld();
    const member = world.members.find((m) => m.council_code === state.user.code && m.commander === commanderName);
    if (!member) {
      log.textContent = t("member_not_found");
      return;
    }
    member.role = "officer";
    saveLocalWorld(world);
  }
  log.textContent = t("promote_done");
  await loadCouncilInfo();
  refreshUI();
}

async function loadSeasonArchive() {
  if (backend.mode === "supabase") {
    const { data } = await backend.client
      .from("world_season_archive")
      .select("season_number,rank_position,commander")
      .order("season_number", { ascending: false })
      .order("rank_position", { ascending: true })
      .limit(24);
    state.seasonArchive = data || [];
    return;
  }
  const world = getLocalWorld();
  state.seasonArchive = world.seasonArchive || [];
}

async function loadWarTargets() {
  if (!state.user.code) {
    state.warTargets = [];
    return;
  }
  if (backend.mode === "supabase") {
    const { data } = await backend.client
      .from("world_war_targets")
      .select("id,council_code,target_player_id,target_commander,assigned_to,created_at")
      .eq("council_code", state.user.code)
      .order("created_at", { ascending: false })
      .limit(20);
    state.warTargets = data || [];
    return;
  }
  const world = getLocalWorld();
  state.warTargets = (world.warTargets || []).filter((w) => w.council_code === state.user.code);
}

async function addWarTarget(targetPlayerId, assignedTo) {
  const log = document.getElementById("social-log");
  if (!state.user.code) {
    log.textContent = t("no_council");
    return;
  }
  if (!["leader", "officer"].includes(state.councilRole)) {
    log.textContent = t("war_denied");
    return;
  }
  const target = state.leaderboard.find((p) => p.player_id === targetPlayerId);
  if (!target) {
    log.textContent = t("no_target");
    return;
  }

  const payload = {
    council_code: state.user.code,
    target_player_id: target.player_id,
    target_commander: target.commander || "-",
    assigned_to: assignedTo || null,
    created_at: new Date().toISOString(),
  };

  if (backend.mode === "supabase") {
    await backend.client.from("world_war_targets").insert(payload);
  } else {
    const world = getLocalWorld();
    world.warTargets = world.warTargets || [];
    world.warTargets.push({ id: crypto.randomUUID(), ...payload });
    world.warTargets = world.warTargets.slice(-50);
    saveLocalWorld(world);
  }
  log.textContent = t("war_added");
  await loadWarTargets();
  refreshUI();
}

async function runSeasonResetIfNeeded() {
  if (getSeasonDay() <= SEASON_LENGTH_DAYS) return;

  const snapshot = state.leaderboard.slice(0, 5).map((row, idx) => ({
    season_number: state.user.seasonNumber,
    rank_position: idx + 1,
    commander: row.commander || "-",
    power: row.power || 0,
  }));

  if (backend.mode === "supabase") {
    if (snapshot.length) {
      await backend.client.from("world_season_archive").insert(snapshot);
    }
    await backend.client.from("world_players").update({ power: 100, intel: 60, influence: 20 });
  } else {
    const world = getLocalWorld();
    world.seasonArchive = [...(world.seasonArchive || []), ...snapshot].slice(-50);
    world.players = world.players.map((p) => ({ ...p, power: 100, intel: 60, influence: 20 }));
    saveLocalWorld(world);
  }

  state.user.commandPoints = 12;
  state.user.credits = 1200;
  state.user.supplies = 840;
  state.user.alloys = 420;
  state.user.intel = 75;
  state.user.influence = 20;
  state.user.mana = 30;
  state.user.power = 110;
  state.user.cityTier = 1;
  state.user.bankGold = 0;
  state.user.reports = {};
  state.user.attackHistory = {};
  state.user.seasonNumber += 1;
  state.user.seasonStart = Date.now();
  saveUser();
  const log = document.getElementById("action-log");
  if (log) log.textContent = t("season_reset_done");
}

function authStatus(messageKeyOrText) {
  const node = document.getElementById("auth-status");
  if (!node) return;
  node.textContent = i18n[state.language][messageKeyOrText] ? t(messageKeyOrText) : messageKeyOrText;
}

function clearOAuthCallbackArtifacts() {
  const hasHashTokens = window.location.hash.includes("access_token") || window.location.hash.includes("error=");
  const params = new URLSearchParams(window.location.search);
  const hasCode = params.has("code") || params.has("error_description") || params.has("error");
  if (!hasHashTokens && !hasCode) return;
  const cleanUrl = `${window.location.origin}${window.location.pathname}`;
  window.history.replaceState({}, "", cleanUrl);
}

function parseLaunchParams() {
  const params = new URLSearchParams(window.location.search);
  const requestedScreen = params.get("screen") || "landing";
  const debug = params.get("debug") === "1";
  const reset = params.get("reset") === "1";
  return { requestedScreen, debug, reset };
}

async function applyAuthSession(session, options = {}) {
  if (backend.mode !== "supabase") return;
  const user = session?.user || null;
  state.authReady = true;

  if (!user) {
    state.authUserId = null;
    if (!options.silentIfMissing) {
      navigate("auth");
    } else {
      navigate(state.step);
    }
    return;
  }

  state.authUserId = user.id;
  state.user.id = user.id;
  state.user.email = user.email || state.user.email;
  saveUser();
  await syncPresence();
  if (options.statusOnSuccess) authStatus(options.statusOnSuccess);
  navigate(state.step);
}

async function pullAuthSession() {
  if (backend.mode !== "supabase" || !backend.client) return;
  const { data } = await backend.client.auth.getSession();
  await applyAuthSession(data?.session || null, { silentIfMissing: true, statusOnSuccess: data?.session ? "auth_ok" : null });
}

async function doRegister() {
  if (backend.mode !== "supabase") {
    authStatus("auth_no_backend");
    return;
  }
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const { error } = await backend.client.auth.signUp({ email, password });
  if (error) {
    authStatus(error.message || t("auth_fail"));
    return;
  }
  state.user.email = email;
  saveUser();
  authStatus("auth_register_ok");
  if (backend.client) {
    const { data } = await backend.client.auth.getSession();
    await applyAuthSession(data?.session || null, { silentIfMissing: true });
  }
  navigate("auth");
}

async function doLogin() {
  if (backend.mode !== "supabase") {
    authStatus("auth_no_backend");
    return;
  }
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const { data, error } = await backend.client.auth.signInWithPassword({ email, password });
  if (error) {
    authStatus(error.message || t("auth_fail"));
    return;
  }
  if (data?.user) {
    await applyAuthSession(data.session || { user: data.user }, { statusOnSuccess: "auth_ok" });
  } else {
    navigate("auth");
  }
}

async function doGoogleLogin() {
  if (backend.mode !== "supabase") {
    authStatus("auth_no_backend");
    return;
  }
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await backend.client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
  if (error) {
    authStatus(error.message || t("auth_fail"));
  }
}

async function doLogout() {
  if (backend.mode === "supabase" && backend.client) {
    await backend.client.auth.signOut();
    state.authUserId = null;
    state.authReady = true;
  }
  authStatus("auth_logged_out");
  navigate("auth");
}

document.addEventListener("click", async (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (state.actionLock && isLockedAction(action)) {
    return;
  }

  const shouldLock = isLockedAction(action);
  if (shouldLock) setActionLock(true);

  try {
    if (action === "go") navigate(target.dataset.step);
    if (action === "turn") {
      if (!assertGameplayReady()) return;
      await doAction(target.dataset.type);
    }
    if (action === "pick-faction") {
      if (!isAuthenticated()) {
        authStatus("guard_need_login");
        navigate("auth");
        return;
      }
      state.user.faction = target.dataset.value;
      saveUser();
      renderFactions();
      await syncPresence();
    }
    if (action === "open-settings") openSettings(true);
    if (action === "close-settings") openSettings(false);
    if (action === "skip-tips") hideTipsForever();
    if (action === "next-tip") document.getElementById("onboarding").classList.remove("open");
    if (action === "bank") {
      if (!assertGameplayReady()) return;
      await doBank(target.dataset.type);
    }
    if (action === "market") {
      if (!assertGameplayReady()) return;
      await doMarket(target.dataset.type);
    }
    if (action === "upgrade-city") {
      if (!assertGameplayReady()) return;
      await doCityUpgrade();
    }
    if (action === "council-treasury") {
      if (!assertGameplayReady()) return;
      await doCouncilTreasury(target.dataset.type);
    }
    if (action === "promote-member") {
      if (!assertGameplayReady()) return;
      const commander = document.getElementById("promoteMember")?.value?.trim();
      await promoteMemberToOfficer(commander);
    }
    if (action === "auth-register") await doRegister();
    if (action === "auth-login") await doLogin();
    if (action === "auth-google") await doGoogleLogin();
    if (action === "auth-logout") await doLogout();
    if (action === "shop") {
      if (!assertGameplayReady()) return;
      await doShop(target.dataset.item, target.dataset.mode);
    }
    if (action === "workers-save") {
      if (!assertGameplayReady()) return;
      await saveWorkers();
    }
    if (action === "war-add") {
      if (!assertGameplayReady()) return;
      const targetId = document.getElementById("warTargetSelect")?.value;
      const assigned = document.getElementById("warAssignInput")?.value?.trim();
      await addWarTarget(targetId, assigned);
    }
    if (action === "toggle-debug") toggleDebugPanel();
  } catch (err) {
    const msg = err?.message || "Unexpected error";
    authStatus(msg);
  } finally {
    if (shouldLock) setActionLock(false);
  }
});

document.getElementById("lang").addEventListener("change", (e) => {
  setLanguage(e.target.value);
});

document.getElementById("actionTargetSelect")?.addEventListener("change", () => {
  updateTargetHint();
});

document.getElementById("character-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isAuthenticated()) {
    authStatus("guard_need_login");
    navigate("auth");
    return;
  }
  state.user.commander = document.getElementById("charName").value.trim();
  state.user.origin = document.getElementById("origin").value;
  state.user.trait = document.getElementById("trait").value;
  saveUser();
  await syncPresence();
  navigate("faction");
});

document.getElementById("create-clan-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!assertGameplayReady()) return;
  const name = document.getElementById("newClanName").value.trim();
  const status = document.getElementById("clan-status");
  if (!name) {
    status.textContent = t("clan_missing");
    return;
  }
  const code = await createCouncil(name);
  if (!code) {
    status.textContent = t("connected_error");
    return;
  }
  state.user.council = name;
  state.user.code = code;
  status.textContent = `${t("clan_created")} ${code}`;
  saveUser();
  await syncPresence();
  await loadCouncilInfo();
  await loadWarTargets();
  refreshUI();
});

document.getElementById("join-clan-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!assertGameplayReady()) return;
  const code = document.getElementById("joinCode").value.trim().toUpperCase();
  const status = document.getElementById("clan-status");
  if (code.length < 5) {
    status.textContent = t("clan_missing");
    return;
  }
  const councilName = await joinCouncil(code);
  if (!councilName) {
    status.textContent = t("clan_missing");
    return;
  }
  state.user.council = councilName;
  state.user.code = code;
  status.textContent = `${t("clan_joined")} (${code})`;
  saveUser();
  await syncPresence();
  await loadCouncilInfo();
  await loadWarTargets();
  refreshUI();
});

document.getElementById("backend-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("supabaseUrl").value.trim();
  const key = document.getElementById("supabaseAnonKey").value.trim();
  saveBackendConfig(url, key);
  await initBackend();
  openSettings(false);
});

async function boot() {
  clearOAuthCallbackArtifacts();
  const launch = parseLaunchParams();
  if (launch.reset) {
    resetLocalProfileState();
  }
  state.debugOpen = launch.debug;
  document.getElementById("lang").value = state.language;
  translatePage();
  renderFactions();
  await initBackend();
  await loadCouncilInfo();
  await runSeasonResetIfNeeded();
  navigate(launch.requestedScreen || "landing");
  maybeShowTip(true);
}

boot();
setInterval(async () => {
  await runSeasonResetIfNeeded();
  await syncPresence();
  await refreshWorldPanels();
  refreshUI();
}, 30000);
