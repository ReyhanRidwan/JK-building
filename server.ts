/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { ARTICLES, FAQ_DATA, PROJECTS } from './src/data';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route - Get all articles
  app.get('/api/articles', (req, res) => {
    try {
      res.status(200).json({ success: true, data: ARTICLES });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Gagal mengambil artikel.' });
    }
  });

  // API Route - Submit contact consultation request
  app.post('/api/contact', (req, res) => {
    try {
      const { name, phone, email, projectType, message } = req.body;

      if (!name || !phone) {
        return res.status(400).json({
          success: false,
          message: 'Nama lengkap dan nomor WhatsApp wajib diisi.'
        });
      }

      // Log the consultation request securely on the backend
      console.log('--- KONSULTASI MASUK (JK BUILDING) ---');
      console.log(`Pengirim : ${name}`);
      console.log(`No. WA   : ${phone}`);
      console.log(`Email    : ${email || 'Tidak dilampirkan'}`);
      console.log(`Tipe     : ${projectType}`);
      console.log(`Pesan    : ${message}`);
      console.log('---------------------------------------');

      // Return successful response
      return res.status(200).json({
        success: true,
        message: 'Permintaan konsultasi Anda berhasil diregistrasi oleh server JK Building. Tim kami akan menghubungi Anda segera melalui WhatsApp!',
        data: { name, phone, projectType }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Terjadi kegagalan server saat mengirim pesan.'
      });
    }
  });

  // API Route - Calculate Detailed RAB
  app.post('/api/rab/calculate', (req, res) => {
    try {
      const { areaSize, floorsCount, materialQuality } = req.body;

      const area = parseFloat(areaSize);
      const floors = parseInt(floorsCount, 10);

      if (isNaN(area) || area <= 0 || isNaN(floors) || floors <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Parameter luas bangunan dan jumlah lantai tidak valid.'
        });
      }

      // Cost rates per square meter (IDR)
      let ratePerMeter = 3500000; // Default standard
      let qualityLabel = 'Standar';

      if (materialQuality === 'medium') {
        ratePerMeter = 4400000;
        qualityLabel = 'Medium';
      } else if (materialQuality === 'premium') {
        ratePerMeter = 5300000;
        qualityLabel = 'Premium';
      }

      // Floor multiplier factor (1 story = 1.0, 2 story = 1.85 due to shared columns, 3 story = 2.65)
      let floorMultiplier = 1.0;
      if (floors === 2) {
        floorMultiplier = 1.85;
      } else if (floors >= 3) {
        floorMultiplier = 2.65 * (floors / 3);
      }

      // Base total cost calculation
      const totalEstimatedCost = area * ratePerMeter * floorMultiplier;

      // Cost distribution breakdown
      const breakdown = {
        struktur: Math.round(totalEstimatedCost * 0.40), // 40%
        finishing: Math.round(totalEstimatedCost * 0.35), // 35%
        atapPlafon: Math.round(totalEstimatedCost * 0.15), // 15%
        mep: Math.round(totalEstimatedCost * 0.10) // 10%
      };

      return res.status(200).json({
        success: true,
        data: {
          area,
          floors,
          materialQuality: qualityLabel,
          ratePerMeter,
          totalEstimatedCost: Math.round(totalEstimatedCost),
          breakdown
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Gagal melakukan perhitungan RAB kasar.'
      });
    }
  });

  // Serve static assets or mount Vite dev server in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted successfully on Express (Development Mode)');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Static asset server initialized on Express (Production Mode)');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JK Building server initialized and listening on http://localhost:${PORT}`);
  });
}

startServer();
