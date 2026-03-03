const form= document.getElementById("userForm");
const out = document.getElementById("out");

form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const fd = new FormData(form);
    const payload={
        name:fd.get("name"),
        lastname:fd.get("lastname"),
        city:fd.get("city"),
        birthday:fd.get("birthday"),
        phone_number:fd.get("phone_number"),
        undergroups_id:Number(fd.get("undergroups_id")),
    };

    const r =await fetch("http://localhost:5000/api/users" ,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        bady: JSON.stringify(payload),
    })

    out.textContent=`HTTP ${r.status}\n${await r.text()}`;
});