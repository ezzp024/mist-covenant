import fs from "node:fs";

const src = fs.readFileSync("app.js", "utf8");

function mustInclude(snippet, label) {
  if (!src.includes(snippet)) {
    throw new Error(`Missing expected auth-state logic: ${label}`);
  }
}

function mustMatch(regex, label) {
  if (!regex.test(src)) {
    throw new Error(`Missing expected auth-state pattern: ${label}`);
  }
}

console.log("[auth-smoke] checking centralized router/auth lifecycle");

mustInclude("const KNOWN_SCREENS = new Set", "known screens whitelist");
mustInclude("function routeByAuth(requestedStep)", "auth route guard");
mustInclude("function navigate(step)", "single navigate entrypoint");
mustInclude("function applyAuthSession(session, options = {})", "centralized session applier");
mustInclude("function clearOAuthCallbackArtifacts()", "oauth callback cleanup");
mustInclude("backend.client.auth.onAuthStateChange", "auth state listener");
mustInclude("if (!assertGameplayReady()) return;", "dangerous action guard");
mustInclude("if (action === \"auth-logout\") await doLogout();", "logout wiring");
mustInclude("navigate(launch.requestedScreen || \"landing\")", "boot route handoff");

mustMatch(/if \(!isAuthenticated\(\)\) \{[\s\S]*return publicRoutes\.has\(target\) \? target : "auth";/, "unauthenticated route gating");
mustMatch(/if \(!hasCharacterProfile\(\)\) \{[\s\S]*return "character";/, "character completion route gating");

console.log("[auth-smoke] PASS");
