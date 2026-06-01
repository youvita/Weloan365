import React from 'react';
import { Box, Button, Chip, CircularProgress, Stack, Tab, Tabs, Typography } from '@mui/material';
import { ArrowBack, CheckCircle, ContentCopy, Download } from '@mui/icons-material';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import MobilePreview from '../../components/MobilePreview';
import { SCREENS, getScreen, getScreenMarkdown } from '../../prototype/registry';
import { ScreenAsset, ScreenId } from '../../prototype/types';
import {
  DESIGN_SYSTEM_MASTER_FILENAME,
  DESIGN_SYSTEM_MASTER_URL,
  getStyleProfileFilename,
  getStyleProfileMarkdown,
} from '../../design-system/profile-markdown';
import { DESIGN_TOKENS } from '../../design-system/tokens';
import { StyleOverrideProvider, useSettings } from '../providers/SettingsProvider';
import { UI_STYLE_IDS, UI_STYLES, UiStyleId } from '../../design-system/variants';

type PreviewTab = 'ux' | 'ui' | 'design-system';
const UX_BASELINE_STYLE: UiStyleId = 'sample-1';
const SAMPLE_SELECTION_PREFIX = 'weloan365.sampleSelection.';

const readSelectedSample = (screenId: string): UiStyleId => {
  if (typeof window === 'undefined') return UX_BASELINE_STYLE;
  const v = window.localStorage.getItem(`${SAMPLE_SELECTION_PREFIX}${screenId}`);
  if (v === 'sample-1' || v === 'sample-2' || v === 'sample-3') return v;
  return UX_BASELINE_STYLE;
};

const writeSelectedSample = (screenId: string, value: UiStyleId): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(`${SAMPLE_SELECTION_PREFIX}${screenId}`, value);
};

const ScreenPreviewPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const screen = id ? getScreen(id) : undefined;
  const { devMode } = useSettings();
  const [tab, setTab] = React.useState<PreviewTab>('ux');
  // Per-screen selection — does NOT propagate to other screens or to the
  // overview. Persisted in localStorage keyed by screen id so it survives
  // navigating to /settings to toggle developer mode and back.
  const [selectedSampleId, setSelectedSampleIdState] = React.useState<UiStyleId>(() =>
    id ? readSelectedSample(id) : UX_BASELINE_STYLE,
  );

  React.useEffect(() => {
    if (id) setSelectedSampleIdState(readSelectedSample(id));
  }, [id]);

  const setSelectedSampleId = React.useCallback(
    (value: UiStyleId) => {
      setSelectedSampleIdState(value);
      if (id) writeSelectedSample(id, value);
    },
    [id],
  );

  React.useEffect(() => {
    if (!devMode && tab === 'design-system') setTab('ui');
  }, [devMode, tab]);

  if (!screen) {
    return <Navigate to={`/screen/${SCREENS[0].id}`} replace />;
  }

  const Component = screen.component;
  const nextScreen = screen.next ? getScreen(screen.next) : undefined;

  const handleScreenNavigate = (screenId: ScreenId) => {
    if (getScreen(screenId)) navigate(`/screen/${screenId}`);
  };

  return (
    <motion.div
      key={screen.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/overview"
          startIcon={<ArrowBack />}
          sx={{ color: DESIGN_TOKENS.colors.primary_blue, mb: 1 }}
        >
          Back to overview
        </Button>
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{screen.title}</Typography>
        <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary }}>{screen.subtitle}</Typography>
      </Box>

      <Box
        sx={{
          borderBottom: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
          mb: 3,
        }}
      >
        <Tabs
          value={tab}
          onChange={(_e, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ minHeight: 44, '& .MuiTab-root': { minHeight: 44, textTransform: 'none', fontWeight: 600 } }}
        >
          <Tab value="ux" label="UX" />
          <Tab value="ui" label="UI" />
          {devMode && <Tab value="design-system" label="Design System" />}
        </Tabs>
      </Box>

      <AnimatePresence mode="wait">
        {tab === 'ux' && (
          <motion.div
            key="ux"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <StyleOverrideProvider styleId={UX_BASELINE_STYLE}>
                <MobilePreview>
                  <Component onNavigate={handleScreenNavigate} />
                </MobilePreview>
              </StyleOverrideProvider>
              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 12,
                  color: DESIGN_TOKENS.colors.text_tertiary,
                  textAlign: 'center',
                  maxWidth: 320,
                }}
              >
                Prototype UX · flow & layout only. Switch to the UI tab to compare visual styles.
              </Typography>
            </Box>
          </motion.div>
        )}

        {tab === 'ui' && (
          <motion.div
            key="ui"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {devMode ? (
              <DevUiView
                screen={screen}
                nextScreen={nextScreen}
                Component={Component}
                onScreenNavigate={handleScreenNavigate}
                activeStyleId={selectedSampleId}
              />
            ) : (
              <>
                <Typography sx={{ fontSize: 14, color: DESIGN_TOKENS.colors.text_secondary, mb: 2.5 }}>
                  Click a sample to pick the UI direction for this screen. Turn on developer mode to see the spec for the selected sample.
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                    gap: 3,
                    alignItems: 'flex-start',
                    justifyItems: 'center',
                  }}
                >
                  {UI_STYLE_IDS.map((id) => (
                    <UiOption
                      key={id}
                      id={id}
                      screen={screen}
                      selected={selectedSampleId === id}
                      onSelect={() => setSelectedSampleId(id)}
                      onScreenNavigate={handleScreenNavigate}
                      Component={Component}
                    />
                  ))}
                </Box>
              </>
            )}
          </motion.div>
        )}

        {tab === 'design-system' && devMode && (
          <motion.div
            key="design-system"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <DesignSystemView screen={screen} activeStyleId={selectedSampleId} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const fetchAssetBlob = async (url: string): Promise<Blob | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.blob();
  } catch {
    return null;
  }
};

const captureScreenUi = async (node: HTMLElement): Promise<Blob | null> => {
  const canvas = await html2canvas(node, {
    backgroundColor: null,
    scale: window.devicePixelRatio > 1 ? 2 : 1,
    useCORS: true,
    logging: false,
  });
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
};

const DevUiView: React.FC<{
  screen: NonNullable<ReturnType<typeof getScreen>>;
  nextScreen: ReturnType<typeof getScreen>;
  Component: React.ComponentType<{ onNavigate?: (id: ScreenId) => void }>;
  onScreenNavigate: (id: ScreenId) => void;
  activeStyleId: UiStyleId;
}> = ({ screen, nextScreen, Component, onScreenNavigate, activeStyleId }) => {
  const tokens = UI_STYLES[activeStyleId];
  const [downloading, setDownloading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const zip = new JSZip();
      const missing: string[] = [];

      const assetsFolder = zip.folder('assets')!;
      for (const asset of screen.assets as ScreenAsset[]) {
        const blob = await fetchAssetBlob(asset.url);
        if (!blob) {
          missing.push(`assets/${asset.category}/${asset.filename}`);
          continue;
        }
        assetsFolder.folder(asset.category)!.file(asset.filename, blob);
      }

      if (missing.length > 0) {
        zip.file(
          'MISSING.txt',
          `These files could not be packaged:\n\n${missing.map((m) => `- ${m}`).join('\n')}\n`,
        );
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `WeLoan365_${screen.id}_Assets.zip`);
    } finally {
      setDownloading(false);
    }
  };

  const variantMarkdown = React.useMemo(
    () => getScreenMarkdown(screen, activeStyleId),
    [screen, activeStyleId],
  );

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(variantMarkdown);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = variantMarkdown;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([variantMarkdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `WeLoan365_${screen.id}_${activeStyleId}_Spec.md`);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
        gap: 4,
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ justifySelf: { xs: 'center', md: 'flex-start' } }}>
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.25 }}>
          <Box
            sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: tokens.primary }}
          />
          <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{tokens.name}</Typography>
          <Chip
            size="small"
            icon={<CheckCircle sx={{ fontSize: 14, color: `${tokens.onPrimary} !important` }} />}
            label="Active"
            sx={{
              height: 20,
              fontSize: 10,
              fontWeight: 700,
              backgroundColor: tokens.primary,
              color: tokens.onPrimary,
              '& .MuiChip-icon': { ml: 0.5 },
            }}
          />
        </Stack>
        <StyleOverrideProvider styleId={activeStyleId}>
          <MobilePreview>
            <Component onNavigate={onScreenNavigate} />
          </MobilePreview>
        </StyleOverrideProvider>
        <Typography
          sx={{
            mt: 1.5,
            fontSize: 12,
            color: DESIGN_TOKENS.colors.text_tertiary,
            maxWidth: 320,
          }}
        >
          Developer mode is ON. Rendering the “{tokens.name}” style selected in Settings.
        </Typography>
      </Box>

      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography sx={{ fontSize: 12, color: DESIGN_TOKENS.colors.text_tertiary, fontWeight: 600, letterSpacing: 0.5 }}>
              SPECIFICATION
            </Typography>
            <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary }}>
              Engineering metadata for this screen. The download bundles every asset this screen uses (icons, banners, illustrations, flags, logos) — nothing else. Use “Download MD” below for the markdown spec.
            </Typography>
          </Box>
          <Button
            onClick={handleDownload}
            disabled={downloading}
            variant="contained"
            startIcon={downloading ? <CircularProgress size={16} color="inherit" /> : <Download />}
            sx={{
              backgroundColor: DESIGN_TOKENS.colors.primary_blue,
              '&:hover': { backgroundColor: DESIGN_TOKENS.colors.primary_blue_hover },
              flexShrink: 0,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {downloading ? 'Packaging…' : 'Download Assets'}
          </Button>
        </Stack>

        <Stack spacing={1.25} sx={{ mb: 3 }}>
          <MetaRow label="Group" value={screen.group} />
          <MetaRow label="Screen ID" value={screen.id} />
          <MetaRow
            label="Status"
            value={
              <Chip
                label={screen.status}
                size="small"
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 600,
                  backgroundColor:
                    screen.status === 'ready'
                      ? 'rgba(40, 167, 69, 0.12)'
                      : 'rgba(255, 165, 0, 0.12)',
                  color:
                    screen.status === 'ready'
                      ? DESIGN_TOKENS.colors.success_green
                      : DESIGN_TOKENS.colors.brand_logo_orange,
                }}
              />
            }
          />
          <MetaRow
            label="Next screen"
            value={
              nextScreen ? (
                <Button
                  component={Link}
                  to={`/screen/${nextScreen.id}`}
                  size="small"
                  sx={{ color: DESIGN_TOKENS.colors.primary_blue, fontWeight: 600 }}
                >
                  {nextScreen.title} →
                </Button>
              ) : (
                <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_tertiary }}>—</Typography>
              )
            }
          />
        </Stack>

        <Box
          sx={{
            backgroundColor: DESIGN_TOKENS.colors.background_white,
            border: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
            borderRadius: 1.5,
            p: 2,
            maxHeight: 360,
            overflowY: 'auto',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 12,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            color: DESIGN_TOKENS.colors.text_primary,
          }}
        >
          {variantMarkdown}
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button
            onClick={handleDownloadMarkdown}
            size="small"
            startIcon={<Download />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: DESIGN_TOKENS.colors.primary_blue,
            }}
          >
            Download MD
          </Button>
          <Button
            onClick={handleCopyMarkdown}
            size="small"
            startIcon={copied ? <CheckCircle /> : <ContentCopy />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: copied ? DESIGN_TOKENS.colors.success_green : DESIGN_TOKENS.colors.primary_blue,
            }}
          >
            {copied ? 'Copied' : 'Copy markdown'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

const UiOption: React.FC<{
  id: UiStyleId;
  screen: NonNullable<ReturnType<typeof getScreen>>;
  selected: boolean;
  onSelect: () => void;
  onScreenNavigate: (id: ScreenId) => void;
  Component: React.ComponentType<{ onNavigate?: (id: ScreenId) => void }>;
}> = ({ id, screen, selected, onSelect, onScreenNavigate, Component }) => {
  const tokens = UI_STYLES[id];
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [downloadingDs, setDownloadingDs] = React.useState(false);

  const handleDownloadDesignSystem = async () => {
    setDownloadingDs(true);
    try {
      const zip = new JSZip();
      const missing: string[] = [];

      // Screenshot of this sample's preview.
      if (previewRef.current) {
        const shot = await captureScreenUi(previewRef.current);
        if (shot) zip.file(`screen-ui_${screen.id}_${id}.png`, shot);
        else missing.push(`screen-ui_${screen.id}_${id}.png`);
      }

      // Variant-aware screen spec.
      zip.file(`WeLoan365_${screen.id}_${id}_Spec.md`, getScreenMarkdown(screen, id));

      // Style profile for this sample.
      zip.file(getStyleProfileFilename(id), getStyleProfileMarkdown(id));

      // Master design system fetched from /public (binary-preserving copy).
      const masterBlob = await fetchAssetBlob(DESIGN_SYSTEM_MASTER_URL);
      if (masterBlob) {
        zip.file(DESIGN_SYSTEM_MASTER_FILENAME, masterBlob);
      } else {
        missing.push(DESIGN_SYSTEM_MASTER_FILENAME);
      }

      // Convenience: a single merged file (master + profile + screen spec).
      const masterText = masterBlob ? await masterBlob.text() : '';
      const mergedMd =
        [
          masterText.trimEnd(),
          getStyleProfileMarkdown(id).trimEnd(),
          getScreenMarkdown(screen, id).trimEnd(),
        ]
          .filter(Boolean)
          .join('\n\n---\n\n') + '\n';
      zip.file(`WeLoan365_${screen.id}_${id}_DesignSystem.md`, mergedMd);

      // Screen-specific assets.
      const assetsFolder = zip.folder('assets')!;
      for (const asset of screen.assets as ScreenAsset[]) {
        const blob = await fetchAssetBlob(asset.url);
        if (!blob) {
          missing.push(`assets/${asset.category}/${asset.filename}`);
          continue;
        }
        assetsFolder.folder(asset.category)!.file(asset.filename, blob);
      }

      if (missing.length > 0) {
        zip.file(
          'MISSING.txt',
          `These files could not be packaged:\n\n${missing.map((m) => `- ${m}`).join('\n')}\n`,
        );
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `WeLoan365_${screen.id}_${id}_DesignSystem.zip`);
    } finally {
      setDownloadingDs(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', mb: 1.5 }}>
        <Stack direction="row" spacing={0.75} alignItems="center">
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: tokens.primary,
            }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{tokens.name}</Typography>
          {selected && (
            <Chip
              size="small"
              icon={<CheckCircle sx={{ fontSize: 14, color: `${tokens.onPrimary} !important` }} />}
              label="Selected"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                backgroundColor: tokens.primary,
                color: tokens.onPrimary,
                '& .MuiChip-icon': { ml: 0.5 },
              }}
            />
          )}
        </Stack>
      </Box>

      <Box
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect();
          }
        }}
        sx={{
          p: 0.5,
          borderRadius: `${tokens.frame.radius + 6}px`,
          border: `3px solid ${selected ? tokens.primary : 'transparent'}`,
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, transform 0.2s ease',
          '&:hover': { transform: 'translateY(-2px)' },
          '&:focus-visible': { outline: `3px solid ${tokens.primary}`, outlineOffset: 4 },
        }}
      >
        <Box ref={previewRef}>
          <StyleOverrideProvider styleId={id}>
            <MobilePreview>
              <Component onNavigate={onScreenNavigate} />
            </MobilePreview>
          </StyleOverrideProvider>
        </Box>
      </Box>

      <Stack spacing={1} sx={{ width: '100%', maxWidth: 320, mt: 1.75 }}>
        <Button
          onClick={handleDownloadDesignSystem}
          disabled={downloadingDs}
          variant="contained"
          fullWidth
          startIcon={downloadingDs ? <CircularProgress size={16} color="inherit" /> : <Download />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            backgroundColor: tokens.primary,
            color: tokens.onPrimary,
            '&:hover': { backgroundColor: tokens.primaryHover },
          }}
        >
          {downloadingDs ? 'Packaging…' : 'Download Design System (.zip)'}
        </Button>
      </Stack>
    </Box>
  );
};

const DesignSystemView: React.FC<{
  screen: NonNullable<ReturnType<typeof getScreen>>;
  activeStyleId: UiStyleId;
}> = ({ screen, activeStyleId }) => {
  const tokens = UI_STYLES[activeStyleId];
  const [masterMd, setMasterMd] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const styleProfileMd = React.useMemo(() => getStyleProfileMarkdown(activeStyleId), [activeStyleId]);
  const screenMd = React.useMemo(
    () => getScreenMarkdown(screen, activeStyleId),
    [screen, activeStyleId],
  );

  React.useEffect(() => {
    let cancelled = false;
    setMasterMd(null);
    setError(null);
    fetch(DESIGN_SYSTEM_MASTER_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load design system (${res.status})`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setMasterMd(text);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Could not load design system');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const mergedMd = React.useMemo(() => {
    if (masterMd === null) return null;
    return [masterMd.trimEnd(), styleProfileMd.trimEnd(), screenMd.trimEnd()].join('\n\n---\n\n') + '\n';
  }, [masterMd, styleProfileMd, screenMd]);

  const handleCopy = async () => {
    if (!mergedMd) return;
    try {
      await navigator.clipboard.writeText(mergedMd);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for environments without navigator.clipboard
      const ta = document.createElement('textarea');
      ta.value = mergedMd;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleDownloadMd = () => {
    if (!mergedMd) return;
    const blob = new Blob([mergedMd], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `WeLoan365_${screen.id}_${activeStyleId}_DesignSystem.md`);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box>
          <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 0.5 }}>
            <Box
              sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: tokens.primary }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: DESIGN_TOKENS.colors.text_tertiary, letterSpacing: 0.5 }}>
              DESIGN SYSTEM · {tokens.name.toUpperCase()}
            </Typography>
          </Stack>
          <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_secondary }}>
            Master design system, the style profile for {tokens.name}, and this screen's variant spec — merged into one document.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
          <Button
            onClick={handleDownloadMd}
            disabled={mergedMd === null}
            startIcon={<Download />}
            variant="outlined"
            sx={{
              borderColor: tokens.primary,
              color: tokens.primary,
              '&:hover': { borderColor: tokens.primaryHover, backgroundColor: `${tokens.primary}0F` },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Download MD
          </Button>
          <Button
            onClick={handleCopy}
            disabled={mergedMd === null}
            startIcon={copied ? <CheckCircle /> : <ContentCopy />}
            variant="contained"
            sx={{
              backgroundColor: tokens.primary,
              color: tokens.onPrimary,
              '&:hover': { backgroundColor: tokens.primaryHover },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            {copied ? 'Copied' : 'Copy Design System'}
          </Button>
        </Stack>
      </Stack>

      <MarkdownPanel
        title={`${DESIGN_SYSTEM_MASTER_FILENAME} + ${getStyleProfileFilename(activeStyleId)} + ${screen.id}.md`}
        body={mergedMd}
        error={error}
      />
    </Box>
  );
};

const MarkdownPanel: React.FC<{ title: string; body: string | null; error?: string | null }> = ({
  title,
  body,
  error,
}) => (
  <Box>
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.6,
        color: DESIGN_TOKENS.colors.text_tertiary,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        backgroundColor: DESIGN_TOKENS.colors.background_white,
        border: `1px solid ${DESIGN_TOKENS.colors.border_light}`,
        borderRadius: 1.5,
        p: 2,
        maxHeight: 720,
        overflowY: 'auto',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 12,
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        color: DESIGN_TOKENS.colors.text_primary,
      }}
    >
      {error ? (
        <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary, fontSize: 13 }}>
          {error}
        </Typography>
      ) : body === null ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={14} />
          <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary, fontSize: 13 }}>
            Loading…
          </Typography>
        </Stack>
      ) : (
        body
      )}
    </Box>
  </Box>
);

const MetaRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_tertiary, minWidth: 100 }}>{label}</Typography>
    {typeof value === 'string' ? (
      <Typography sx={{ fontSize: 13, color: DESIGN_TOKENS.colors.text_primary, fontWeight: 500 }}>{value}</Typography>
    ) : (
      value
    )}
  </Box>
);

export default ScreenPreviewPage;
