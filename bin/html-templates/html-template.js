 const template =  `
 <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Ruukki</title>

        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #fff; color: #444; font: 16px/18px Arial, sans-serif; }
            
            .wrapper { 
                position: relative; 
                padding: 120px 50px; 
                height: 100% !important; 
                width: 100%; 
                margin: 0 auto;
                overflow: hidden;
            }
            .page-break {
                page-break-after: always; 
            }
            .wrapper-header,
            .wrapper-footer { content: ''; position: absolute; }
            .wrapper-header { left: 50px; top: 50px; }
            .wrapper-footer { right: 50px; bottom: 50px; }
            .wrapper-two-columns { column-count: 2; margin-bottom: 130px; }
            .wrapper-two-columns p { margin-bottom: 10px; }
            
            .column { float: left; width: 49% !important; font-size: 12px; line-height: 14px; }
            .column:nth-child(2) { margin-left: 2%; }
            
            .header { padding-bottom: 10px; }
            .footer { padding-top: 10px; }
            
            p { margin-bottom: 16px; }
            hr { margin: 30px 0; border: none; border-top: 1px solid #ccc; }
            a { color: inherit; text-decoration: inherit; }
            .left-label { display: inline-block; width: 240px; }
            .font-size-smaller { font-size: 11px; line-height: 16px; }
            @page { margin: 0.4cm; }
            .background-border { position: fixed; left: 0.1cm; top: 0.1cm; right: 0.1cm; bottom: 0.1cm; background: #f5f5f5; }
            
            .tg  {border-collapse:collapse;border-spacing:0;}
            .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
            .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
            .tg .tg-baqh{text-align:center;vertical-align:top}
            .tg .tg-0lax{text-align:left;vertical-align:top}
            
            .uppsercase {text-transform: uppercase};
        </style>
    </head>
    
    <body>
        <div class="background-border"></div>
        <div class="wrapper page-break">
            <p><strong>TAKUUTODISTUS</strong></p>
            <p>Ruukki Construction Oy myöntää asiakkaalleen {{ payload.object.customer }} seuraavat tuotetakuut</p>
            <p>Laatuluokan mukaisesti</p>
            
            <table class="tg">
              <tr>
                <th class="tg-0lax">Tuote</th>
                <th class="tg-0lax">Esteettinen takuu</th>
                <th class="tg-0lax">Tekninen takuu</th>
              </tr>
              {{#payload.object.groupedRoofs}}
              <tr>
                <td class="tg-0lax uppsercase">{{title}}</td>
                <td class="tg-0lax">{{aesthetic_warranty_length}} vuotta</td>
                <td class="tg-0lax">{{technical_warranty_length}} vuotta</td>
              </tr>
              {{/payload.object.groupedRoofs}}
              
              {{#payload.object.otherProducts}}
                <tr>
                  <td class="tg-0lax uppsercase">{{name}}</td>
                  {{#comments}}
                    <td colspan="2" class="tg-0lax">{{comments}}</td>
                  {{/comments}}
                  {{^comments}}
                    <td class="tg-0lax">{{aesthetic_warranty_length}}</td>
                    <td class="tg-0lax">{{technical_warranty_length}}</td>
                  {{/comments}}
                </tr>              
              {{/payload.object.otherProducts}}
            </table>
            
            <p><strong>Kattoprofiilin tiedot</strong></p>
            {{#payload.object.groupedRoofs}}
              <p><strong>{{title}}</strong></p>
              <p><span class="left-label">Laatuluokka</span> {{quality_class}}</p>
              <p><span class="left-label">Kattoprofiili</span> {{description}}</p>
              <p><span class="left-label">Tuotantopäivämäärä</span> {{delivery_date}}</p>
            {{/payload.object.groupedRoofs}}
            <hr>
            
            <p><strong>Katon tiedot</strong></p>
            <p><span class="left-label">Osoite</span> {{ payload.object.address }}</p>
            <p><span class="left-label">Asennus</span> 
                {{#payload.object.zzv_num}}
                    Ruukin asennus
                {{/payload.object.zzv_num}}
                {{^payload.object.zzv_num}}
                    Ruukin tuotetoimitus
                {{/payload.object.zzv_num}}
            </p>
            <p>
                <span class="left-label">
                    {{#payload.object.zzv_num}}
                        Asennusnumero
                    {{/payload.object.zzv_num}}
                    {{^payload.object.zzv_num}}
                        Asentaja
                    {{/payload.object.zzv_num}}
                </span>
                {{#payload.object.zzv_num}}
                    {{ payload.object.zzv_num }}
                {{/payload.object.zzv_num}}
                {{^payload.object.zzv_num}}
                    {{ payload.object.mechanic }}
                {{/payload.object.zzv_num}}
            </p>
            <p><span class="left-label">Asennusajankohta</span> {{ payload.object.install_date }}</p>
            <p><span class="left-label">Muita tietoja</span> {{payload.object.mechanic_info }}</p>
            <hr>
            <p class="font-size-smaller">Esteettinen takuu kattaa pinnoitteen hilseilyn, säröilyn ja irtoamisen tuotteen pinnalta sekä värissä tapahtuvat merkittävät ja epätasaiset muutokset. Tekninen takuu kattaa Tuotteen puhkiruostumisen niin, ettei korroosio muodosta reikiä Tuotteen tasaiseen pintaan. Lisäksi tekninen takuu koskee kaikkia tuotteiden pinnoitteiden laatuun liittyviä valmistusvirheitä.</p>
            <p class="font-size-smaller">
                {{#payload.object.zzv_num}}
                    Takuu alkaa asennuspäivästä.
                {{/payload.object.zzv_num}}
                {{^payload.object.zzv_num}}
                    Takuuaika alkaa tuotantopäivästä.
                {{/payload.object.zzv_num}}
            </p>

            <div class="wrapper-header"><img src="data:image/png;base64,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" alt="Ruukki"></div>
            <div class="wrapper-footer"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAAcCAYAAABCrQzwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNCODdDMTZFNzk5NzExRTJCRjIyREJENjkxNDc3NEJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNCODdDMTZGNzk5NzExRTJCRjIyREJENjkxNDc3NEJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0I4N0MxNkM3OTk3MTFFMkJGMjJEQkQ2OTE0Nzc0QkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0I4N0MxNkQ3OTk3MTFFMkJGMjJEQkQ2OTE0Nzc0QkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz60pV1TAAALF0lEQVR42rRbe4weVRW/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" alt="Ruukki"></div>
        </div>

        {{#payload.object.addtionalStaticWarrantyTerms}}
          {{#roof}}
            <div class="wrapper page-break">
              <p><strong>{{roof}}</strong></p>
            </div>
          {{/roof}}
          {{#flashing}}
            <div class="wrapper page-break">
              <p><strong>{{flashing}}</strong></p>
            </div>
          {{/flashing}}
          {{#rws}}
            <div class="wrapper page-break">
              <p><strong>{{rws}}</strong></p>
            </div>
          {{/rws}}
          {{#rsp}}
            <div class="wrapper page-break">
              <p><strong>{{rsp}}</strong></p>
            </div>
          {{/rsp}}
          {{#lead_through}}
            <div class="wrapper page-break">
              <p><strong>{{lead_through}}</strong></p>
            </div>
          {{/lead_through}}
          {{#underlay}}
            <div class="wrapper page-break">
              <p><strong>{{underlay}}</strong></p>
            </div>
          {{/underlay}}          
        {{/payload.object.addtionalStaticWarrantyTerms}}

        <div class="wrapper wrapper-two-columns">
            <div class="column">
            <p><strong>Takuuehdot</strong></p>
                <p>
                    1. Tuote on otettu käyttöön viimeistään 6 kuukauden kuluttua vahvistetusta tuotantopäivästä.<br>
                    2. Tuotteen asennusta edeltävä varastointi, Tuotteen asennus, vuositarkastukset ja huollot on suoritettu asianmukaisesti ja Ruukin asennus- ja huolto-ohjeiden mukaisesti.<br>
                    3. Lisäksi takuu on voimassa seuraavin ehdoin:<br>
                    a. Takuu koskee Tuotetta, jota on käytetty normaaleissa ilmasto-olosuhteissa, C1-C3 ympäristörasitusluokat (EN ISO 12944-2:1998). Takuu ei koske Tuotetta, jota on käytetty erityisen ankarissa ja korroosioherkissä ilmasto-olosuhteissa, kuten meri-ilmastossa tai kohteissa, joissa Tuote on jatkuvassa kosketuksessa esimerkiksi veteen, kemikaaleihin, tuhkaan, sementtiin, pölyyn, nokeen, levään tai lantaan.<br>
                    b. Takuu ei kata vahinkoja, jotka ovat aiheutuneet jatkuvalle yli 60 Celsiusasteen lämpötilan altistumiselle, luonnonmullistuksista tai ympäristökatastrofeista ja poikkeuksellisen korkeista saastepitoisuuksista, tulipalosta, onnettomuuksista tai säteilystä tai liian suurista luonnonkuormista (kuten lumi).<br>
                    c. Käytettäessä tuotetta vesikatteena, kattokaltevuuden on mahdollistettava veden vapaa virtaaminen pois Tuotteen pinnalta. Lisäksi tulee varmistaa, että ruuvit, naulat ja muut kiinnitysosat, kattoturvatuotteet, kattoikkunat, savupiiput, ilmastointiputket ja muut läpiviennit, puutteellisesti tiivistetyt ja/tai rakennetut räystäät, harjat, jiirit, limitykset, eivät aiheuta veden ja/tai muiden epäpuhtauksien valumista Tuotteen taustapinnalle.<br>
                    d. Takuu ei kata vikoja ja/tai vahinkoja, jotka ovat aiheutuneet ulkoisista tekijöistä, kuljetuksesta, varastoinnista, käsittelystä työmaalla tai asennuksen yhteydessä taikka kemiallisista reaktioista Tuotteen ja jonkin muun rakennusaineen tai rakenneosan välillä (esimerkiksi rappauslaasti).<br>
                    e. Tuotetta ei saa leikata kulmahiomakoneella tai muulla lämpöä tuottavalla laitteella, eikä Tuotteen läheisyydessä saa em. laitteita käyttää siten, että kuumaa ainesta päätyy Tuotteen pinnalle.<br>
                    f. Takuu ei kata seuraavista syistä johtuvia vikoja: levyjen leikkauspinnat tai läpiviennit, joissa levyn pinnoittamaton metallipinta on säälle alttiina.<br>
                    g. Takuu koskee värissä tapahtuvia merkittäviä ja epätasaisia muutoksia vain tuoteselosteessa ostohetkellä määriteltyjen vakiovärien osalta ja on voimassa vain olosuhteissa, joissa ilmaston vaikutus, esimerkiksi auringonvalo, on kohdistunut Tuotteen pintaan tasaisesti koko alueella.<br>
                    h. Naarmuuntumiset, viillot tai hankaumat, jotka läpäisevät Tuotteen suojaavan pintakerroksen, kuten maalipinnoitteen ja/tai sinkkikerroksen, tulee korjata välittömästi Tuotteelle soveltuvalla paikkamaalilla. Kaikki pinnalla tai räystäiden reunoilla näkyvät ruostejäljet tulee korjata kohtuullisen ajan kuluessa niiden havaitsemisesta. Paikkamaalauksen toteuttaja vastaa paikkamaalauksen kestävyydestä. <br>
                    i. Esteettisen takuuajan umpeuduttua, Ostajan tulee omalla
                </p>
            </div>
            <div class="column">
                <p>kustannuksellaan uudelleen maalata Tuote huolto-ohjeiden mukaisesti, kun Tuotteen suojaavasta maalipinnasta on kulunut, hilseillyt, lohjennut tai irronnut enintään kymmenen (10) prosenttia tai kymmenen (10) neliömetriä, kumpi tahansa on vähäisempi.<br>k. Takuu ei kata asennustyötä</p>
                <p><strong>Takuuta koskevat vaatimukset</strong></p>
                <p>Takuuta koskevat vaatimukset on esitettävä kirjallisesti kolmenkymmenen (30) päivän kuluessa siitä, kun vika on havaittu tai se olisi pitänyt havaita, ja viimeistään takuuajan umpeutumiseen mennessä seuraavaan osoitteeseen:</p>
                <p>Ruukki Construction Oy, Takuu/rakentaminen,<br>
                    Kalkkimäentie 1, 62800 Vimpeli.</p>
                <p>Vaatimuksessa on mainittava takuuseen vetoavan nimi, osoite ja puhelinnumero, esitettävä ostopäivä ja todiste ostosta sekä selostettava vian luonne ja milloin se ensi kertaa havaittiin.</p>
                <p><strong>Takuukorjaukset</strong></p>
                <p>Ruukki pidättää itsellään oikeuden käydä paikan päällä tarkastamassa vahingoittunut Tuote sekä korjata havaitut puutteet valintansa mukaisesti joko korjausmaalaamalla tai vaihtamalla vahingoittuneen osan/osien tilalle toinen tuote tai hyvittämällä ostajalle vahingoittunut osa/osat. Korjaustavan valinnassa otetaan huomioon Tuotteen ikä. Edellä mainitut korjaukset suoritetaan takuuvaatimuksen tekohetkellä voimassa olevan Ruukin tuotevalikoiman puitteissa, mikä saattaa aiheuttaa alkuperäiseen Tuotteeseen verrattuna muutoksia Tuotteen muodossa, ominaisuuksissa ja/tai värissä.
                Ruukin enimmäisvastuu on Tuotteiden ostohinnan suuruinen. Takuu ei kata minkäänlaisia suoria tai epäsuoria tai välillisiä menetyksiä tai vahinkoja, joita Tuotteessa oleva vika on aiheuttanut Ostajalle. Tuotteen korvaaminen toisella, korjaaminen tai viimeistelyn uusiminen ei pidennä alkuperäistä takuuaikaa.</p>
                <p><strong>Yleiset ehdot</strong></p>
                <p>Tämä takuu on myyjän antama lisäetu eikä vaikuta kuluttajalle lakisääteisesti kuuluvaan suojaan. Tätä takuuta koskevat asiat käsitellään ja tulkitaan myyjän kotimaan lakien mukaisesti. Takuun voimassaolo edellyttää, että Ostaja on maksanut laskunsa täysimääräisenä pidättäytymättä maksusuorituksista. Tämä takuu korvaa kaikki muut mahdolliset takuut tässä asiakirjassa määritetyssä laajuudessa, riippumatta siitä, onko muut takuut annettu suoraan tai epäsuorasti (esimerkiksi agenttien, jälleenmyyjien tai jonkin muun osapuolen kuin Ruukin myöntämät takuut). Takuu on voimassa vain Suomessa.</p>
            </div>

            <div class="wrapper-header"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAAnCAYAAAA8XHcHAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAACHDwAAjA8AAP1SAACBQAAAfXkAAOmLAAA85QAAGcxzPIV3AAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAAlwSFlzAAAuIgAALiIBquLdkgAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAAD1NJREFUeF7tmgeUVcUZxz9ErKgUERAVAbvYkCJIDSooVmxRErtYQEAQRLqUpTfpHew1ii3RqDlqsIuC9YCIikRFjbE3lpf/7+4MXCbz9r1dMJoc9pzfvrlzv/mmfGXm3Xdt7b67FcfO4jQxQtwtnhHviIyYJpDZ35UPddebgyvEPLGTu24l6P9wd70pVBVniRlioKsrCfuJP4r+4i4xTIQyu4tzxXQxyNWVBPq4QAwQdwjWP5RJz6MvdaGA5wRxvygUGC7GPQJZjOjrmNx2ItSXL83EGoGuT8W2gvpTXB08InCysG0ujhMvCK8HFouYbIzO4l2Rbg+jhJdpLZ4X6fuvibSe4sCJl4t0e5ggvExb8ZxI339J/Icxzxb/EGnBbMSMCe+LXUWoOxcdRFrPJ2Ibwb2TXJ3nI1FNhDqyEY7Rk68xbxKx9oxjB4HMga4uZKkI9cW4T8Ta49Teeeu5uhAcaL0xG4m3RUwwG9mMCU8LrzsfSNWhjuKMCU+IUE82jhBhe8jHmEeKWFvoJLxcNofJx5gtRawtdBFerqGrC1lvTPammEAuijMmnCf8IHJB3g/b5zImkHJCXTE2xZjZImaRSMsdImJy+RgTx4y1ZUtJy+U05lepyhAWdI4gl7d3XCQ4CN0saJ/NmLeJ9ECKY4UI2+djzHEi1BWjtMZkvrF2wLzTsqU1JgedWLsfRW2Rli21Ma8UaUUh/qCTbaGSDvKAUxkDD9vnY8w/iVBfjNIYs7Lwh7GQ7iKUL40xK4nPRazdJSKUL7Uxa4pQWYxNSWGwp1gnwvb5GPMBEeqLUZoxLhSxNneKmHxpjMnXrVibW0RM/jdvzBpirQjb52NMvj6F+mKUdIx8N4zJvyxi8lBSY/LdMJt8GRFrs8WYoiRjDL8iefiKUF2E8p6SGJOvgDHZLwSZKpT3bDGmyHeMx4iY3E8iPPCE5GvMU0VMjgc0fI9My4ZsMabIZ4wsZGzvxpANRFpfjHyM2dzVhXwj6oq0vhhbjCnyGSNPrmIyJ4q0rmzkMmY5ke3k2kKE+mJsMabINUYelxGBMZnXBe1DnSG5jMnD99h9eFEcJEKdIf/XxuTpTKgvRq4x8utM7LtuGh7Uh3rT5DImh6fY/TT8wBHqTfOrGXOJiMmHbIoxHxKhvhibw5jAM9RQt2dzGBOOFaFuz69mTI7Z+fxURfrJZcz0T2BpSIGhvhj5GNOn2dhYPMhkS4clMWZxfXCqzXZy/sWNme3ZLMQeSYXkY8zjXV2MXOkPchmTMcwX9d11PxGTB75vxn5+y2XMfcQC4U+tvUVMHj4QsUD4xY3J80WO1jEdcL6ItYOm4mERa8dzUf/8lwWIycCX4mQR6gaepPB1INuvEsXt6z1FrA08KUL5XMaM0VXE2sCDIpT/xY0Jj4qYDg8/4nLy5Oc24KedbMd0T3i4IaXG5DyrBW3mCiLgcUGqj8l6/Ksv2ZgoYu0gfB2kNMYEfpWKtYPwgf5/xZhERkxHafhO8Egt7IOf4WLypYE5nyHCPmLw2kdMB7C4Xq60xiT7rBSxtuBTP2wmY+5XVVSzzG5bW6batrZ2/+ob7hUxUsT0lAR0bC1C3Z4bRaxdvvwgeImrrIjpj9FYxHRB+sReWmNCGxFrC28KL7f5jIkRXzm+pa1ofqRlyptl9to5MXBKrjTRQwoeIiqKtK5sXC1ieopjlegh/AtiG7N/NVunuWQqWvIZcdTRIqYXeEsCGU65sfv5vtA1RcTaA1sHMtneAeKhQ2JM3tfhrTMOA7DMfW74hUCTY6Lf7FPFesycY31umGTLjmlimZq7WKaCWWGdysmCOHl+1OXnHd5G4HCS7vRbQUp5TBSIJsK3KwlVBHsWP0mhM93H14I33DhYDRXpVLgxctBCfTK3bzW3xae2ta/IPlW3CQ3KVxcOPYzdrxNvxPEIkPVCBmd8y+FlcNSNf/9Un+tqV0pIst2Ge7wYxj7/nvDtmR998iYGMvyQz6uubwgvw0GRF84SY2YnSa2KSE32p70r2tT+/az35Kk2cNx46zZrjo27fpAtUaRmqpRNDJsyqIdIqCV4D5Sfdvx7sHGYqBY1U327ZEEzu29vmUrKAJUVMXtXiOkHFoHXK3wf5UVMrgj6qFXRMnvuZJlalaS7jK1seoSN11wuuvVOm973Oivk3q5bWeHGi50N5pj79VLpKtxHjrNbOSvco7wV1tixqA/NN1nnWJsN5NVHkjoTWDwt4jpN8GctWuKx6pTI+/KQmjZ2yGDrOmuejRw2zEYUFNjw4cOt15TpdvmCW+2Jc9pbZhfpSha+TLL4ic4aOxTVVS1n6+rsGh+0IgEvTfZiOU2m6rb2acMDbVWTQ21NgwPs8XPPsOfbn2BrSYOafKZOlaIFCPVkAdl1WsR1tSsnC8l8fq5ZwX44eM+kvLRNM+syZ4FdM22m5jbUusyeZ1P79tF45VTMSePCwYpbcNaq2DGR2XBMze+z+gfY3Gu62eye3e0DOVGyPhgVufycJyu2+qi6CSzeJ40OskKXOpOFUzS+3ra50upk6zl1RmJIjOjBqNePGaMonWtPnXmSfVZvP3v6zJPtqbNOsdWN6toXh9exRae3s3dbNigyLsbis4oMxySIaIwvp/mgaT3Jnmi3d7pMOsfagPETbOjIUdZFDtR5znybNKC/fdTwII1LbdBBOxYIA7lDGQZbx/h31T3qgL5wVEXbqqMPs8XtWtvcHt1sZMEwu+2qK2yQ+uo/YeL6uVHfa+r0ZG73X3KerW5y2Ia+iFjKXjdrhG6gXF1j0KJm9iDqJMf8YCez7+VQCztemKxl9+mz7OoZs+VAM+y+Sy+0NTJwMk6vE3wwUKaePtDl+ilaA62hCxScIVk4GDh2vA0YN8HmyGOWt2pki9q3s9FDhyTR13/8hsmGjNSkh44aZddpkH0n3pAMspv2VXQOH16gaJ5r1yo139b5clsmvWvq729vHnu0PdbhTHutTXP7sPEhNr97V/UzLZHtoQjBQdCJDhYVus+YZYNHj7Gbu3ayOzp1tMUntrYvDqttK5vVs3fkLB83OjhZ7O/l3W8c10x9HWUrWtS3By/sYHdeeakt6N4lGR9jY6sYoK0CB0VnODeumfNVitieMuy9HS/QuaCKfX9gjaRf5rG8VUN79fhW9omyx7PKHAsvOT9x5kzlrexfh+5tS7X9sAWtaNHAVjeua5P79bHLlMWYGw4DOCvZrsf0mfb8qW3sS7VjTV45oVUSXATDkrYtbXnLhppT0yRIXjuueRJ8rNsLJ7ex9zRHH/WazOiEIVo8Pq+dPC1ZUCbaT5MfNmLE+rTq2EZsnbq2EQI5DFB0XWBDpGvQ2HG03Ub1ZfFCFgYDXTdpchJxGJnDFA4zbOTIpF1ab5pRSoG0ZVzd8Wp9FqhPxog++povg03t0ztZnLRz9VAkMK+h6iOmOxssOPPAATgfTBg4IHEqxgzMh357T5oiw89P1vDuyy+2MYOvT8aAgzKOXlOmWr8JN0QDgj7QgT7mRxvmlqyd1oM+uNdX7dHp1xC6zZytuU+x2ztfZn875zRD4eGitThRVKcDFgkoB+wkMuIhd321+J0re3YR14j9xJ4C+aki0cniFBluYwcoCTgXugaNHZsYCH3oxWB9J06STEFSVwrdOCpsVE9/pGKgjG7gnp8PhhqsqGPvJcNhCMaYls0GOpkHWaJgRFGdDwbKtCeKvTxyBB6OwD0M3G3GnMSYXwkW3NNZrG8YsJ14QVwlqgrk7xVpmQME9fPc9XLRxZV/yxwrGHerVN3/FPxjAs+6CsqLXblAnOrKQ8UfXJmoO0L4qLtHUH+guFU8LKi/WVA/QBwkKorR4gT3yf29BTLcf0A8KvqJMaKK4B78XtwoKohyYpZoJ7iH7Nuij7vm/gTh7w8W57oyMpeK2eJQVwf1xSeCcb8q9hJe/g3BWnhZxneB6C8Y02HiOsH40YMM2Yls9JYge1G3vUDucjFJNBcdBYExU5QRlcV94iVBtqRdb9HNlQmKuWI3wfr7/rm33pjLxDmuTAe+/pZUmYX25dvFzq6cpFDxnbv2i6JMuj4t9xA1XTkNRvU6XxcMjvKXopLgHjAJ6okeH/lXiBmuvNR9jhJeHwbz5b+IrcSP7hqaCq//FFcHXwgW6gZ3/ab7vEkg6+fn+UkUurJfI7IX18yJT4yIsXybz8TF7pPrVQLn+kAwxpWC+mbiDldHsKwR1LcXp7tyC5HMg3/fuErPIYJ6ykSaL7Mg6XpvTDwfL6Ps90/Kk8UOrox3+kgeKbwMTlHHlS8URBVlH2Ue0jv14wWeTPkk94lXI/Oc+FkcLKgnen0/aUck8rzeNPxx32cLyotcma2E630E64XzU/+1WOHKn4slgqyFrI9mthmMsK+gfqGg/kh37TMYDs+1j0jKOHsnV+4pXhMYnjYTBfXlBfLrIxPPpvyiwAt8FKWN+UiqnDbmIOEXtp7wMlNEzJgMyss86cp48KeCxXtH1BbUp2EP/la8L/4sagl0kGa5z/i4JtXx6Y1M+a+p8jOuHMIf9/cQRDFlf9DzGYOUhjExGvXfC8ZOGWO+LIgmZEmP1LNtsaZEHvXeeOjierq7Huauj3LXlJlzQ7FWYBtSMNkHg5LCvVMl+EaEN41IMXhRDYECPGGgQOYu4eVvE+wLlPnzqY+O2FspjxV4DeXugn2Ici/h9bC/Uv5Y0DcTJ+Ulgwvwkwf2PeookwaJRqKSqGOvpZ7JE+GUSVVenghO6/VcL7hPNHAS/1BgLJxjtSC9egf2zv+DYE+ljDFxRPYzZP4u/JgfE+yHlH2A+Hve6dq6a9bNp33v+H4LY+vC2JSB8wj3yRB3U2AwGI6b7FV8RaF+vqsjjRA1vlO8jKjzhiLcqWeQXOMYTBInYNOnjsXf3ZWvFMgjw57nnQLHuduVfXoLIZK57w8vZ7tr4FTuDyBez7sCI6RT7v2uHIIzs/8hc55gvGQCrqlvLJCjHx/prM0TrkyEchCjnB4Xa8dXPr+FsHbIcOjjGgNxDfz5dj5rAY5BXQd3jfG4rivYFiiv4gYpJfb9inpOoP4BAdd8lk2VuefLQFRgwLQ8Mmz+YRk9fHYVDOYiQVsWi1TGPQ+pi72ZxSVi0vdoQ9SzWL6OvjlAFTf2GGwLRJC/Ridpd9tUXVpHWPZzgh0F40rXpdeLdQjXD1jz5Pt+CmQYS3od/dyA035jf/FrwgGIo/g/BYYizZ8p0jLnCwxO2mvp6rawEcPt3yqGF3SjVmfEAAAAAElFTkSuQmCC" alt="Ruukki"></div>
            <div class="wrapper-footer"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAAAcCAYAAABCrQzwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNCODdDMTZFNzk5NzExRTJCRjIyREJENjkxNDc3NEJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNCODdDMTZGNzk5NzExRTJCRjIyREJENjkxNDc3NEJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0I4N0MxNkM3OTk3MTFFMkJGMjJEQkQ2OTE0Nzc0QkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0I4N0MxNkQ3OTk3MTFFMkJGMjJEQkQ2OTE0Nzc0QkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz60pV1TAAALF0lEQVR42rRbe4weVRW/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" alt="Ruukki"></div>
        </div>
    </body>
</html>
 `;
