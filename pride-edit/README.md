# Le parole contano — montaggio Pride

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
