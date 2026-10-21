const KEY="payverify_demo_payments_v1";
const form=document.getElementById("paymentForm"),result=document.getElementById("result");
form.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(form);const trx=String(fd.get("trx")).trim();let items=JSON.parse(localStorage.getItem(KEY)||"[]");
if(items.some(x=>x.trx.toLowerCase()===trx.toLowerCase())){result.textContent="এই TrxID দিয়ে আগে আবেদন জমা হয়েছে।";result.className="result error";return}
const item={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),method:fd.get("method"),amount:Number(fd.get("amount")),sender:String(fd.get("sender")).trim(),trx,note:String(fd.get("note")).trim(),status:"অপেক্ষমাণ",created:new Date().toLocaleString("bn-BD")};
items.unshift(item);localStorage.setItem(KEY,JSON.stringify(items));form.reset();result.textContent="ডেমো আবেদন এই ডিভাইসে সংরক্ষিত হয়েছে। বাস্তব সাইটে এটি অ্যাডমিনের কাছে পাঠাতে ব্যাকএন্ড লাগবে।";result.className="result";});

const copyBtn=document.getElementById("copyNumber");
if(copyBtn){copyBtn.addEventListener("click",async()=>{const number=document.getElementById("paymentNumber").textContent;try{await navigator.clipboard.writeText(number);copyBtn.textContent="কপি হয়েছে";}catch(e){const range=document.createRange();range.selectNodeContents(document.getElementById("paymentNumber"));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);copyBtn.textContent="নম্বর সিলেক্ট হয়েছে";}});}
