import React from 'react';
import { Box, Typography } from '@mui/material';
import DownloadButton from '../../components/DownloadButton';
import { SCREENS } from '../../prototype/registry';
import { DESIGN_TOKENS } from '../../design-system/tokens';
import {
  DESIGN_SYSTEM_MASTER_FILENAME,
  DESIGN_SYSTEM_MASTER_URL,
  getStyleProfileFilename,
  getStyleProfileMarkdown,
} from '../../design-system/profile-markdown';
import { UI_STYLE_IDS } from '../../design-system/variants';

const DownloadsPage: React.FC = () => {
  const fullSpec = SCREENS.map((s) => s.markdown).join('\n\n---\n\n');

  const allAssets = Array.from(
    new Map(SCREENS.flatMap((s) => s.assets).map((a) => [a.url, a])).values(),
  );

  const extraFiles = [
    { path: DESIGN_SYSTEM_MASTER_FILENAME, url: DESIGN_SYSTEM_MASTER_URL },
    ...UI_STYLE_IDS.map((id) => ({
      path: getStyleProfileFilename(id),
      content: getStyleProfileMarkdown(id),
    })),
  ];

  return (
    <Box>
      <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 1 }}>Download all specs</Typography>
      <Typography sx={{ color: DESIGN_TOKENS.colors.text_secondary, mb: 3 }}>
        Export every screen's UX/UI markdown specification as one bundle.
      </Typography>
      <DownloadButton
        filename="WeLoan365_All_Specs.md"
        content={fullSpec}
        assets={allAssets}
        extraFiles={extraFiles}
        zipFilename="WeLoan365_All_Specs.zip"
        label="Download bundled spec"
        sx={{
          backgroundColor: DESIGN_TOKENS.colors.primary_blue,
          '&:hover': { backgroundColor: DESIGN_TOKENS.colors.primary_blue_hover },
        }}
      />
    </Box>
  );
};

export default DownloadsPage;
