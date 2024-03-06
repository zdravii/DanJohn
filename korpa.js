function ajaxPoziv(nazivFajla,rezultat) {
    $.ajax({
        url : "assets/data/" + nazivFajla,
        type : "GET",
        dataType : "json",
        success : rezultat,
        error : function(xhr,status,error) {
            console.log(error);
        }
    })
}

// REGEX

    const regexIme = /^[A-ZČŠĆŽĐ][a-zčšćžđ]{2,15}(\s[A-ZČŠĆŽĐ][a-zčšćžđ]{2,15})?$/;
    
    const regexPrezime = /^[A-ZČŠĆŽĐ][a-zčšćžđ]{3,20}(\s[A-ZČŠĆŽĐ][a-zčšćžđ]{3,20})?$/;

    const regexMail = /^[a-z]((\.|-|)?[a-z0-9]){2,}@[a-z]((\.|-|)?[a-z0-9]+){2,}\.[a-z]{2,6}$/;

    // const regexAdresa =  /^[A-ZČŠĆŽĐ][a-zčšćžđ]{4,30}$/;

    const regexBroj = /^\+381[0-9]{2}-[0-9]{3}-[0-9]{3}$/;

// REGEX

window.onload = function() {
    
    function ispisMenia(nizMeni) {
        let ispis = '<ul class="navbar-nav">'
        for (let obj of nizMeni) {
            ispis += `<li class="nav-item">
            <a class="nav-link" href="${obj.href}">${obj.naziv}</a>
            </li>`
        }
        ispis += '</ul>'
        document.getElementById("navbarNav").innerHTML=ispis;
    }

    function ipsisForme(inputi) {
        let ispis = "";
        for (let input of inputi) {
            ispis += `<input type="${input.type}" name="${input.name}" id="${input.name}" placeholder="${input.placeholder}" class="form-control mt-2">`
        }
        ispis+=`<input type="button" value="Potvrdi" id="submit" class="form-control mt-2 border border-5">`
        document.getElementById("forma").innerHTML=ispis;
    }

    function ispitiajVrednosti(regex,input) {
        var nizGresaka = [];
        var brojGresaka = 0;
        var input = document.getElementById(`${input}`);
        if(!regex.test(input.value)){
            if(input == 'ime'){
                nizGresaka.push("Ime nije unešeno u ispravnom formatu!");
                brojGresaka++;
            }
            if (input == 'prezime') {
                nizGresaka.push("Prezime nije unešeno u ispravnom formatu!");
                brojGresaka++;
            }
            if (input == 'email') {
                nizGresaka.push("Email nije unešen u ispravnom formatu!");
                brojGresaka++;
            }
            if (input == 'adresa') {
                nizGresaka.push("Adresa nije unešena u ispravnom formatu!");
                brojGresaka++;
            }
            if (input == 'broj') {
                nizGresaka.push("Broj telefona nije unešen u ispravnom formatu!");
                brojGresaka++;
            }
        }
    }

    ajaxPoziv("meni.json",function(rezultat) {
        ispisMenia(rezultat);
    });

    ajaxPoziv("input.json",function(rezultat){
        ipsisForme(rezultat);
    })

    var submit = document.getElementById("submit");

    submit.addEventListener("click",function () {
        ispitiajVrednosti(regexIme,ime);
        ispitiajVrednosti(regexPrezime,prezime);
        ispitiajVrednosti(regexMail,email);
        ispitiajVrednosti(regexBroj,broj);
        console.log(brojGresaka);
    })

}