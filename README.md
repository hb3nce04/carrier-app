## Feladat leírása
Készíts egy egyszerű fuvarozó rendszert Laravelben, ahol a cég
adminisztrátora új munkákat hozhat létre, és azokat fuvarozókhoz rendelheti. Minden
fuvarozónak egy járműve lehet, és több munkát végezhet egy időben. A feladat fő célja a
backend funkcionalitás kidolgozása, a frontend lehet egyszerű, minimalista, az
adminisztrációs műveletek kezelése a fő hangsúly.

## Adatbázis ER modell
<img src="https://github.com/hb3nce04/carrier-app/blob/main/docs/er.png"/>

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
