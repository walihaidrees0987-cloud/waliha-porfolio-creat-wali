const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
require('dotenv').config({path:path.join(root,'.env.local'),quiet:true});
require('dotenv').config({path:path.join(root,'.env'),quiet:true});
const c=require('cloudinary').v2;
c.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET,secure:true});
const sources=['lib/cloudinary.js','app/data/editing-videos.js','app/data/social-videos.js'];
const files=[...new Set(sources.flatMap(file=>[...fs.readFileSync(path.join(root,file),'utf8').matchAll(/["'](\/(?:videos|images\/products)\/[^"']+)["']/g)].map(m=>m[1])))];
const manifestPath=path.join(root,'lib/cloudinary-project-uploads.json');
const manifest=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{};
async function upload(local){
 const full=path.join(root,'public',local);
 const hash=crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
 if(manifest[local]?.hash===hash){console.log('Already uploaded '+local);return;}
 const resourceType=local.endsWith('.mp4')?'video':'image';
 let folder=local.startsWith('/videos/')?'waliha-portfolio/'+path.posix.dirname(local).slice(1):local.includes('doodh-patti')?'waliha-portfolio/artworks':'waliha-portfolio/products';
 if(/waliha-intro|gang-video/.test(local))folder='waliha-portfolio/videos/motion';
 const id=path.basename(local,path.extname(local))+'-'+hash.slice(0,10);
 let result;
 for(let attempt=1;attempt<=3;attempt++){
 try{result=await c.uploader.upload(full,{folder,public_id:id,resource_type:resourceType,overwrite:false,timeout:180000});break;}
 catch(e){if(attempt===3)throw Error('Upload failed '+local+': '+e.message);}
 }
 manifest[local]={secure_url:result.secure_url,public_id:result.public_id,resource_type:resourceType,bytes:result.bytes,hash};
 fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
 console.log('Uploaded '+local+' -> '+result.public_id);
}
(async()=>{
 if(!process.env.CLOUDINARY_API_SECRET)throw Error('Missing Cloudinary credentials');
 console.log('Uploading '+files.length+' referenced assets');
 let cursor=0;
 await Promise.all(Array.from({length:3},async()=>{while(cursor<files.length)await upload(files[cursor++]);}));
 for(const source of sources){let text=fs.readFileSync(path.join(root,source),'utf8');for(const local of files){text=text.replaceAll('"'+local+'"','"'+manifest[local].secure_url+'"');}fs.writeFileSync(path.join(root,source),text);}
 console.log('Replaced all '+files.length+' local references with returned Cloudinary HTTPS URLs.');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
