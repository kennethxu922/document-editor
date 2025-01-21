import React, { useState, useEffect } from 'react';
import SectionEditor from '../components/SectionEditor';

const DocumentPage = () => {
  const [section1Content, setSection1Content] = useState('');
  const [section2Content, setSection2Content] = useState('');
  const [status, setStatus] = useState('');

  // Load initial content from backend
  useEffect(() => {
    fetch('http://localhost:5001/api/sections')
      .then(res => res.json())
      .then(data => {
        setSection1Content(data[0]?.content || '');
        setSection2Content(data[1]?.content || '');
      })
      .catch(err => console.error('Loading error:', err));
  }, []);

  // Unified save handler
  const handleSave = async (sectionNumber, content) => {
    try {
      setStatus('Saving...');
      const response = await fetch(
        `http://localhost:5001/api/sections/${sectionNumber}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) throw new Error('Save failed');
      setStatus('✅ Saved successfully!');
      
      // Clear status message after 2 seconds
      setTimeout(() => setStatus(''), 2000);
    } catch (err) {
      console.error('Save error:', err);
      setStatus('❌ Error saving changes');
      setTimeout(() => setStatus(''), 2000);
    }
  };

  return (
    <div>
      <h1>Document Editor</h1>
      {status && <div style={{ margin: '10px 0', color: status.includes('✅') ? 'green' : 'red' }}>{status}</div>}
      
      <SectionEditor
        sectionName="Section 1"
        content={section1Content}
        onContentChange={setSection1Content}
        onSave={() => handleSave(1, section1Content)}
      />
      <SectionEditor
        sectionName="Section 2"
        content={section2Content}
        onContentChange={setSection2Content}
        onSave={() => handleSave(2, section2Content)}
      />
    </div>
  );
};

export default DocumentPage;