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

    const regexBroj = /^\+381[0-9]{2}-[0-9]{3}-[0-9]{3}$/;

// REGEX

window.onload = function() {

    let proizvodi = uzmiItemIzLocalStorage("proizvodIzKorpe");

    if (proizvodi == null) {
        $('#proizvodi').html('<h1 class="text-danger text-center mt-5 mb-5">Vaša korpa je prazna!</h1>');
    }
    else{
        ispisProizvodaUKorpu();
    }


    function ispisProizvodaUKorpu() {
        ajaxPoziv("proizvodi.json",function(rezultat) {
            // console.log(rezultat);
            let nizProizvoda = [];
            for (let proizvodJSON of rezultat) {
                for (let proizvodLS of proizvodi) {
                    if(proizvodLS.id == proizvodJSON.id){
                        proizvodJSON.kolicina = proizvodLS.kolicina
                        nizProizvoda.push(proizvodJSON);
                    }
                }
            }
            let ispisDrzac = `<h1 class="text-center mt-5">Moja korpa</h1>
                                    <div class="container-fluid mt-5">
                                        <div id="bar">
                                            <div class="col-lg-2">
                                                <p class="fs-5 text-center">PROIZVOD</p>
                                            </div>
                                        <div class="col-lg-2">
                                            <p class="fs-5 text-center">CENA</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <p class="fs-5 text-center">POPUST</p>
                                        </div>
                                        <div class="col-lg-2">
                                            <p class="fs-5 text-center">CENA SA POPUSTOM</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <p class="fs-5 text-center">KOLIČINA</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <p class="fs-5 text-center">UKUPNO</p>
                                        </div>
                                    </div>`
            var ispisProizvoda = "";
            for (let proizvod of nizProizvoda){
                ispisProizvoda += `<div class="row mb-5 align-items-center">
                                        <div class="col-lg-2">
                                            <img src="${proizvod.slika}" alt="${proizvod.naziv}" class="korpaimg"/>
                                        </div>
                                        <div class="col-lg-2">
                                            <p class="fs-5 text-center">${proizvod.naziv}</p>
                                        </div>
                                        <div class="col-lg-2">
                                            <p class="fs-5 text-center ms-3">${proizvod.cena.staraCena},00 RSD</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <p class="fs-5 text-center ms-2">${proizvod.popust}%</p>
                                        </div>
                                        <div class="col-lg-2">
                                            <p class="fs-5 text-center">${proizvod.cena.novaCena},00 RSD</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <select name="kolicina" id="kolicina" class="form-control">
                                                <option value="${proizvod.kolicina}" class="text-center">${proizvod.kolicina}</option>
                                                <option value="1" class="text-center">1</option>
                                                <option value="2" class="text-center">2</option>
                                                <option value="3" class="text-center">3</option>
                                                <option value="4" class="text-center">4</option>
                                                <option value="5" class="text-center">5</option>
                                                <option value="6" class="text-center">6</option>
                                                <option value="7" class="text-center">7</option>
                                                <option value="8" class="text-center">8</option>
                                                <option value="9" class="text-center">9</option>
                                            </select>
                                        </div>
                                        <div class="col-lg-1">
                                            <p class="fs-5 text-center ms-4">${obradaCene(proizvod)}</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <button class="form-control ">Izbriši</button>
                                        </div>
                                    </div>`
            }
            $('#tekstDrzac').html(ispisDrzac);
            console.log(ispisProizvoda);
            $('#proizvodi').html(ispisProizvoda)
        })
    }
    
    function obradaCene(proizvod) {
        ukupnaCena = proizvod.cena.novaCena * proizvod.kolicina;
        return ukupnaCena;
    }

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
            if (input.type == "text" || input.type == "email") {
                ispis += `<input type="${input.type}" name="${input.name}" id="${input.name}" placeholder="${input.dodatno}" class="form-control mt-2">`
            }
        }
        ispis+=`<label for="isporuka" class="mt-1 ms-1">Isporuka : </label>`;
        for (const input of inputi) {
            if (input.type == "radio") {
                ispis+=` ${input.dodatno}<input class="ms-2 me-2" type="${input.type}" name="${input.name}" id="${input.dodatno}">`
            }
        }
        ispis+=`<input type="button" value="Potvrdi" id="submit" class="form-control mt-2 border border-5">`
        document.getElementById("forma").innerHTML=ispis;
    }

    function uzmiItemIzLocalStorage(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    function ispitajVrednosti(regex,input) {
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
        }
    }

    ajaxPoziv("input.json",function(rezultat){
        ipsisForme(rezultat);
    })

    ajaxPoziv("meni.json",function(rezultat) {
        ispisMenia(rezultat);
    });

    $('#submit').click(function() {
        ispitajVrednosti(regexIme,ime);
        ispitajVrednosti(regexPrezime,prezime);
        ispitajVrednosti(regexMail,email);
        ispitajVrednosti(regexBroj,broj);
       console.log(brojGresaka);
    })

}