import React, { useState } from 'react';
import SectionEditor from '../components/SectionEditor';

const DocumentPage = () => {
  const [section1Content, setSection1Content] = useState('');
  const [section2Content, setSection2Content] = useState('');

  const handleSaveSection1 = () => {
    console.log('Section 1 saved:', section1Content);
    // Implement backend save functionality here
  };

  const handleSaveSection2 = () => {
    console.log('Section 2 saved:', section2Content);
    // Implement backend save functionality here
  };

  return (
    <div>
      <h1>Document Editor</h1>
      <SectionEditor
        sectionName="Section 1"
        content={section1Content}
        onContentChange={setSection1Content}
        onSave={handleSaveSection1}
      />
      <SectionEditor
        sectionName="Section 2"
        content={section2Content}
        onContentChange={setSection2Content}
        onSave={handleSaveSection2}
      />
    </div>
  );
};

export default DocumentPage;