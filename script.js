// --- DATA MAPS ---
const icons = {
Clear: "☀️",
Clouds: "☁️",
Rain: "🌧️",
Drizzle: "🌦️",
Thunderstorm: "⛈️",
Snow: "❄️",
Mist: "🌫️",
Fog: "🌫️"
}
const backgrounds = {
  Clear: "linear-gradient(180deg, #1a6fb5 0%, #2d9de8 40%, #87ceeb 100%)",
  ClearNight: "linear-gradient(180deg, #0a0a1a 0%, #0f0c29 50%, #1a1a3e 100%)",
  Clouds: "linear-gradient(180deg, #4a5568 0%, #6b7a8d 50%, #8899aa 100%)",
  Rain: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  Drizzle: "linear-gradient(180deg, #2c3e50 0%, #3d5166 50%, #4a6080 100%)",
  Thunderstorm: "linear-gradient(180deg, #0d0d0d 0%, #1a0533 50%, #2d1b4e 100%)",
  Snow: "linear-gradient(180deg, #d6eaf8 0%, #aed6f1 50%, #85c1e9 100%)",
  Mist: "linear-gradient(180deg, #808b96 0%, #99a3a4 50%, #b2babb 100%)",
  Fog: "linear-gradient(180deg, #7f8c8d 0%, #95a5a6 50%, #aab7b8 100%)",
  Haze: "linear-gradient(180deg, #b7950b 0%, #c9a84c 50%, #d4ac0d 100%)"
}
// --- CANVAS SETUP ---
const canvas = document.getElementById("weather-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particles = []
let animationId = null

// --- ANIMATION FUNCTIONS ---
function createRain(speed) {
particles = []
for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 4 + 2,
      length: Math.random() * 20 + 10
    })
}
}
function drawRain() {
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = "rgba(174, 214, 241, 0.6)"
ctx.lineWidth = 1
particles.forEach(drop => {
    ctx.beginPath()
    ctx.moveTo(drop.x, drop.y)
    ctx.lineTo(drop.x - 2, drop.y + drop.length)
    ctx.stroke()
    drop.y += drop.speed
    if (drop.y > canvas.height) {
    drop.y = -drop.length
      drop.x = Math.random() * canvas.width
    }
})
animationId = requestAnimationFrame(drawRain)
}
function drawThunderstorm() {
  particles = []
  for (let i = 0; i < 300; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 8 + 6,
      length: Math.random() * 25 + 15
    })
  }
  let lightningTimer = 0

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // heavy rain
    ctx.strokeStyle = "rgba(174, 214, 241, 0.5)"
    ctx.lineWidth = 1.5
    particles.forEach(drop => {
      ctx.beginPath()
      ctx.moveTo(drop.x, drop.y)
      ctx.lineTo(drop.x - 4, drop.y + drop.length)
      ctx.stroke()
      drop.y += drop.speed
      if (drop.y > canvas.height) {
        drop.y = -drop.length
        drop.x = Math.random() * canvas.width
      }
    })

    // lightning flash
    lightningTimer++
    if (lightningTimer > 120 && Math.random() > 0.97) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      lightningTimer = 0
    }

    animationId = requestAnimationFrame(animate)
  }
  animate()
}
function drawSnow() {
  particles = []
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1.5 + 0.5,
      drift: Math.random() * 0.5 - 0.25
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)"
      ctx.fill()
      p.y += p.speed
      p.x += p.drift
      if (p.y > canvas.height) {
        p.y = -p.radius
        p.x = Math.random() * canvas.width
      }
    })
    animationId = requestAnimationFrame(animate)
  }
  animate()
}
function drawMist() {
  particles = []
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: Math.random() * 200 + 100,
      height: Math.random() * 20 + 10,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.05
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
      ctx.beginPath()
      ctx.ellipse(p.x, p.y, p.width, p.height, 0, 0, Math.PI * 2)
      ctx.fill()
      p.x += p.speed
      if (p.x - p.width > canvas.width) {
        p.x = -p.width
        p.y = Math.random() * canvas.height
      }
    })
    animationId = requestAnimationFrame(animate)
  }
  animate()
}
function drawDrizzle() {
  particles = []
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() * 2 + 1,
      length: Math.random() * 10 + 5
    })
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "rgba(174, 214, 241, 0.4)"
    ctx.lineWidth = 0.8
    particles.forEach(drop => {
      ctx.beginPath()
      ctx.moveTo(drop.x, drop.y)
      ctx.lineTo(drop.x - 1, drop.y + drop.length)
      ctx.stroke()
      drop.y += drop.speed
      if (drop.y > canvas.height) {
        drop.y = -drop.length
        drop.x = Math.random() * canvas.width
      }
    })
    animationId = requestAnimationFrame(animate)
  }
  animate()
}
function drawSun(isNight) {
  if (isNight) {
    // --- NIGHT: stars + shooting star ---
    let stars = []
    let shootingStar = null
    let shootingStarTimer = 0

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        growing: Math.random() > 0.5
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // stars
      stars.forEach(star => {
        if (star.growing) { star.opacity += star.twinkleSpeed; if (star.opacity >= 1) star.growing = false }
        else { star.opacity -= star.twinkleSpeed; if (star.opacity <= 0.1) star.growing = true }
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      // shooting star
      shootingStarTimer++
      if (shootingStarTimer > 180 && !shootingStar) {
        shootingStar = { x: Math.random() * canvas.width * 0.7, y: Math.random() * canvas.height * 0.4, vx: 6, vy: 3, opacity: 1 }
        shootingStarTimer = 0
      }
      if (shootingStar) {
        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(shootingStar.x - 40, shootingStar.y - 20)
        ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        shootingStar.x += shootingStar.vx
        shootingStar.y += shootingStar.vy
        shootingStar.opacity -= 0.02
        if (shootingStar.opacity <= 0) shootingStar = null
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

  } else {
    // --- DAY: orange sun with rays ---
    const cx = canvas.width * 0.85
    const cy = canvas.height * 0.15
    let radius = 70
    let growing = true
    let angle = 0

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // glow layers
      for (let i = 4; i > 0; i--) {
        ctx.beginPath()
        ctx.arc(cx, cy, radius + i * 30, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 140, 20, ${0.04 * i})`
        ctx.fill()
      }

      // rays
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)
      for (let i = 0; i < 12; i++) {
        ctx.rotate(Math.PI / 6)
        ctx.beginPath()
        ctx.moveTo(radius + 10, 0)
        ctx.lineTo(radius + 30, 0)
        ctx.strokeStyle = "rgba(255, 160, 30, 0.6)"
        ctx.lineWidth = 2
        ctx.stroke()
      }
      ctx.restore()

      // sun core gradient
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      grad.addColorStop(0, "rgba(255, 220, 80, 1)")
      grad.addColorStop(1, "rgba(255, 100, 20, 0.9)")
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      // pulse + rotate
      if (growing) { radius += 0.1; if (radius > 73) growing = false }
      else { radius -= 0.1; if (radius < 67) growing = true }
      angle += 0.003

      animationId = requestAnimationFrame(animate)
    }
    animate()
  }
}
function drawClouds() {
  particles = []
  for (let i = 0; i < 6; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      speed: Math.random() * 0.3 + 0.1,
      scale: Math.random() * 0.8 + 0.6,
      opacity: Math.random() * 0.3 + 0.15
    })
  }

  function drawCloud(x, y, scale, opacity) {
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.beginPath()
    ctx.arc(0, 0, 40, 0, Math.PI * 2)
    ctx.arc(40, -15, 30, 0, Math.PI * 2)
    ctx.arc(80, 0, 40, 0, Math.PI * 2)
    ctx.arc(40, 10, 35, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      drawCloud(p.x, p.y, p.scale, p.opacity)
      p.x += p.speed
      if (p.x - 120 * p.scale > canvas.width) {
        p.x = -120 * p.scale
        p.y = Math.random() * canvas.height * 0.6
      }
    })
    animationId = requestAnimationFrame(animate)
  }
  animate()
}

// --- ANIMATION CONTROLLER ---
function startAnimation(condition, isNight) {
if (animationId) {
    cancelAnimationFrame(animationId)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
if (condition === "Rain" ) {
    createRain()
    drawRain()
}
if (condition === "Clear") {
drawSun(isNight)
}
if (condition === "Thunderstorm") {
  drawThunderstorm()
}
if (condition === "Drizzle") {
  drawDrizzle()
}
if (condition === "Snow") drawSnow()

if (condition === "Mist" || condition === "Fog" || condition === "Haze") drawMist()

if (condition === "Clouds") drawClouds()
}

// --- MAIN WEATHER FUNCTION ---
async function getWeather(city) {
    let response = 
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7039a7f1f50d54e18f4f703cd7e72114&units=metric`)
    let data = await response.json()
    console.log(data)
    console.log(data.name)
    console.log(data.main.temp)
    console.log(data.weather[0].description)
    document.getElementById("city-name").textContent = data.name
    document.getElementById("description").textContent = data.weather[0].description
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`
    document.getElementById("feels-like").textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`
const icon = icons[data.weather[0].main] || "🌡️"
document.getElementById("description").textContent = `${icon} ${data.weather[0].description}`
const now = Math.floor(Date.now() / 1000)
const isNight = now < data.sys.sunrise || now > data.sys.sunset
const conditionKey = data.weather[0].main === "Clear" && isNight ? "ClearNight" : data.weather[0].main
const bg = backgrounds[conditionKey] || "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
document.body.style.background = bg
startAnimation(data.weather[0].main, isNight)
}

// --- EVENT LISTENERS ---
document.getElementById("search-btn").addEventListener("click", function() {
let city = document.getElementById("city-input").value
getWeather(city)
})
document.getElementById("city-input").addEventListener("keypress", function(event) {
if (event.key === "Enter") {
getWeather(this.value)
document.getElementById("suggestions").innerHTML = ""
}
})
// close suggestions on button click
document.getElementById("search-btn").addEventListener("click", function() {
  document.getElementById("suggestions").innerHTML = ""
})
// close suggestions on Escape key
document.getElementById("city-input").addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    document.getElementById("suggestions").innerHTML = ""
  }
})
// close suggestions on click outside
document.addEventListener("click", function(event) {
  const search = document.getElementById("find")
  if (!search.contains(event.target)) {
    document.getElementById("suggestions").innerHTML = ""
  }
})
// --- AUTOCOMPLETE ---
document.getElementById("city-input").addEventListener("input", async function() {
  const query = this.value.trim()
  const suggestionsBox = document.getElementById("suggestions")
  
  if (query.length < 2) {
    suggestionsBox.innerHTML = ""
    return
  }

  const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=7039a7f1f50d54e18f4f703cd7e72114`)
  const places = await res.json()

  suggestionsBox.innerHTML = ""
  places.forEach(place => {
    const div = document.createElement("div")
    div.textContent = `${place.name}, ${place.state ? place.state + ", " : ""}${place.country}`
    div.addEventListener("click", () => {
      document.getElementById("city-input").value = place.name
      suggestionsBox.innerHTML = ""
      getWeather(place.name)
    })
    suggestionsBox.appendChild(div)
  })
})

// --- INITIAL LOAD ---
getWeather("London")