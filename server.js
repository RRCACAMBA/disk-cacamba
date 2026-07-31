const express=require('express');const path=require('path');const app=express();const root=__dirname;
app.disable('x-powered-by');
app.use((req,res,next)=>{res.set('Cache-Control',req.path==='/'?'no-cache':'public, max-age=86400');next()});
app.use(express.static(root));
app.get('*',(req,res)=>res.sendFile(path.join(root,'index.html')));
const port=process.env.PORT||3000;app.listen(port,()=>console.log(`Disk Caçamba online na porta ${port}`));
