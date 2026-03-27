const TICK_MS = 15 * 60 * 1000;
const MAX_COMMAND_POINTS = 24;
const LOCAL_WORLD_KEY = "mist-world";
const SEASON_LENGTH_DAYS = 90;

const i18n = {
  he: {
    nav_landing: "דף פתיחה",
    nav_flow: "זרימת משחק",
    nav_dashboard: "לוח בקרה",
    language: "שפה",
    backend_settings: "שרת",
    hero_eyebrow: "אסטרטגיית דפדפן תורית מרובת שחקנים",
    hero_title: "הקם הנהגה, בנה מועצה והובל עונה תחרותית.",
    hero_subtitle: "משחק טקסט עברי-ראשון עם כלכלה, מודיעין, תורות וקרבות בין שחקנים.",
    hero_cta_primary: "להתחיל עכשיו",
    hero_cta_secondary: "איך זה עובד",
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
    start_now: "כניסה למשחק",
    auth_title: "הרשמה / התחברות",
    auth_sub: "למטרת אב-טיפוס, הנתונים האישיים נשמרים מקומית בדפדפן.",
    email: "אימייל",
    password: "סיסמה",
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
    target_placeholder: "לדוגמה: Mira",
    action_scout: "סיור מודיעיני",
    action_strike: "פשיטה טקטית",
    action_train: "אימון מומחים",
    cost_2: "עלות: 2 נק' פיקוד",
    cost_3: "עלות: 3 נק' פיקוד",
    cost_4: "עלות: 4 נק' פיקוד",
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
    log_scout: "הסיור הצליח: נוספו מודיעין והשפעה.",
    log_strike: "הפשיטה הסתיימה: רווחת אשראי, אך צרכת אספקה.",
    log_train: "האימון הסתיים: יעילות הכוחות עלתה.",
    economy_title: "כלכלה, בנק ושוק",
    bank_title: "בנק עירוני",
    bank_text: "הפקד אשראי לביטחון וצבור ריבית פסיבית במחזורי זמן.",
    bank_deposit: "הפקד 200",
    bank_withdraw: "משוך 200",
    market_title: "שוק אספקה",
    market_text: "המר סגסוגת ואשראי לפי צרכי הקרב הנוכחיים.",
    market_buy_supplies: "קנה אספקה",
    market_sell_alloys: "מכור סגסוגת",
    city_title: "שכבת עיר",
    city_tier_label: "שכבה נוכחית",
    city_bonus_label: "בונוס ייצור",
    city_upgrade_text: "שדרוג דורש אשראי וסגסוגת, ומגדיל בונוס משאבים.",
    city_upgrade: "שדרג עיר",
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
    nav_dashboard: "Dashboard",
    language: "Language",
    backend_settings: "Server",
    hero_eyebrow: "Multiplayer turn-based browser strategy",
    hero_title: "Build command, grow a council, and dominate the season.",
    hero_subtitle: "Hebrew-first text strategy with economy, intel, turns, and PvP pressure.",
    hero_cta_primary: "Start Now",
    hero_cta_secondary: "How It Works",
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
    start_now: "Enter Game",
    auth_title: "Register / Login",
    auth_sub: "For prototype use, personal data is stored in your browser.",
    email: "Email",
    password: "Password",
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
    target_placeholder: "Example: Mira",
    action_scout: "Intel Sweep",
    action_strike: "Tactical Raid",
    action_train: "Specialist Training",
    cost_2: "Cost: 2 command points",
    cost_3: "Cost: 3 command points",
    cost_4: "Cost: 4 command points",
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
    log_scout: "Sweep complete: intel and influence increased.",
    log_strike: "Raid complete: credits gained, supplies consumed.",
    log_train: "Training complete: combat efficiency increased.",
    economy_title: "Economy, Bank, and Market",
    bank_title: "City Bank",
    bank_text: "Deposit credits for safety and passive interest over time.",
    bank_deposit: "Deposit 200",
    bank_withdraw: "Withdraw 200",
    market_title: "Supply Market",
    market_text: "Convert alloys and credits based on current strategic needs.",
    market_buy_supplies: "Buy Supplies",
    market_sell_alloys: "Sell Alloys",
    city_title: "City Tier",
    city_tier_label: "Current Tier",
    city_bonus_label: "Production Bonus",
    city_upgrade_text: "Upgrading costs credits and alloys, then boosts resource gain.",
    city_upgrade: "Upgrade City",
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
    nav_dashboard: "Панель",
    language: "Язык",
    backend_settings: "Сервер",
    hero_eyebrow: "Пошаговая браузерная стратегия",
    hero_title: "Построй командование, собери совет и веди сезон.",
    hero_subtitle: "Текстовая стратегия с экономикой, разведкой, ходами и PvP.",
    hero_cta_primary: "Начать",
    hero_cta_secondary: "Как это работает",
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
    start_now: "Войти",
    auth_title: "Регистрация / Вход",
    auth_sub: "Для прототипа данные сохраняются локально в браузере.",
    email: "Email",
    password: "Пароль",
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
    target_placeholder: "Например: Mira",
    action_scout: "Разведка",
    action_strike: "Тактический рейд",
    action_train: "Подготовка специалистов",
    cost_2: "Цена: 2 очка",
    cost_3: "Цена: 3 очка",
    cost_4: "Цена: 4 очка",
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
    log_scout: "Разведка завершена: разведданные и влияние выросли.",
    log_strike: "Рейд завершен: кредиты получены, припасы потрачены.",
    log_train: "Тренировка завершена: эффективность выросла.",
    economy_title: "Экономика, банк и рынок",
    bank_title: "Городской банк",
    bank_text: "Депозит защищает средства и дает пассивный прирост.",
    bank_deposit: "Депозит 200",
    bank_withdraw: "Снять 200",
    market_title: "Рынок снабжения",
    market_text: "Обменивайте сплав и кредиты под текущие задачи.",
    market_buy_supplies: "Купить припасы",
    market_sell_alloys: "Продать сплав",
    city_title: "Уровень города",
    city_tier_label: "Текущий уровень",
    city_bonus_label: "Бонус добычи",
    city_upgrade_text: "Улучшение требует кредиты и сплав, затем повышает добычу.",
    city_upgrade: "Улучшить город",
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
  backendStatus: "",
  leaderboard: [],
  feed: [],
  seasonArchive: [],
  councilInfo: null,
  councilRole: "member",
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
    power: 110,
    bankGold: 0,
    cityTier: 1,
    seasonNumber: 1,
    seasonStart: Date.now(),
  };
}

function loadUser() {
  try {
    const parsed = JSON.parse(localStorage.getItem("mist-user"));
    return parsed ? { ...defaultUser(), ...parsed } : defaultUser();
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
  state.step = step;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.id === step);
  });
  refreshUI();
  maybeShowTip();
}

function regen() {
  const now = Date.now();
  const gained = Math.floor((now - state.user.lastTick) / TICK_MS);
  if (gained > 0) {
    state.user.commandPoints = Math.min(MAX_COMMAND_POINTS, state.user.commandPoints + gained);
    const bonus = 1 + getCityBonus() / 100;
    state.user.credits += Math.floor(70 * gained * bonus);
    state.user.supplies += Math.floor(60 * gained * bonus);
    state.user.alloys += Math.floor(35 * gained * bonus);
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
  return (state.user.cityTier - 1) * 25;
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
  renderSocialPanel();
  renderSeasonArchive();
}

function renderStats() {
  const stats = document.getElementById("stats");
  if (!stats) return;
  const rows = [
    [t("stat_cp"), state.user.commandPoints],
    [t("stat_credits"), state.user.credits],
    [t("stat_bank"), state.user.bankGold],
    [t("stat_supplies"), state.user.supplies],
    [t("stat_alloys"), state.user.alloys],
    [t("stat_intel"), state.user.intel],
    [t("stat_influence"), state.user.influence],
  ];

  stats.innerHTML = "";
  rows.forEach(([k, v]) => {
    const node = document.createElement("div");
    node.className = "stat";
    node.innerHTML = `<div class="k">${k}</div><div class="v">${Number(v).toLocaleString()}</div>`;
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
  const attackScore = state.user.power + state.user.intel * 0.45 + Math.random() * 40 + getCityBonus();
  const defenseScore = (target.power || 0) + (target.intel || 0) * 0.3 + (target.influence || 0) * 0.2 + Math.random() * 35;
  const diff = attackScore - defenseScore;

  if (diff > 30) {
    const loot = 160 + Math.floor(Math.random() * 90);
    state.user.credits += loot;
    state.user.power += 10;
    await applyTargetDamage(target, -12);
    return `${t("pvp_win")} ${target.commander} (+${loot})`;
  }
  if (diff < -30) {
    state.user.power = Math.max(0, state.user.power - 10);
    state.user.supplies = Math.max(0, state.user.supplies - 60);
    await applyTargetDamage(target, 4);
    return `${t("pvp_loss")} ${target.commander}`;
  }
  state.user.power += 1;
  await applyTargetDamage(target, -2);
  return `${t("pvp_draw")} ${target.commander}`;
}

async function doAction(type) {
  const log = document.getElementById("action-log");
  const targetId = document.getElementById("actionTargetSelect")?.value;
  const targetPlayer = findTargetPlayer(targetId);
  const effects = {
    scout: () => {
      if (!spendPoints(2)) return t("need_points");
      const gain = targetPlayer ? 18 : 14;
      state.user.intel += 14;
      state.user.influence += 7;
      state.user.power += 2;
      state.user.intel += gain - 14;
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
    state.backendStatus = t("connected_local");
    seedLocalWorld();
    await refreshWorldPanels();
    renderBackendStatus();
    return;
  }

  try {
    backend.client = window.supabase.createClient(config.url, config.key, {
      auth: { persistSession: false },
    });

    const ping = await backend.client.from("world_actions").select("id", { count: "exact", head: true });
    if (ping.error) throw ping.error;

    backend.mode = "supabase";
    state.backendStatus = t("connected_remote");
    wireRealtime();
    await syncPresence();
    await refreshWorldPanels();
  } catch {
    backend.mode = "local";
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
      backend.client.from("world_players").select("player_id,commander,power,intel,influence,council").order("power", { ascending: false }).limit(10),
      backend.client.from("world_actions").select("commander,summary,created_at").order("created_at", { ascending: false }).limit(12),
    ]);
    state.leaderboard = lb.data || [];
    state.feed = fd.data || [];
    await loadCouncilInfo();
    await loadSeasonArchive();
    return;
  }
  tickLocalWorld();
  const world = getLocalWorld();
  state.leaderboard = [...world.players].sort((a, b) => b.power - a.power).slice(0, 10);
  state.feed = [...world.actions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 12);
  state.seasonArchive = [...(world.seasonArchive || [])].sort((a, b) => b.season_number - a.season_number);
  loadLocalCouncilInfo();
}

function getLocalWorld() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_WORLD_KEY)) || { players: [], actions: [], councils: [], members: [], seasonArchive: [], lastSim: Date.now() };
  } catch {
    return { players: [], actions: [], councils: [], members: [], seasonArchive: [], lastSim: Date.now() };
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
  } else {
    world.players.push({
      player_id: state.user.id,
      commander: name,
      power: state.user.power,
      intel: state.user.intel,
      influence: state.user.influence,
      council_code: state.user.code || null,
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
    const [councilRes, memberRes] = await Promise.all([
      backend.client.from("world_councils").select("council_code,council_name,treasury").eq("council_code", state.user.code).maybeSingle(),
      backend.client.from("world_council_members").select("role").eq("council_code", state.user.code).eq("player_id", state.user.id).maybeSingle(),
    ]);
    state.councilInfo = councilRes.data || null;
    state.councilRole = memberRes.data?.role || "member";
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
  const needCredits = state.user.cityTier * 350;
  const needAlloys = state.user.cityTier * 120;
  if (state.user.credits < needCredits || state.user.alloys < needAlloys) {
    log.textContent = `${t("city_upgrade_fail")} (${needCredits}/${needAlloys})`;
    return;
  }
  state.user.credits -= needCredits;
  state.user.alloys -= needAlloys;
  state.user.cityTier += 1;
  log.textContent = t("city_upgrade_done");
  saveUser();
  await syncPresence();
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
  state.user.power = 110;
  state.user.cityTier = 1;
  state.user.bankGold = 0;
  state.user.seasonNumber += 1;
  state.user.seasonStart = Date.now();
  saveUser();
  const log = document.getElementById("action-log");
  if (log) log.textContent = t("season_reset_done");
}

document.addEventListener("click", async (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "go") show(target.dataset.step);
  if (action === "turn") await doAction(target.dataset.type);
  if (action === "pick-faction") {
    state.user.faction = target.dataset.value;
    saveUser();
    renderFactions();
    await syncPresence();
  }
  if (action === "open-settings") openSettings(true);
  if (action === "close-settings") openSettings(false);
  if (action === "skip-tips") hideTipsForever();
  if (action === "next-tip") document.getElementById("onboarding").classList.remove("open");
  if (action === "bank") await doBank(target.dataset.type);
  if (action === "market") await doMarket(target.dataset.type);
  if (action === "upgrade-city") await doCityUpgrade();
  if (action === "council-treasury") await doCouncilTreasury(target.dataset.type);
  if (action === "promote-member") {
    const commander = document.getElementById("promoteMember")?.value?.trim();
    await promoteMemberToOfficer(commander);
  }
});

document.getElementById("lang").addEventListener("change", (e) => {
  setLanguage(e.target.value);
});

document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  state.user.email = document.getElementById("email").value.trim();
  saveUser();
  await syncPresence();
  show("character");
});

document.getElementById("character-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  state.user.commander = document.getElementById("charName").value.trim();
  state.user.origin = document.getElementById("origin").value;
  state.user.trait = document.getElementById("trait").value;
  saveUser();
  await syncPresence();
  show("faction");
});

document.getElementById("create-clan-form").addEventListener("submit", async (e) => {
  e.preventDefault();
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
  refreshUI();
});

document.getElementById("join-clan-form").addEventListener("submit", async (e) => {
  e.preventDefault();
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
  document.getElementById("lang").value = state.language;
  translatePage();
  renderFactions();
  await initBackend();
  await loadCouncilInfo();
  await runSeasonResetIfNeeded();
  refreshUI();
  maybeShowTip(true);
}

boot();
setInterval(async () => {
  await runSeasonResetIfNeeded();
  await syncPresence();
  await refreshWorldPanels();
  refreshUI();
}, 30000);
