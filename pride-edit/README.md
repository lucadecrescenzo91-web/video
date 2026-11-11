# Montaggi Ludarks — motion graphic Pride

Composizione finale: **PrideEdit**, 1080×1920, 60 fps, 6760 fotogrammi.

Video realizzato sul parlato integrale fornito dall’utente, con zoom mirati, testo dietro la figura, motion graphic, sottotitoli evidenziati per parola, transizioni e 62 accenti sonori originali. Nessuna musica aggiunta. Gli accenti arcobaleno e i colori della bandiera trans accompagnano i passaggi pertinenti.

## Aprire il progetto

```bash
npm ci
npm run dev -- --no-open
npm run lint
```

In questo ambiente Chromium è disponibile in `/usr/bin/chromium`.

```bash
npx remotion render src/index.ts PrideEdit out/video-fascista-pride.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --pixel-format=yuv420p --jpeg-quality=95 --concurrency=2
```

`SourceReview` mostra la sola sorgente e `StyleCheck` è una prova visiva di tre secondi, non il video finale.

## File modificabili

- `src/PrideEdit.tsx`: timeline, zoom, titoli dietro la figura, inizio e durata delle scene.
- `src/Art.tsx` e `src/Scenes.tsx`: componenti grafici riutilizzabili.
- `src/captions.json`: testo e timestamp, dal copione fornito e allineato all’audio.
- `src/WordCaptions.tsx`: impaginazione e parola evidenziata.
- `data/script-it.txt`: testo fornito per l’allineamento.
- `data/sound-events.json`: tempi, tipo e volume di ogni accento sonoro.
- `scripts/sound_design.py`: genera e miscela gli effetti, senza parlato sintetico o musica.

## Preparazione dei media

I media generati non sono inclusi nel codice sorgente. L’originale è il file Drive `14S5pjU6Gm6IIuG5NWteqTnKR7fdteE5C`, 4K verticale, HEVC SDR BT.709, circa 113 secondi. Una copia di lavoro a 1080×1920/60 fps viene usata in `public/source.mp4`. Non applicare cambi di velocità o tagli al parlato.

Le maschere in `public/masks` e `public/inverse-masks` sono visibilità e relativa complementare a 30 fps. La maschera complementare viene applicata soltanto alla grafica di sfondo: i pixel della figura rimangono quelli della singola sorgente video. Questo evita una doppia decodifica mantenendo lo stesso effetto di profondità. Modello Robust Video Matting dalla release ufficiale `PeterL1n/RobustVideoMatting`, file `rvm_mobilenetv3_fp32.onnx`.

```bash
python -m pip install -r requirements-media.txt
python scripts/matte.py --input public/source.mp4 --model /path/to/rvm.onnx --out public/masks
python scripts/sound_design.py --events data/sound-events.json --duration 112.666667
```

I font Anton e Barlow Condensed sono locali; le relative licenze OFL sono nella cartella `public/fonts`.

## Allineamento dal copione

Quando il testo è fornito, l’allineamento è locale: non occorre un modello ASR remoto e l’audio non viene inviato a un servizio di trascrizione.

```bash
python scripts/bootstrap_alignment.py --target /workspace/video-assets/align-libs
PYTHONPATH=/workspace/video-assets/align-libs python scripts/align_from_text.py --audio /workspace/video-assets/speech.wav --text data/script-it.txt --output /workspace/video-assets/alignment.json
```

Il bootstrap verifica l’hash del pacchetto dal registro PyPI e omette soltanto il backend Festival, non utilizzato; eSpeak NG è distribuito nel pacchetto dedicato. La voce sintetica interna serve esclusivamente per allineare il testo e non entra nel montaggio. Per una nuova sorgente verificare sempre allineamento, testo e anteprime.

Usare il checkout esistente; non creare worktree per questa lavorazione. Conservare i file dell’utente e verificare sempre il render prima della consegna.


## Nuovo video: ipocrisia e responsabilità pubblica

`IpocrisiaEdit`: 1080×1920, 60 fps, 7715 fotogrammi (128,583 s). Sorgente Drive `1NIhVapoigserm70xknx0F9u8IZ_i_g-i`, originale conservato in `/workspace/video-assets/nuovo-02/originale.mov`. Nessun taglio o cambio di velocità al parlato; guadagno voce 0,97 per gestire due lievi overshoot già presenti nella decodifica AAC originale. Nessuna musica. 63 accenti sonori originali.

File specifici: `src/IpocrisiaEdit.tsx`, `src/captions-02.json`, `data/script-02-it.txt`, `data/sound-events-02.json`. `CaseCard`, `DateStamp` e `PublicPrivate` sono componenti riutilizzabili, registrati anche come composizioni modificabili. Il primo montaggio `PrideEdit` resta disponibile.

I media di questo video sono in `public/nuovo02` (ignorati da Git). Le maschere sono limitate ai primi 840 pixel verticali per i soli titoli di sfondo; il modello continua ad analizzare l’intera figura. Generazione:

```bash
PYTHONPATH=/workspace/video-assets/python-libs python scripts/matte.py --input public/nuovo02/source.mp4 --model /workspace/video-assets/models/rvm.onnx --out public/nuovo02/masks --mask-height 420
PYTHONPATH=/workspace/video-assets/python-libs python scripts/sound_design.py --events data/sound-events-02.json --duration 128.583333 --out public/nuovo02/sfx
npx remotion render src/index.ts IpocrisiaEdit out/video-ipocrisia-pride.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --pixel-format=yuv420p --jpeg-quality=95 --concurrency=2
```

Il testo fornito è allineato localmente con `scripts/align_from_text.py`, 390 parole. I nomi, le date e le schede derivano dal parlato; non sono stati aggiunti ritratti di repertorio o nuove affermazioni fattuali. La precisazione finale contro gli stereotipi e il rispetto dei tempi del coming out sono mantenuti e sottolineati.


## Religione — nuovo format con HyperFrames

Composizione `ReligioneEdit`, 1080×1920, 60 fps, 9901 fotogrammi, circa 165,02 s. Hook e CTA originali conservati; CTA ricollocata al centro. Le argomentazioni e i riferimenti biblici/ecclesiali restano nel parlato. Tagliati soltanto l’introduzione ridondante, l’inciso sulla pronuncia e una ripetizione retorica; dettagli in `data/religione/final-edl.json`.

Cinque inserti animati HyperFrames sostituiscono temporaneamente il volto, mentre la voce prosegue. Testi approvati in `data/religione/proposed-copy.json`; HTML, GSAP e identità visiva in `../motion-religione`. Il master degli inserti dura 50 s, riutilizzato con cinque trim nella timeline. 61 accenti sonori originali, nessuna musica o voce sintetica. Sottotitoli da quelli già presenti nel video, riconosciuti localmente e corretti negli errori OCR.

Media generati e originali sono esclusi da Git e conservati nell’ambiente. Per riprepararli vedere `data/religione/README.md` e gli script `religione_*.py`. Sorgente: release GitHub `religione`, asset `v26044gc0000da6mo47og65k06hpef60.mp4`.

```bash
npm run lint
npx remotion render src/index.ts ReligioneEdit out/video-religione-format.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --pixel-format=yuv420p --jpeg-quality=95 --concurrency=2
```

## Ashura Tattoo — Black Friday commerciale

`TattooCommercial`: 1080×1920, 60 fps, 2319 fotogrammi (38,65 s).
Sorgente: asset `video-da-editare.mov` della release `video-editare`, SHA-256
`ea6ab9f8e49acf8105420eedb727e0716c0bc87e545b6405c98c72953aec85a6`.

Montaggio commerciale originale con zoom sul parlato, accenti di colore,
transizioni geometriche sui bordi, stencil tipografici, due titoli scontornati
dietro la figura e sottotitoli dinamici verificati sul testo fornito.
Le scritte già incorporate nel MOV sono conservate e lasciate leggibili.
L’audio e la durata del sorgente sono integrali, senza tagli o variazioni di
velocità; voce a 0,9 e 52 effetti sonori originali aggiunti, senza musica aggiunta.
Il breve inciso sonoro presente nel sorgente tra le offerte e il paragrafo
successivo rimane integralmente nell’audio e non viene trascritto per congettura.

- `src/TattooCommercial.tsx`: timeline ed elementi grafici indipendenti.
- `src/captions-03.json`: testo e timestamp relativi alla sorgente.
- `data/script-03-it.txt`: copione fornito dall’utente.
- `scripts/commercial_sfx.py`: sintesi degli effetti sonori.
- `data/sound-events-03.json`: cue e livelli degli effetti.
- `public/fonts/commercial`: Archivo Black, licenza OFL inclusa.
- `TattooEdgeFlash`, `TattooStencilDeck`, `TattooBenefit`: composizioni riutilizzabili.

Media di lavoro in `public/nuovo03` (ignorati da Git). Preparazione: originale
scalato a 1080×1920, H.264 CRF 18, audio AAC copiato e nessun taglio.
Maschere inverse RVM a 30 fps limitate ai primi 1300 pixel verticali,
nei soli intervalli 6–14,5 e 21–29 secondi. Modello pubblico ufficiale
`PeterL1n/RobustVideoMatting`, `rvm_mobilenetv3_fp32.onnx`.

```bash
python scripts/commercial_sfx.py
npm run lint
npx remotion render src/index.ts TattooCommercial out/ashura-black-friday.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --pixel-format=yuv420p --jpeg-quality=95 --concurrency=2
```

Consegna: `video-ashura-black-friday.mp4` nella radice del repository.

Per rigenerare le maschere selettive dopo aver preparato `public/nuovo03/source.mp4`:

```bash
python scripts/matte_commercial.py --model /path/to/rvm_mobilenetv3_fp32.onnx
```


Revisione commerciale: hook «SCEGLI IL TUO PROSSIMO TATTOO», lancio
«NON PERDERE L’EVENTO!» e beneficio 01 «AGGIUNGI UN PICCOLO TATUAGGIO».
La scritta «INSIEME.» è stata rimossa. «SALVA LA DATA.» è ora in basso,
su un cartello rosso e giallo con calendario e spunta animati, lasciando visibili
la data e gli orari del sorgente. `src/TattooGraphics.tsx` contiene illustrazioni
vettoriali originali animate: macchinetta con tratto d’inchiostro, cuore con
pugnale, farfalla, rosa, stelle e coppia di cuori. Sono elementi decorativi,
non una riproduzione del catalogo effettivo dell’evento.

## Ashura video 2 — scegli il catalogo

`TattooCatalogEdit`, 1080×1920, 60 fps, 1877 fotogrammi (31,283 s).
Originale: asset MOV della release GitHub `video2`, SHA-256
`79f258fd489e36dbdc297f491ba47075bd38af09badb192e03824d1c13cf2d92`.

Montaggio realizzato con HyperFrames 0.9.34 e Remotion 4.0.538. HyperFrames
contiene i titoli approvati, le illustrazioni flash e le transizioni sui bordi;
Remotion compone questo livello trasparente con il video originale integrale,
zoom, sottotitoli e 31 effetti sonori originali. Nessuna musica aggiunta.
Le battute dialettali restano nel parlato originale e sono sottotitolate con
le traduzioni approvate «No, non lo sapevo!» e «Che figata!». L’offerta nei
sottotitoli è esattamente «1 tatuaggio €30, due a €50».

- `src/TattooCatalogEdit.tsx`: video, zoom, sottotitoli e compositing.
- `src/captions-04.json`: parole e timestamp approvati, relativi al sorgente.
- `data/script-04-it.txt`: testo approvato.
- `data/sound-events-04.json`: cue degli effetti.
- `hyperframes-video2/index.html`: composizione originale HTML/GSAP.
- `hyperframes-video2/DESIGN.md`: identità visiva e note di compositing.

I media generati sono in `public/nuovo04` (ignorati da Git). Per ricreare il
livello grafico dopo `npm run check` nella cartella HyperFrames:

```bash
HYPERFRAMES_BROWSER_PATH=/usr/bin/chromium npx hyperframes@0.9.34 render --format png-sequence --fps 60 --quality high --workers 1 --no-low-memory-mode --output ../public/nuovo04/overlays --strict
```

L’anteprima HyperFrames si apre con `npx hyperframes preview --background` e
l’URL Studio `http://localhost:3002/#project/hyperframes-video2`. La composizione
è intenzionalmente trasparente e senza audio: filmato, voce e suoni sono
aggiunti da Remotion. Per esportare il risultato completo:

```bash
python scripts/sound_design.py --events data/sound-events-04.json --duration 31.283333 --out public/nuovo04/sfx
npm run lint
npx remotion render src/index.ts TattooCatalogEdit out/ashura-black-friday-2.mp4 --browser-executable=/usr/bin/chromium --codec=h264 --crf=18 --pixel-format=yuv420p --jpeg-quality=95 --concurrency=2
```

Consegna: `video-ashura-black-friday-2.mp4` nella radice del repository. Il primo
montaggio e le composizioni precedenti restano disponibili.

La cattura HyperFrames di questo ambiente usa un singolo worker Chromium e
transizioni SVG leggere, per evitare il blocco della cattura parallela su
software GL. Sono stati verificati tutti i 1877 PNG RGBA. I fotogrammi esportati
sono numerati da `frame_000001.png`; Remotion associa il fotogramma 0 al PNG 1.
La voce è a 0,9 e il livello effetti a 0,65 per lasciare spazio al parlato.
