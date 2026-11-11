# Inserti animati Ludarks — Religione

Testi approvati dall’utente; palette e regole in DESIGN.md. Sorgente generata da build_composition.py, modificabile in index.html. CLI HyperFrames 0.9.34; GSAP 3.14.2 e font locali. Il file degli inserti è silenzioso: la voce originale e gli effetti sono gestiti nel montaggio Remotion.

```bash
python build_composition.py
HYPERFRAMES_CACHE_DIR=/workspace/.hyperframes-cache HYPERFRAMES_BROWSER_PATH=/usr/bin/chromium npm run check
HYPERFRAMES_CACHE_DIR=/workspace/.hyperframes-cache HYPERFRAMES_BROWSER_PATH=/usr/bin/chromium npx --yes hyperframes@0.9.34 render --fps 60 --quality high --crf 18 --workers 2 --keyframe-interval 1 --output ../pride-edit/public/religione/inserts.mp4
```

La cache nominata è necessaria in questo ambiente: la cartella home non è scrivibile. Non modificare HOME. Per le anteprime usare `hyperframes preview --background` e verificarne lo stato con `preview --status`; non pubblicare senza autorizzazione. Il risultato finale è esportato dalla composizione Remotion ReligioneEdit, che ricolloca gli inserti sul parlato e aggiunge sottotitoli, zoom e titoli dietro la figura.
