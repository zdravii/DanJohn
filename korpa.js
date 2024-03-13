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

    const regexIme = /^[A-ZČŠĆŽĐ][a-zčšćžđ]{2,15}$/;
    
    const regexPrezime = /^[A-ZČŠĆŽĐ][a-zčšćžđ]{3,20}$/;

    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // const regexBroj = /^\+381[0-9]{2}-[0-9]{3}-[0-9]{3}$/;

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
                                            <p class="fs-5 text-center ms-4">${obradaCene(proizvod)},00 RSD</p>
                                        </div>
                                        <div class="col-lg-1">
                                            <button class="form-control ">Izbriši</button>
                                        </div>
                                    </div>`
            }
            $('#tekstDrzac').html(ispisDrzac);
            // console.log(ispisProizvoda);
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

    function uzmiItemIzLocalStorage(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    function ispitajVrednosti(regex,value,poruka,niz) {
        if(!regex.test(value)){
            niz.push(poruka);
        }
    }

    ajaxPoziv("meni.json",function(rezultat) {
        ispisMenia(rezultat);
    });

    // ajaxPoziv("input.json",function(rezultat){
    //     ipsisForme(rezultat);
    // })
    $("#forma").submit(function(e) {
        e.preventDefault();
        let ime = $('input[name="ime"]').val();
        let prezime = $('input[name="prezime"]').val();
        let email = $('input[name="email"]').val();
        let uslov = $('input[name="uslov"]');
        let nizGresaka = [];
        ispitajVrednosti(regexIme,ime,"Ime mora poceti velikim slovom i mora imati najmanje 3 slova",nizGresaka);
        ispitajVrednosti(regexPrezime,prezime,"Prezime mora poceti velikim slovom i mora imati najmanje 4 slova",nizGresaka)
        ispitajVrednosti(regexMail,email,"Email nije unešen u pravilnom formatu",nizGresaka)
        if (!uslov.checked) {
            nizGresaka.push("Polje o uslovima mora biti čekirano")
        }
        let text = ""
        nizGresaka.forEach(element => {
            text += `<p class="text-danger">${element}</p>`
        });
        $("#greske").html(text)
    })
}   
