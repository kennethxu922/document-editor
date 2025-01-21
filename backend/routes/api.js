const express = require('express');
const router = express.Router();
const { pool } = require('../db/connection');

// Get all sections
router.get('/sections', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM sections ORDER BY section_number');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update a section with version history
router.put('/sections/:sectionNumber', async (req, res) => {
  const { sectionNumber } = req.params;
  const { content } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    
    // Update main section
    const updateResult = await client.query(
      `UPDATE sections 
       SET content = $1 
       WHERE section_number = $2 
       RETURNING id`,
      [content, sectionNumber]
    );

    // Add version history
    await client.query(
      `INSERT INTO section_versions (section_id, content)
       VALUES ($1, $2)`,
      [updateResult.rows[0].id, content]
    );

    await client.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', err);
    res.status(500).send('Error saving changes');
  } finally {
    client.release();
  }
});

// Get version history for a section
router.get('/sections/:sectionNumber/versions', async (req, res) => {
  const { sectionNumber } = req.params;

  try {
    const { rows } = await pool.query(
      `SELECT v.id, v.content, v.created_at 
       FROM section_versions v
       JOIN sections s ON v.section_id = s.id
       WHERE s.section_number = $1
       ORDER BY v.created_at DESC`,
      [sectionNumber]
    );
    
    res.json(rows);
  } catch (err) {
    console.error('Version history error:', err);
    res.status(500).send('Error retrieving history');
  }
});

module.exports = router;