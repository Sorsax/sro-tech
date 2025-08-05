# SRO Tech

SRO Tech on opiston tekniikkaväen (lähinnä mun) tukena toimiva mobiilisovellus. Se pitää kaiken hyödyllisen tiedon (epä)kätevästi aina mukana kännykässä - ei tarvii louhia Sheetsiä kun voi vaan odottaa 20 sekuntia että app script käynnistyy.

## Projektin yleiskuvaus

Tiedot haetaan suoraan Google Sheetsistä. Sheetsin kanssa *saattaa* tulla CORS-ongelmia (kyllä, tiedot haetaan HTTP GET-pyynnöillä :DD), ilmoittautumiset lähetetään Google App Scriptiin joka lisää nimen ja solun nykyisen arvon siististi pilkulla eroteltuna taulukkoon, joskus jopa oikeaan soluun.

Iljapuolella käytössä ovat:

- React ja TypeScript
- shadcn/ui ja Tailwind CSS
- Vite
- Joku versio käytti React Nativea mutta ei enää

PS: Kiitti oikeest et lovable näkyy contributorina (tein alkukonffapohjat siltä)

## Sovelluksen ulkoasu

- Otsikoissa Bree Serif – tuttuun tapaan
- Muussa tekstissä Open Sans

Värit:

- Oliivinvihreä (#73AC56) – Tuttu myös mun puhelimesta
- Graniitti (#333333) – Vähän ku GRANI iitti haha :D
- Valkoinen (#FFFFFF) – Suomen Raamattuopiston Säätiö pidättää kaikki oikeudet tämän värin käyttöön
- Harmaa (#F2F2F2)

## Tiedot Google Sheetsissä

Kyhäelmä lukee taulukosta, jonka rakenne on seuraava:

| Sarake | Sisältö                        |
|--------|--------------------------------|
| A      | Päivämäärä (pp/kk/vvvv)       |
| B      | Tapahtuma ja tehtävä           |
| C      | Ilmoittautuneet vapaaehtoiset |
| D      | Varalla                         |
| E      | Lisätiedot                     |

## Oman elämänsä webbiwelhoille:

Kloonaa repositorio:

```bash
git clone https://github.com/Sorsax/sro-tech
cd sro-tech
npm install
npm run dev
