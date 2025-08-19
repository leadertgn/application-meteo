//const api_key = '33485652843b9d45b888193911cad41c';
//const api_url = `http://api.openweathermap.org/data/2.5/forecast?appid=${api_key}&units=metric&lang=fr`;


        // Configuration de l'API
        const API_KEY = "33485652843b9d45b888193911cad41c"; // Clé API fonctionnelle pour démonstration
        const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
        
        // Éléments DOM
        const weatherForm = document.getElementById('weather-form');
        const villeInput = document.getElementById('ville');
        const weatherCard = document.getElementById('weather-card');
        const errorMessage = document.getElementById('error-message');
        const villeElement = document.getElementById('resultatVille');
        const temperatureElement = document.getElementById('temperature');
        const weatherIcon = document.getElementById('weather-icon');
        const weatherDescription = document.getElementById('weather-description');
        const humiditeElement = document.getElementById('humidite');
        const ventElement = document.getElementById('vent');
        const pressionElement = document.getElementById('pression');
        const visibiliteElement = document.getElementById('visibilite');
        const feelsLikeElement = document.getElementById('feels-like');
        
        // Écouter la soumission du formulaire
        weatherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const ville = villeInput.value.trim();
            
            if (ville) {
                getWeather(ville);
            }
        });
        
        // Fonction pour récupérer les données météo
        async function getWeather(city) {
            try {
                const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`);
                const data = await response.json();
                
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    showError();
                }
            } catch (error) {
                showError();
            }
        }
        
        // Afficher les données météo
        function displayWeather(data) {
            // Cacher le message d'erreur et afficher la carte
            errorMessage.style.display = 'none';
            weatherCard.style.display = 'block';
            
            // Mettre à jour les informations
            villeElement.textContent = `${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
            humiditeElement.textContent = `${data.main.humidity}%`;
            ventElement.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
            pressionElement.textContent = `${data.main.pressure} hPa`;
            visibiliteElement.textContent = `${data.visibility / 1000} km`;
            
            // Mettre à jour l'icône météo
            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;
            
            // Changer le fond selon la météo
            updateBackground(data.weather[0].main);
        }
        
        // Afficher un message d'erreur
        function showError() {
            weatherCard.style.display = 'none';
            errorMessage.style.display = 'block';
        }
        
        // Mettre à jour le fond selon les conditions météo
        function updateBackground(condition) {
            const gradients = {
                'Clear': ['#56CCF2', '#2F80ED'],
                'Clouds': ['#bdc3c7', '#2c3e50'],
                'Rain': ['#4DA0B0', '#D39D38'],
                'Drizzle': ['#4DA0B0', '#2b5876'],
                'Thunderstorm': ['#141E30', '#243B55'],
                'Snow': ['#E6DADA', '#274046'],
                'Mist': ['#606c88', '#3f4c6b'],
                'Smoke': ['#485563', '#29323c'],
                'Haze': ['#3a6186', '#89253e'],
                'Dust': ['#B79891', '#94716B'],
                'Fog': ['#606c88', '#3f4c6b'],
                'Sand': ['#D1913C', '#FFD194'],
                'Ash': ['#4b6cb7', '#182848'],
                'Squall': ['#0F2027', '#203A43', '#2C5364'],
                'Tornado': ['#403A3E', '#BE5869']
            };
            
            const gradient = gradients[condition] || ['#1e5799', '#207cca'];
            document.body.style.background = `linear-gradient(135deg, ${gradient.join(', ')})`;
        }
        
        // Charger la météo de Paris par défaut
        window.addEventListener('load', () => {
            getWeather('Paris');
        });
