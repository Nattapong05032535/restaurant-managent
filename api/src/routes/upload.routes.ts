import { Router, Request, Response } from 'express';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/receipt', upload.single('receipt'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'ไม่มีไฟล์ที่อัพโหลด' });
    }

    // ส่ง URL ของไฟล์กลับไป
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'เกิดข้อผิดพลาดในการอัพโหลดไฟล์' });
  }
});

export default router;

