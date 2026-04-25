import { useState, useRef } from "react";

const ACCENT = "#FF4D00";
const ACCENT2 = "#FFB347";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0A0A0A; }
  .app { min-height: 100vh; background: #0A0A0A; color: #F0EDE8; font-family: 'DM Sans', sans-serif; padding: 0 0 60px 0; }
  .header { padding: 28px 24px 20px; border-bottom: 1px solid #1E1E1E; display: flex; align-items: center; gap: 12px; }
  .logo-mark { width: 36px; height: 36px; background: #FF4D00; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: #fff; letter-spacing: -1px; flex-shrink: 0; }
  .logo-text { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #F0EDE8; letter-spacing: -0.5px; }
  .logo-text span { color: #FF4D00; }
  .badge { margin-left: auto; font-size: 11px; font-weight: 600; color: #FF4D00; background: rgba(255,77,0,0.12); border: 1px solid rgba(255,77,0,0.25); padding: 3px 10px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase; }
  .hero { padding: 36px 24px 28px; }
  .hero-title { font-family: 'Syne', sans-serif; font-size: 30px; font-weight: 800; line-height: 1.1; letter-spacing: -1px; margin-bottom: 10px; }
  .hero-title em { font-style: normal; background: linear-gradient(90deg, #FF4D00, #FFB347); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-sub { font-size: 14px; color: #888; line-height: 1.5; }
  .input-zone { padding: 0 24px; margin-bottom: 20px; }
  .input-wrap { background: #141414; border: 1.5px solid #272727; border-radius: 16px; padding: 16px; transition: border-color 0.2s; }
  .input-wrap:focus-within { border-color: #FF4D00; }
  .input-label { font-size: 11px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
  .yt-icon { width: 16px; height: 16px; background: #FF0000; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 7px; color: #fff; }
  .url-input { width: 100%; background: transparent; border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 15px; color: #F0EDE8; }
  .url-input::placeholder { color: #444; }
  .divider { height: 1px; background: #222; margin: 14px 0; }
  .options-row { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
  .chip { font-size: 12px; font-weight: 500; padding: 5px 12px; border-radius: 20px; border: 1px solid #2A2A2A; background: transparent; color: #888; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .chip.active { border-color: #FF4D00; color: #FF4D00; background: rgba(255,77,0,0.08); }
  .btn-generate { width: 100%; padding: 16px; background: #FF4D00; border: none; border-radius: 12px; font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; letter-spacing: -0.3px; transition: opacity 0.15s, transform 0.1s; }
  .btn-generate:hover { opacity: 0.9; }
  .btn-generate:active { transform: scale(0.98); }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .pulse-dot { width: 8px; height: 8px; background: #fff; border-radius: 50%; animation: pulse 1s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.6); } }
  .status-bar { margin: 0 24px 20px; background: #141414; border: 1px solid #222; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; }
  .status-text { font-size: 13px; color: #AAA; }
  .status-text strong { color: #FF4D00; }
  .section-head { padding: 0 24px; margin-bottom: 16px; display: flex; align-items: baseline; gap: 10px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
  .count-pill { font-size: 12px; font-weight: 600; color: #555; background: #1A1A1A; border-radius: 20px; padding: 2px 8px; }
  .clips-list { display: flex; flex-direction: column; gap: 12px; padding: 0 24px; }
  .clip-card { background: #111; border: 1px solid #1E1E1E; border-radius: 16px; overflow: hidden; animation: fadeUp 0.4s ease both; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .clip-card:nth-child(1) { animation-delay: 0s; }
  .clip-card:nth-child(2) { animation-delay: 0.08s; }
  .clip-card:nth-child(3) { animation-delay: 0.16s; }
  .clip-card:nth-child(4) { animation-delay: 0.24s; }
  .clip-card:nth-child(5) { animation-delay: 0.32s; }
  .clip-header { padding: 14px 16px 10px; display: flex; align-items: flex-start; gap: 10px; }
  .clip-rank { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 800; flex-shrink: 0; background: rgba(255,77,0,0.12); color: #FF4D00; }
  .clip-rank.top { background: #FF4D00; color: #fff; }
  .clip-hook { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; line-height: 1.3; letter-spacing: -0.3px; flex: 1; }
  .clip-meta { padding: 0 16px 10px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .time-tag { font-size: 11px; font-weight: 600; color: #FFB347; background: rgba(255,179,71,0.1); border-radius: 6px; padding: 3px 8px; font-family: monospace; }
  .platform-tag { font-size: 11px; font-weight: 500; color: #666; background: #1A1A1A; border-radius: 6px; padding: 3px 8px; }
  .score-bar-wrap { padding: 0 16px 14px; }
  .score-label { font-size: 11px; color: #555; margin-bottom: 5px; display: flex; justify-content: space-between; }
  .score-label span { color: #FF4D00; font-weight: 600; }
  .score-track { height: 4px; background: #222; border-radius: 2px; overflow: hidden; }
  .score-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #FF4D00, #FFB347); transition: width 0.8s ease; }
  .clip-body { padding: 0 16px 14px; }
  .clip-caption-label { font-size: 11px; font-weight: 600; color: #444; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
  .clip-caption { font-size: 13px; color: #CCC; line-height: 1.55; margin-bottom: 10px; }
  .hashtags { display: flex; flex-wrap: wrap; gap: 5px; }
  .hashtag { font-size: 12px; color: #5B9BFF; background: rgba(91,155,255,0.08); border-radius: 5px; padding: 2px 7px; }
  .copy-btn { width: calc(100% - 32px); margin: 0 16px 14px; padding: 10px; background: transparent; border: 1px solid #2A2A2A; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #777; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .copy-btn:hover { border-color: #FF4D00; color: #FF4D00; }
  .copy-btn.copied { border-color: #22C55E; color: #22C55E; }
  .error-box { margin: 0 24px; background: rgba(255,60,60,0.08); border: 1px solid rgba(255,60,60,0.2); border-radius: 12px; padding: 14px 16px; font-size: 13px; color: #FF6B6B; line-height: 1.5; }
  .video-info { margin: 0 24px 20px; background: #111; border: 1px solid #1E1E1E; border-radius: 12px; padding: 14px 16px; animation: fadeUp 0.3s ease both; }
  .vi-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 4px; line-height: 1.3; }
  .vi-meta { font-size: 12px; color: #666; }
`;

const PLATFORMS = ["TikTok", "Reels", "Shorts"];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copy}>
      {copied ? "✓ Copié !" : "⎘ Copier la légende"}
    </button>
  );
}

function ClipCard({ clip, index }) {
  return (
    <div className="clip-card">
      <div className="clip-header">
        <div className={`clip-rank ${index === 0 ? "top" : ""}`}>
          {index === 0 ? "★" : index + 1}
        </div>
        <div className="clip-hook">{clip.hook}</div>
      </div>
      <div className="clip-meta">
        <span className="time-tag">⏱ {clip.start} → {clip.end}</span>
        <span className="time-tag" style={{ color: "#A78BFA", background: "rgba(167,139,250,0.1)" }}>
          ~{clip.duration}s
        </span>
        {clip.platforms?.map(p => (
          <span key={p} className="platform-tag">#{p}</span>
        ))}
      </div>
      <div className="score-bar-wrap">
        <div className="score-label">
          Potentiel viral <span>{clip.score}%</span>
        </div>
        <div className="score-track">
          <div className="score-fill" style={{ width: `${clip.score}%` }} />
        </div>
      </div>
      <div className="clip-body">
        <div className="clip-caption-label">Légende TikTok</div>
        <div className="clip-caption">{clip.caption}</div>
        <div className="hashtags">
          {clip.hashtags?.map(h => (
            <span key={h} className="hashtag">{h}</span>
          ))}
        </div>
      </div>
      <CopyButton text={`${clip.caption}\n\n${clip.hashtags?.join(" ")}`} />
    </div>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [clips, setClips] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setClips(null);
    setError("");
    setVideoInfo(null);
    setStatus("Analyse de la vidéo en cours…");

    try {
      const systemPrompt = `Tu es un expert en création de contenu viral pour ${platform}. 
Tu analyses des vidéos YouTube et identifies les meilleurs moments à transformer en clips courts percutants.
Tu réponds UNIQUEMENT en JSON valide, sans texte avant ou après, sans backticks markdown.`;

      const userPrompt = `Analyse cette vidéo YouTube : ${url}

Utilise la recherche web pour trouver des informations sur cette vidéo (titre, description, durée, contenu, transcription si disponible).

Puis retourne un objet JSON avec cette structure exacte :
{
  "videoTitle": "titre de la vidéo",
  "videoAuthor": "nom de la chaîne",
  "videoDuration": "durée (ex: 12:34)",
  "clips": [
    {
      "hook": "titre accrocheur pour le clip (en français, percutant, <10 mots)",
      "start": "MM:SS",
      "end": "MM:SS",
      "duration": 45,
      "score": 87,
      "caption": "légende TikTok complète et engageante en français (2-3 phrases avec emojis)",
      "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
      "platforms": ["TikTok", "Reels"]
    }
  ]
}

Fournis entre 3 et 5 clips. Priorise les moments avec des révélations, des émotions fortes, des conseils actionnables, ou des moments humoristiques. Si tu ne peux pas accéder à la vidéo, génère des suggestions basées sur le titre/description disponible.`;

      setStatus("IA en train d'analyser le contenu…");

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }]
        })
      });

      const data = await response.json();
      setStatus("Génération des clips…");

      const textContent = data.content
        ?.filter(b => b.type === "text")
        ?.map(b => b.text)
        ?.join("") || "";

      const clean = textContent.replace(/```json|```/g, "").trim();
      const startIdx = clean.indexOf("{");
      const endIdx = clean.lastIndexOf("}");
      const jsonStr = clean.slice(startIdx, endIdx + 1);
      const parsed = JSON.parse(jsonStr);

      setVideoInfo({
        title: parsed.videoTitle || "Vidéo analysée",
        author: parsed.videoAuthor || "",
        duration: parsed.videoDuration || ""
      });
      setClips(parsed.clips || []);
      setStatus("");
    } catch (e) {
      setError("Impossible d'analyser cette vidéo. Vérifie l'URL et ta connexion internet, puis réessaie.");
      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="logo-mark">K</div>
          <div className="logo-text">Klap<span>AI</span></div>
          <div className="badge">Beta</div>
        </div>
        <div className="hero">
          <h1 className="hero-title">
            Transforme ta vidéo<br />
            en <em>clips viraux</em> 🔥
          </h1>
          <p className="hero-sub">
            Colle un lien YouTube → l'IA identifie les meilleurs moments pour TikTok, Reels & Shorts.
          </p>
        </div>
        <div className="input-zone">
          <div className="input-wrap">
            <div className="input-label">
              <span className="yt-icon">▶</span>
              Lien YouTube
            </div>
            <input
              className="url-input"
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && analyze()}
            />
            <div className="divider" />
            <div className="options-row">
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  className={`chip ${platform === p ? "active" : ""}`}
                  onClick={() => setPlatform(p)}
                >
                  {p === "TikTok" ? "🎵" : p === "Reels" ? "📸" : "▶️"} {p}
                </button>
              ))}
            </div>
            <button
              className="btn-generate"
              onClick={analyze}
              disabled={loading || !url.trim()}
            >
              {loading ? (
                <><div className="spinner" />Analyse en cours…</>
              ) : (
                <>✦ Générer les clips</>
              )}
            </button>
          </div>
        </div>
        {loading && status && (
          <div className="status-bar">
            <div className="pulse-dot" style={{ background: "#FF4D00", flexShrink: 0 }} />
            <div className="status-text">{status}</div>
          </div>
        )}
        {error && <div className="error-box">⚠️ {error}</div>}
        {videoInfo && (
          <div className="video-info">
            <div className="vi-title">📹 {videoInfo.title}</div>
            <div className="vi-meta">
              {videoInfo.author && `${videoInfo.author}`}
              {videoInfo.duration && ` · ${videoInfo.duration}`}
            </div>
          </div>
        )}
        {clips && clips.length > 0 && (
          <>
            <div className="section-head">
              <div className="section-title">Clips générés</div>
              <div className="count-pill">{clips.length} clips</div>
            </div>
            <div className="clips-list">
              {clips.map((clip, i) => (
                <ClipCard key={i} clip={clip} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
  }
