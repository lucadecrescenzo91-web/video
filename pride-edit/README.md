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
