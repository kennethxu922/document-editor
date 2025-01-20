import React from 'react';

const SectionEditor = ({ sectionName, content, onContentChange, onSave }) => {
  return (
    <div>
      <h2>{sectionName}</h2>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={`Edit ${sectionName}...`}
        style={{ width: '100%', minHeight: '200px' }}
      />
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default SectionEditor;