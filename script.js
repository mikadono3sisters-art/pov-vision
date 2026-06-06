const videos = document.querySelectorAll("video");

// スマホかPCかを判定する関数（768px以下をスマホと定義）
const isMobile = () => window.innerWidth <= 768;

/* ==========================================
   1. スマホ用：画面に入ったら自動再生（スクロール連動）
   ========================================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // スマホの時だけこの挙動を有効にする
        if (!isMobile()) return; 

        const video = entry.target;

        if (entry.isIntersecting) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    });
}, { threshold: 0.5 }); // 画面に50%以上映ったら再生

// 各動画にスクロール監視を登録
videos.forEach(video => observer.observe(video));


/* ==========================================
   2. PC用：マウスホバーで再生 / 離して停止
   ========================================== */
videos.forEach(video => {
    // マウスが動画の上に乗ったとき
    video.addEventListener("mouseenter", () => {
        if (isMobile()) return; // スマホの時はスキップ
        video.play().catch(() => {});
    });

    // マウスが動画から外れたとき
    video.addEventListener("mouseleave", () => {
        if (isMobile()) return; // スマホの時はスキップ
        video.pause();
    });
});