import { useState } from 'react'

interface ConfigStep {
  id: number
  title: string
  intent: string
  description: string
  action: string
  packageName?: string
}

const CONFIG_STEPS: ConfigStep[] = [
  {
    id: 1,
    title: "1. Uprawnienia Dostępności - AnyDesk",
    intent: "android.settings.ACCESSIBILITY_SETTINGS",
    description: "W ustawieniach Dostępności znajdź 'Zainstalowane aplikacje' i włącz AnyDesk",
    action: "Przejdź do Dostępności"
  },
  {
    id: 2,
    title: "2. Włączenie AnyDesk w Dostępności",
    intent: "android.settings.ACCESSIBILITY_SETTINGS",
    description: "Kliknij na AnyDesk i włącz usługę. Zatwierdź okienko potwierdzające",
    action: "Otwórz ponownie Dostępność"
  },
  {
    id: 3,
    title: "3. Konfiguracja AD1",
    intent: "android.settings.APPLICATION_DETAILS_SETTINGS",
    packageName: "com.adcontrol.ad1",
    description: "W ustawieniach aplikacji AD1 włącz wszystkie wymagane uprawnienia",
    action: "Otwórz ustawienia AD1"
  },
  {
    id: 4,
    title: "4. Zaawansowane ustawienia AD1",
    intent: "android.settings.APPLICATION_DETAILS_SETTINGS",
    packageName: "com.adcontrol.ad1",
    description: "W ustawieniach AD1 kliknij trzy kropki (menu) i włącz 'Zezwól na ograniczone...'",
    action: "Otwórz ustawienia AD1"
  },
  {
    id: 5,
    title: "5. Powiadomienia AnyDesk",
    intent: "android.settings.APPLICATION_DETAILS_SETTINGS",
    packageName: "com.anydesk.anydeskandroid",
    description: "W ustawieniach AnyDesk włącz powiadomienia",
    action: "Otwórz AnyDesk"
  },
  {
    id: 6,
    title: "6. Uprawnienia AnyDesk",
    intent: "android.settings.APPLICATION_DETAILS_SETTINGS",
    packageName: "com.anydesk.anydeskandroid",
    description: "Włącz uprawnienia: mikrofon, aparat, wszystkie pliki, wyświetlanie nad innymi",
    action: "Otwórz uprawnienia AnyDesk"
  },
  {
    id: 7,
    title: "7. Optymalizacja baterii - AnyDesk",
    intent: "android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS",
    packageName: "com.anydesk.anydeskandroid",
    description: "Wyłącz optymalizację baterii dla AnyDesk",
    action: "Wyłącz optymalizację"
  },
  {
    id: 8,
    title: "8. Optymalizacja baterii - AD1",
    intent: "android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS",
    packageName: "com.adcontrol.ad1",
    description: "Wyłącz optymalizację baterii dla AD1",
    action: "Wyłącz optymalizację"
  }
]

function openAndroidIntent(intent: string, packageName?: string) {
  try {
    let url = ''
    if (intent === 'android.settings.APPLICATION_DETAILS_SETTINGS' && packageName) {
      url = `intent://${packageName}?#Intent;action=${intent};scheme=package;end`
    } else if (intent === 'android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS' && packageName) {
      url = `intent://#Intent;action=${intent};package=${packageName};end`
    } else {
      url = `intent://#Intent;action=${intent};end`
    }
    window.location.href = url
    
    setTimeout(() => {
      if (intent.includes('ACCESSIBILITY')) {
        window.location.href = 'settings://accessibility'
      } else if (intent.includes('BATTERY')) {
        window.location.href = 'settings://battery'
      }
    }, 1000)
  } catch (error) {
    console.error('Błąd otwierania intent:', error)
  }
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const [isConfiguring, setIsConfiguring] = useState(false)

  const startConfiguration = () => {
    setIsConfiguring(true)
    setCurrentStep(0)
    if (CONFIG_STEPS[0]) {
      openAndroidIntent(CONFIG_STEPS[0].intent, CONFIG_STEPS[0].packageName)
    }
  }

  const nextStep = () => {
    if (currentStep === null) return
    
    const nextStepIndex = currentStep + 1
    if (nextStepIndex >= CONFIG_STEPS.length) {
      setIsConfiguring(false)
      setCurrentStep(null)
      return
    }
    
    setCurrentStep(nextStepIndex)
    const step = CONFIG_STEPS[nextStepIndex]
    openAndroidIntent(step.intent, step.packageName)
  }

  const previousStep = () => {
    if (currentStep === null || currentStep <= 0) return
    
    const prevStepIndex = currentStep - 1
    setCurrentStep(prevStepIndex)
    const step = CONFIG_STEPS[prevStepIndex]
    openAndroidIntent(step.intent, step.packageName)
  }

  const downloadAnyDesk = () => {
    window.location.href = 'https://github.com/twoj-uzytkownik/anydesk/releases/download/v1.0/AnyDesk.apk'
  }

  const downloadAD1 = () => {
    window.location.href = 'https://github.com/twoj-uzytkownik/ad1/releases/download/v1.0/AD1.apk'
  }

  if (isConfiguring && currentStep !== null) {
    const step = CONFIG_STEPS[currentStep]
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Konfiguracja krok po kroku</h1>
                <button
                  onClick={() => {
                    setIsConfiguring(false)
                    setCurrentStep(null)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / CONFIG_STEPS.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Krok {currentStep + 1} z {CONFIG_STEPS.length}
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h2>
              <p className="text-blue-700 mb-4">{step.description}</p>
              <button
                onClick={() => openAndroidIntent(step.intent, step.packageName)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                {step.action}
              </button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-2">💡 Wskazówka:</h3>
              <p className="text-yellow-800 text-sm">
                Po wykonaniu czynności na tym ekranie, wróć do tej aplikacji i kliknij "Następny krok". 
                Możesz użyć przycisku "Ostatnio używane" (kwadrat) w dolnym pasku nawigacji Androida.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={previousStep}
                disabled={currentStep === 0}
                className={`px-6 py-2 rounded transition-colors ${
                  currentStep === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Poprzedni krok
              </button>
              
              <button
                onClick={nextStep}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
              >
                {currentStep === CONFIG_STEPS.length - 1 ? 'Zakończ' : 'Następny krok'}
              </button>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Pełna lista kroków:</h3>
            <div className="space-y-1">
              {CONFIG_STEPS.map((s, index) => (
                <div 
                  key={s.id} 
                  className={`text-sm p-2 rounded ${
                    index === currentStep 
                      ? 'bg-blue-100 text-blue-900 font-medium' 
                      : index < currentStep 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-gray-600'
                  }`}
                >
                  {index < currentStep && '✓ '}{s.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🛠️</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">
                Samsung Tablet Configurator
              </h1>
              <p className="text-blue-100 text-sm">
                Szybka konfiguracja AnyDesk i AD1
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="font-semibold text-blue-900 mb-2">📱 Twoje urządzenie:</h2>
                <p className="text-blue-800 text-sm">
                  Samsung Galaxy Tab 3 (SM-T575) lub Tab 5 (SM-X306B) z Androidem 8+
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h2 className="font-semibold text-orange-900 mb-2">⚠️ Wymagania:</h2>
                <ul className="text-orange-800 text-sm space-y-1">
                  <li>• Zainstaluj obie aplikacje przed konfiguracją</li>
                  <li>• Połącz tablet z internetem</li>
                  <li>• Miej przygotowany kod AnyDesk</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={downloadAnyDesk}
                  className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex flex-col items-center justify-center h-24"
                >
                  <span className="text-2xl mb-1">⬇️</span>
                  <span className="font-semibold">Pobierz AnyDesk</span>
                  <span className="text-xs opacity-75">Z GitHub</span>
                </button>
                
                <button
                  onClick={downloadAD1}
                  className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center justify-center h-24"
                >
                  <span className="text-2xl mb-1">⬇️</span>
                  <span className="font-semibold">Pobierz AD1</span>
                  <span className="text-xs opacity-75">Z GitHub</span>
                </button>
              </div>

              <button
                onClick={startConfiguration}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">⚡</span>
                <div className="text-left">
                  <div className="font-bold text-lg">Automatyczna konfiguracja</div>
                  <div className="text-sm opacity-90">Kliknij i wykonaj 8 kroków</div>
                </div>
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">ℹ️ Jak to działa?</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>1. Pobierz obie aplikacje (jeśli jeszcze tego nie zrobiłeś)</li>
                <li>2. Zainstaluj je (zezwól na instalację z nieznanych źródeł)</li>
                <li>3. Kliknij "Automatyczna konfiguracja"</li>
                <li>4. Aplikacja otworzy kolejne ekrany - wykonaj instrukcje</li>
                <li>5. Po skończeniu uruchom AnyDesk i podaj kod</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Need help? Kontakt: support@twoja-firma.pl | Tel: +48 123 456 789</p>
        </div>
      </div>
    </div>
  )
}