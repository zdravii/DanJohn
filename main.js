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

window.onload = function () {
        
    function ispisMenia(nizMeni) {
            let ispis = '<ul class="navbar-nav">'
            let brojac = 0
            for (let obj of nizMeni) {
                if (brojac == 0) {
                    ispis += `<li class="nav-item">
                    <a class="nav-link active" href="${obj.href}">${obj.naziv}</a>
                    </li>`
                }
                else{ispis += `<li class="nav-item">
                <a class="nav-link" href="${obj.href}">${obj.naziv}</a>
                </li>`}
                brojac++;
            }
            ispis += '</ul>'
            document.getElementById("navbarNav").innerHTML=ispis;
    }
    
    ajaxPoziv("meni.json",function(rezultat) {
            ispisMenia(rezultat);
    });

    // function ispisPrecica(nizPrecica) {
    //         let ispis ="";
    //         for (let precica of nizPrecica) {
    //             ispis +=`<div class="col-lg-6"><img class="" src="${precica.slika}" alt="${precica.naziv}"/><div class=""><h3>${precica.naslov}</h3><p>${precica.tekst}</p></div></div>`
    //         }
    //         document.getElementById("precice").innerHTML = ispis;
    // }

    // function ispisNovosti(novosti) {
    //         let ispis = "";
    //         for (let novost of novosti) {
    //             ispis += `<div class="row"><h4>${novost.naslov}</h4></div><div class="row"><p>${novost.tekst}</p></div>`
    //         }
    //         document.getElementById("novosti").innerHTML=ispis;
    // }

    // ajaxPoziv("precica.json",function (rezultat) {
    //         ispisPrecica(rezultat);
    // })

    // ajaxPoziv("novosti.json",function (rezultat) {
    //     ispisNovosti(rezultat);
    // })

    // var swiper = new Swiper(".mySwiper", {
    //     pagination: {
    //       el: ".swiper-pagination",
    //       type: "fraction",
    //     },
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //   });
}

var prefikslink = "/DanJohn"
if(window.location.pathname==prefikslink+"/proizvodi.html"){

    function ispisDDL(nizDDL,divZaIspis) {
        let ispis =''
        for (let obj of nizDDL) {
            ispis += `<option value="${obj.id}">${obj.naziv}</option>`
        }
        document.getElementById(divZaIspis).innerHTML=ispis;
    }

    function ispisProizvoda(nizProizvoda) {
        let ispis = '';
        let brojac = 0;
        if (nizProizvoda.length != 0) {
            if (brojac%4==0) {
                ispis += '<div class="row mt-3">'
                for (let obj of nizProizvoda) {
                    if (obj.cena.staraCena!=null) {
                        ispis += `<div class="col-lg-3">
                                        <div class="row">
                                            <img src="${obj.slika}" alt="${obj.naziv}"/>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-3">
                                                <p class="bg-danger text-center rounded-pill text-light">-${obj.popust}%<p>
                                            </div>
                                        </div>
                                        <div class="row mt-2">
                                            <h4>${obj.naziv}</h4>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <p class="text-decoration-line-through">${obj.cena.staraCena}9,00 RSD</p><p>${obj.cena.novaCena},00 RSD</p>
                                            </div>
                                            <div class="col-6">
                                                <button type="button" data-id=${obj.id} class="btn btn-dark mt-3">Dodaj u korpu</button>
                                            </div>
                                        </div>
                                    </div>`
                    }
                    else{
                        ispis += `<div class="col-lg-3">
                        <div class="row"><img src="${obj.slika}" alt="${obj.naziv}"/></div>
                        <div class="row mt-2"><h4>${obj.naziv}</h4></div>
                        <div class="row mt-2">
                            <div class="col-6">
                                <p>${obj.cena.novaCena},00 RSD</p>
                            </div>
                            <div class="col-6">
                                <button type="button" data-id=${obj.id} class="btn btn-dark">Dodaj u korpu</button>
                            </div>
                        </div>
                    </div>`
                    }
                }
                ispis += '</div>';
                brojac++;
            }
            else{
                for (let obj of nizProizvoda) {
                    if (obj.cena.staraCena!=null) {
                        ispis += `<div class="col-lg-3">
                                <div class="row"><img src="${obj.slika}" alt="${obj.naziv}"/></div>
                                <div class="row mt-2"><h4>${obj.naziv}</h4></div>
                                <div class="row">
                                            <div class="col-6">
                                                <p class="text-decoration-line-through">${obj.cena.staraCena}9,00 RSD</p><p>${obj.cena.novaCena},00 RSD</p>
                                            </div>
                                            <div class="col-6">
                                                <button type="button" data-id=${obj.id} class="btn btn-dark mt-3">Dodaj u korpu</button>
                                            </div>
                                        </div>
                            </div>`
                    }
                    else{
                        ispis += `<div class="col-lg-3">
                        <div class="row"><img src="${obj.slika}" alt="${obj.naziv}"/></div>
                        <div class="row mt-2"><h4>${obj.naziv}</h4></div>
                        <div class="row mt-2">
                            <div class="col-6">
                                <p>${obj.cena.novaCena},00 RSD</p>
                            </div>
                            <div class="col-6">
                                <button type="button" data-id=${obj.id} class="btn btn-dark">Dodaj u korpu</button>
                            </div>
                        </div>
                    </div>`
                    }
                }
                brojac++;
            }
        }
        else{
            ispis += '<div class="row"><div class="col-lg-12><p class="h1">Trenutno nema proizvoda!</p></div></div>';
        }
        document.getElementById("ispisProizvoda").innerHTML = ispis;
        $('.btn').click(dodajUKorpu);
    }

    function dodajUKorpu() {
        let idProizvoda = $(this).data('id');
        // console.log(idProizvoda);
        var proizovdIzKorpe = uzmiItemIzLocalStorage("proizvodIzKorpe")
        if (proizovdIzKorpe) {
            if (daLiJeProizvodVecUKorpi()) {
                uvecajKolicinu();
            }
            else{
                DodajProizvodUKorpu();
                ispisBrojaPorizvoda();
            }
        }
        else {
            dodajPrviProizvodUKorpu();
            ispisBrojaPorizvoda();
        }

        function dodajPrviProizvodUKorpu() {
            let proizvodi = [];
            proizvodi[0] = {
                id : idProizvoda,
                kolicina : 1
            }
            dodajItemULocalStorage("proizvodIzKorpe",proizvodi)
        }

        function daLiJeProizvodVecUKorpi() {
            return proizovdIzKorpe.filter(p=>p.id == idProizvoda).length;
        }

        function uvecajKolicinu() {
            let proizvodiLS = uzmiItemIzLocalStorage("proizvodIzKorpe");
            for (let proizvod of proizvodiLS) {
                if(proizvod.id == idProizvoda){
                    proizvod.kolicina++;
                    break;
                }
            }
            dodajItemULocalStorage("proizvodIzKorpe",proizvodiLS);
        }

        function DodajProizvodUKorpu() {
            let nizLS = uzmiItemIzLocalStorage("proizvodIzKorpe");
            nizLS.push({
                id : idProizvoda,
                kolicina : 1
            });
            dodajItemULocalStorage("proizvodIzKorpe",nizLS);
        }

    }

    function ispisBrojaPorizvoda() {
        var nizProizvodaLs = uzmiItemIzLocalStorage("proizvodIzKorpe");
        console.log(nizProizvodaLs);
        if(nizProizvodaLs =! null){
            // console.log(duzinaNiza);
            let kolicinaProizvoda = nizProizvodaLs.length;
            let text = "";
            if(kolicinaProizvoda == 1){
                text = "proizvod";
            }
            else{
                text = "proizvoda"
            }
            $('#brojProizvoda').html(`${kolicinaProizvoda} ${text}`);
        }
        else{
            $('#brojProizvoda').html('(0 proizvoda)');
        }
    }

    function dodajItemULocalStorage(key,value) {
        localStorage.setItem(key,JSON.stringify(value));
    }

    function uzmiItemIzLocalStorage(item) {
        return JSON.parse(localStorage.getItem(item));
    }

    ajaxPoziv("ddlBoje.json",function(rezultat){
        ispisDDL(rezultat,"ddlFilterBoja");
    })

    ajaxPoziv("ddlKategorije.json",function(rezultat) {
        ispisDDL(rezultat,"ddlFilterKategorija");
    })

    ajaxPoziv("ddlMaterijal.json",function(rezultat) {
        ispisDDL(rezultat,"ddlFilterMaterijal");
    })
    
    ajaxPoziv("proizvodi.json",function(rezultat) {
        ispisProizvoda(rezultat);
    })

    ajaxPoziv("ddlSortiranje.json",function(rezultat) {
        ispisDDL(rezultat,"ddlSortiranje");
    })

    $(document).on("change","#ddlSortiranje",function () {
    
        let uslov = $("#ddlSortiranje").val();

        ajaxPoziv("proizvodi.json",function(rezultat) {
            let proizvodi = rezultat;
            if (uslov == "poNazivuAsc") {
                proizvodi.sort(function (a,b) {
                    if(a.naziv < b.naziv){
                        return -1
                    }
                    else if(a.naziv == b.naziv){
                        return 0;
                    }
                    else{
                        return 1;
                    }
                })
            }
            if (uslov == "poNazivuDesc") {
                proizvodi.sort(function (a,b) {
                    if(a.naziv < b.naziv){
                        return 1;
                    }
                    else if(a.naziv == b.naziv){
                        return 0;
                    }
                    else{
                        return -1;
                    }
                })
            }
            if (uslov == "poCeniAsc") {
                proizvodi.sort(function (a,b) {
                    return a.cena.novaCena - b.cena.novaCena;
                })
            }
            if (uslov == "poCeniDesc") {
                proizvodi.sort(function (a,b) {
                    return b.cena.novaCena - a.cena.novaCena;
                })
            }
            if (uslov == "poPopustuAsc") {
                proizvodi.sort(function (a,b) {
                    return a.popust - b.popust;
                })
            }
            if (uslov == "poPopustuDesc") {
                proizvodi.sort(function (a,b) {
                    return b.popust - a.popust;
                })
            }
            ispisProizvoda(proizvodi);
        })

       

    })

    $(document).on("change","#ddlFilterBoja",function () {
        let idBoje = $("#ddlFilterBoja").val();
        ajaxPoziv("proizvodi.json",function(rezultat) {
            let proizvodi=rezultat;
            let filtriraniProizvodi = [];
            for (let proizvod of proizvodi) {
                if(idBoje == proizvod.idBoje){
                    filtriraniProizvodi.push(proizvod);
                }
            }
            ispisProizvoda(filtriraniProizvodi);
        })
    })
    
    $(document).on("change","#ddlFilterKategorija",function() {
        let idKategorije = $("#ddlFilterKategorija").val();
        ajaxPoziv("proizvodi.json",function(rezultat) {
            let proizvodi=rezultat;
            let filtriraniProizvodi = [];
            for (let proizvod of proizvodi) {
                if(idKategorije == proizvod.idKategorije){
                    filtriraniProizvodi.push(proizvod);
                }
            }
            ispisProizvoda(filtriraniProizvodi);
        })
    })

    $(document).on("change","#ddlFilterMaterijal",function() {
        let idMaterijala = $("#ddlFilterMaterijal").val();
        ajaxPoziv("proizvodi.json",function(rezultat) {
            let proizvodi=rezultat;
            let filtriraniProizvodi = [];
            for (let proizvod of proizvodi) {
                if(idMaterijala == proizvod.idMaterijala){
                    filtriraniProizvodi.push(proizvod);
                }
            }
            ispisProizvoda(filtriraniProizvodi);
        })
    })
}

if(window.location.pathname==prefikslink+"/korpa.html"){

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

    $('#submit').click(function() {
        ispitajVrednosti(regexIme,ime);
        ispitajVrednosti(regexPrezime,prezime);
        ispitajVrednosti(regexMail,email);
        ispitajVrednosti(regexBroj,broj);
       console.log(brojGresaka);
    })
}




    

    

    