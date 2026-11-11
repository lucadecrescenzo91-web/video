# Religione — re-edit approvato

La prima proposta di tagli sostanziali NON è stata approvata. L’utente ha chiesto di mantenere la tesi, il senso e i riferimenti del discorso, inclusi quelli alle interpretazioni su sfruttamento e abusi. Ha approvato i testi grafici elencati in proposed-copy.json.

La versione implementata conserva hook, argomentazioni e CTA originali. Il blocco sul metodo interpretativo precede Corinzi e Romani; CTA centrale, circa 73,6–81,47 s. Sono tagliati introduzione ridondante, inciso sulla pronuncia e ripetizione della metafora della trappola, lasciando la relativa conclusione su Romani 1 e 2.

`final-edl.json` è la selezione effettiva: 9901 fotogrammi a 60 fps, circa 165,02 s. La proposta di tagli sostanziali è superata e non è stata applicata.

`source-caption-pages.json` deriva dai sottotitoli già impressi nel file, riconosciuti localmente con Tesseract e corretti negli errori OCR. Il blocco CTA originale non ha nuove frasi di parlato inventate. I sottotitoli originali sono ricoperti da una versione più leggibile durante le sequenze di parlato e riproposti negli inserti.

Media generati in public/religione, esclusi da Git. Originale: release GitHub religione, asset v26044gc0000da6mo47og65k06hpef60.mp4, mantenuto intatto in /workspace/video-assets/religione/originale.mp4.

Pipeline: religione_prepare.py → religione_captions.py → religione_matte.py → religione_retime_masks.py. Le maschere riguardano soltanto il titolo dietro la parte alta della figura; il video della persona rimane quello originale. Vengono calcolate solo nelle finestre utilizzate, con preriscaldamento dello stato ricorrente. I timestamp di presentazione sono usati per i piccoli vuoti VFR alle giunzioni, evitando spostamenti delle maschere rispetto al volto.

Inserti HyperFrames: progetto ../../.. /motion-religione, master silenzioso di 50 secondi. Il montaggio usa cinque intervalli del master, per un totale di 50 secondi di inserti; le transizioni visive non modificano il parlato. Audio originale separato e continuo sulla selezione montata; 61 effetti sintetizzati originali da sound-events.json, nessuna musica o voce sintetica.

I controlli HyperFrames hanno superato layout, runtime, motion e contrasto (26/26). Avvisi revisionati: struttura inline dei cinque inserti (intenzionalmente controllati dal template unico); master silenzioso perché la voce e gli effetti sono nel montaggio Remotion; primo istante e brevi tenute intenzionali per la lettura, coperti dai raccordi del montaggio. Non dichiarare che si tratta di un accertamento esegetico accademico o di un consenso religioso unanime.
