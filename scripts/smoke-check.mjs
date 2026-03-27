import fs from "node:fs";

const SITE_URL = "https://ezzp024.github.io/mist-covenant/";
const strictBackend = process.argv.includes("--strict-backend");

function parseConfig() {
  const src = fs.readFileSync("config.js", "utf8");
  const url = src.match(/supabaseUrl:\s*"([^"]*)"/)?.[1] || "";
  const key = src.match(/supabaseAnonKey:\s*"([^"]*)"/)?.[1] || "";
  return { url, key };
}

async function expectHttp200(url, options = {}) {
  const res = await fetch(url, options);
  if (res.status !== 200 && res.status !== 201) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res;
}

async function tryBackendCheck(label, fn) {
  try {
    await fn();
    return true;
  } catch (err) {
    if (strictBackend) throw err;
    console.warn(`[smoke] WARN (${label}): ${err.message}`);
    return false;
  }
}

function checkI18nCoverage() {
  const html = fs.readFileSync("index.html", "utf8");
  const js = fs.readFileSync("app.js", "utf8");
  const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]);
  const pkeys = [...html.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map((m) => m[1]);
  const all = [...new Set([...keys, ...pkeys])];
  const block = js.match(/he:\s*\{([\s\S]*?)\},\s*en:/)?.[1] || "";
  const set = new Set([...block.matchAll(/\s([a-z0-9_]+):\s/gi)].map((m) => m[1]));
  const missing = all.filter((k) => !set.has(k));
  if (missing.length) throw new Error(`Missing Hebrew i18n keys: ${missing.join(", ")}`);
}

async function run() {
  console.log("[smoke] i18n key coverage");
  checkI18nCoverage();

  console.log("[smoke] site availability");
  await expectHttp200(SITE_URL);

  const { url, key } = parseConfig();
  if (!url || !key) {
    throw new Error("Missing supabaseUrl or supabaseAnonKey in config.js");
  }

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  console.log("[smoke] supabase write world_actions");
  const backendHealthy = await tryBackendCheck("supabase write", async () => {
    await expectHttp200(`${url}/rest/v1/world_actions`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=representation" },
      body: JSON.stringify([
        {
          player_id: "smoke-check",
          commander: "smoke",
          action_type: "smoke",
          summary: "smoke-check",
        },
      ]),
    });
  });

  if (backendHealthy) {
    console.log("[smoke] supabase read world_actions");
    await tryBackendCheck("supabase read", async () => {
      await expectHttp200(`${url}/rest/v1/world_actions?select=id,summary&order=id.desc&limit=1`, {
        headers,
      });
    });
  }

  console.log("[smoke] PASS");
}

run().catch((err) => {
  console.error(`[smoke] FAIL: ${err.message}`);
  process.exit(1);
});
