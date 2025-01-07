## Feladat leírása

Készíts egy egyszerű fuvarozó rendszert Laravelben, ahol a cég
**adminisztrátor**a új munkákat hozhat létre, és azokat **fuvarozó**khoz rendelheti. Minden
fuvarozónak egy járműve lehet, és több munkát végezhet egy időben. A feladat fő célja a
backend funkcionalitás kidolgozása, a frontend lehet egyszerű, minimalista, az
adminisztrációs műveletek kezelése a fő hangsúly.

### Használt technológiák:
- Laravel, Laravel Breeze, Laravel Eloquent, Laravel Inertia
- React (Tailwind CSS)
- Docker (MySQL, phpMyAdmin)

## Képernyőképek

Bejelentkezés:
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/signin.png"/>

Regisztráció:
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/signup.png"/>

Munkák megtekintése (adminisztrátor):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/admin1.png"/>

Munkák szűrése státusz szerint (adminisztrátor):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/admin2.png"/>

Munka adatainak áttekintése (adminisztrátor):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/admin3.png"/>

Új munka létrehozása (adminisztrátor):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/admin4.png"/>

Meglévő munka módosítása (adminisztrátor):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/admin5.png"/>

Profiladatok (adminisztrátor):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/admin6.png"/>

Munkák megtekintése (fuvarozó):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/carrier1.png"/>

Munka adatainak áttekintése (fuvarozó):
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/carrier2.png"/>
<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/screenshots/carrier3.png"/>

## Adatbázis ER modell

<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/er.png"/>

## Használati eset diagram

<img src="https://github.com/hb3nce04/carrier-app/blob/interview/docs/use_case.png"/>

## Fejlesztői/tesztkörnyzet használata

### Függőségek telepítése:

```bash
composer install
```

```bash
npm install
```

### MySQL adatbázis és phpMyAdmin használatához (Docker Compose):

```bash
docker compose up
```

### Adatbázis feltöltése adatokkal:

```bash
php artisan migrate --seed
```

## Alkalmazás indítása

```bash
npm run dev
```

```bash
php artisan serve
```

## Egységtesztek futtatása

```bash
php artisan test
```

> [!IMPORTANT]  
> A megoldás teljesíti az elvárt illetve néhány opcionális feladatot is. A kód törekszik a S.O.L.I.D elvek betartására illetve a későbbi továbbfejlesztés megkönnyítésére.
