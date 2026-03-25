# Samsung Tablet Configurator - Instrukcja Użytkownika

## Dla Serwisantów

Aplikacja została stworzona do automatyzacji procesu konfiguracji AnyDesk i AD1 na tabletach Samsung Galaxy Tab 3 (SM-T575) oraz Tab 5 (SM-X306B).

## Jak Używać

### 1. Wysłanie linku do użytkownika
Wyślij użytkownikowi link do tej aplikacji (np. `https://twoja-domena.com`)

### 2. Instrukcja dla użytkownika

**Krok 1: Pobranie aplikacji**
- Użytkownik otwiera link w przeglądarce Chrome na tablecie
- Kliknie przycisk "Pobierz AnyDesk" i "Pobierz AD1"
- Po pobraniu, instaluje oba pliki APK (muszą zezwolić na instalację z nieznanych źródeł)

**Krok 2: Automatyczna konfiguracja**
- Po zainstalowaniu obu aplikacji, użytkownik klika "Automatyczna konfiguracja"
- System automatycznie otworzy kolejne ekrany ustawień
- Użytkownik wykonuje instrukcje wyświetlane na ekranie
- Po każdym kroku wraca do aplikacji i klika "Następny krok"

**Krok 3: Gotowe**
- Po przejściu wszystkich 8 kroków konfiguracja jest zakończona
- Użytkownik uruchamia AnyDesk i podaje Ci kod połączenia

## Funkcje Aplikacji

✅ **Pobieranie APK** - Bezpośrednie linki do pobrania AnyDesk i AD1  
✅ **Autopilot** - Automatyczne otwieranie ekranów ustawień Androida  
✅ **Krok po kroku** - Jasne instrukcje dla każdego kroku  
✅ **Progres** - Pasek postępu pokazujący, ile już zrobiono  
✅ **Polski język** - Wszystko po polsku  
✅ **Responsywny design** - Działa idealnie na tabletach Samsung  
✅ **Tryb PWA** - Można zainstalować jako aplikację natywną  

## Konfigurowane Ustawienia

Aplikacja automatycznie prowadzi przez:
1. Włączenie AnyDesk w Dostępności
2. Konfigurację AD1 (dostępność + uprawnienia zaawansowane)
3. Powiadomienia dla AnyDesk
4. Uprawnienia (mikrofon, aparat, pliki, wyświetlanie nad innymi)
5. Optymalizację baterii (wyłączenie dla obu aplikacji)

## Rozwiązywanie Problemów

**Problem: Link nie otwiera ustawień**
- Sprawdź, czy użytkownik otworzył link w Chrome (nie w Samsung Internet)
- Niektóre przeglądarki nie obsługują Android Intents

**Problem: Nie można pobrać APK**
- Sprawdź, czy linki w App.tsx wskazują na poprawne pliki w Twoim GitHub
- Użytkownik musi mieć włączone "Nieznane źródła" w ustawieniach

**Problem: Użytkownik się gubi w krokach**
- Poproś, żeby używał przycisku "Ostatnio używane" (kwadrat) do przełączania między aplikacjami
- Możesz zdalnie wykonać konfigurację używając TeamViewer lub podobnego narzędzia

## Dla Programistów

### Jak dostosować linki do pobierania
Edytuj w `src/App.tsx`:
```typescript
const downloadAnyDesk = () => {
  window.location.href = 'https://github.com/TWOJ-USER/anydesk/releases/download/v1.0/AnyDesk.apk'
}

const downloadAD1 = () => {
  window.location.href = 'https://github.com/TWOJ-USER/ad1/releases/download/v1.0/AD1.apk'
}
```

### Jak dodać własne kroki konfiguracji
Edytuj tablicę `CONFIG_STEPS` w `src/App.tsx`.

### Jak dodać własne logo/favicon
Zamień ikonę w `public/manifest.json` oraz dodaj favicon.ico do folderu public.

## Bezpieczeństwo

- Wszystko dzieje się lokalnie na urządzeniu użytkownika
- Nie zbieramy żadnych danych
- Linki są bezpośrednie do Twojego GitHub - użytkownik widzi, skąd pobiera
- Aplikacja nie ma dostępu do systemu, tylko przekierowuje do ustawień

## Wsparcie

Masz pytania? Problemy? Skontaktuj się:
- Email: support@twoja-firma.pl
- Tel: +48 123 456 789

## Licencja

Projekt open source - dostosuj i używaj według potrzeb.
