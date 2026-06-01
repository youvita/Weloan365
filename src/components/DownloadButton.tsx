import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { Download } from '@mui/icons-material';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ScreenAsset } from '../prototype/types';

export interface ExtraFile {
  /** Path inside the zip, e.g. `WeLoan_Design_System.md` or `style/Modern.md`. */
  path: string;
  /** Inline string content. Mutually exclusive with `url`. */
  content?: string;
  /** Fetched at download time (e.g. for a markdown file served from /public). */
  url?: string;
}

export interface DownloadButtonProps extends Omit<ButtonProps, 'onClick'> {
  filename: string;
  content: string;
  label?: string;
  /**
   * When provided, the button downloads a ZIP containing the markdown spec
   * plus every asset listed (fetched from the running app), grouped under
   * `assets/<category>/<filename>`. When omitted, falls back to the original
   * markdown-only download.
   */
  assets?: ScreenAsset[];
  /** Optional override for the ZIP file name. Defaults to `<filename>.zip`. */
  zipFilename?: string;
  /** Additional markdown / text files to include at the top of the zip. */
  extraFiles?: ExtraFile[];
}

const fetchBlob = async (url: string): Promise<Blob | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.blob();
  } catch {
    return null;
  }
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
  filename,
  content,
  label = 'Download UX/UI Spec',
  assets,
  zipFilename,
  extraFiles,
  disabled,
  ...rest
}) => {
  const [busy, setBusy] = React.useState(false);

  const handleDownload = async () => {
    const hasAssets = assets && assets.length > 0;
    const hasExtras = extraFiles && extraFiles.length > 0;

    // No assets or extras: original behavior — download the markdown directly.
    if (!hasAssets && !hasExtras) {
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, filename);
      return;
    }

    setBusy(true);
    try {
      const zip = new JSZip();
      zip.file(filename, content);

      const missing: string[] = [];

      if (hasExtras) {
        for (const extra of extraFiles!) {
          if (extra.content !== undefined) {
            zip.file(extra.path, extra.content);
          } else if (extra.url) {
            const blob = await fetchBlob(extra.url);
            if (!blob) {
              missing.push(extra.path);
              continue;
            }
            zip.file(extra.path, blob);
          }
        }
      }

      if (hasAssets) {
        const assetsFolder = zip.folder('assets')!;
        for (const asset of assets!) {
          const blob = await fetchBlob(asset.url);
          if (!blob) {
            missing.push(`assets/${asset.category}/${asset.filename}`);
            continue;
          }
          assetsFolder.folder(asset.category)!.file(asset.filename, blob);
        }
      }

      if (missing.length > 0) {
        zip.file(
          'MISSING.txt',
          `These files could not be fetched at package time:\n\n${missing
            .map((m) => `- ${m}`)
            .join('\n')}\n`,
        );
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const zipName = zipFilename ?? filename.replace(/\.md$/i, '') + '.zip';
      saveAs(blob, zipName);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={busy ? <CircularProgress size={16} color="inherit" /> : <Download />}
      onClick={handleDownload}
      disabled={disabled || busy}
      aria-label={`Download ${filename}`}
      {...rest}
    >
      {busy ? 'Preparing…' : label}
    </Button>
  );
};

export default DownloadButton;
