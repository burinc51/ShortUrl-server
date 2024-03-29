
# การตั้งค่าเว็บไซต์ shorturl สำหรับ front end



ตั้งค่าและใช้งานเซิร์ฟเวอร์สำหรับเว็บไซต์ย่อ URL ที่โฮสต์บน Netlify โดยใช้ตัวอย่างจาก https://burinshorturl.netlify.app
## สิ่งที่คุณต้องมี:
 - โปรแกรม Git
 - Node.js
 - MongoDB 


## เริ่มต้นการใช้งาน
โคลน repository
```bash
https://github.com/burinc51/ShortUrl-server.git
```
ติดตั้งแพ็กเกจ (packages)
```bash
cd ShortUrl-server
npm install
```
 เปลี่ยน url ที่ติดต่อกับ mongodb ที่บรรทัด 15 ที่ไฟล์ index.js
```bash
const mgdb = " url ที่ติดต่อกับ mongodb";
    
```
รันเว็บเซิร์ฟเวอร์
```bash
npm start
```

