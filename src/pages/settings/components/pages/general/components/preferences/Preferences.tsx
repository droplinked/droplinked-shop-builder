import SectionContainer from 'pages/settings/components/common/SectionContainer';
import React from 'react';
import DefaultStoreLanguage from './DefaultStoreLanguage';

function Preferences() {
  return (
    <SectionContainer title="Preferences" px={{ base: 4, md: 6 }}>
      <DefaultStoreLanguage />
    </SectionContainer>
  );
}

export default Preferences;
