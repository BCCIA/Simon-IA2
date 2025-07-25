// ----------------- SEGURIDAD: PROTECCIÓN POR PIN -----------------
const PIN_CORRECTO = "5703";

function accesoPermitido() {
  return localStorage.getItem("pinAccesoAutorizado") === "true";
}

function solicitarPin() {
  const pinIngresado = prompt("Por favor, introduce el PIN de acceso:");
  if (pinIngresado === PIN_CORRECTO) {
    localStorage.setItem("pinAccesoAutorizado", "true");
  } else {
    alert("PIN incorrecto. No tienes permiso para acceder.");
    document.body.innerHTML =
      "<h1 style='text-align:center; padding-top:20%; font-family:sans-serif;'>Acceso denegado</h1>";
    throw new Error("PIN incorrecto - ejecución detenida");
  }
}

if (!accesoPermitido()) {
  solicitarPin();
}

// ----------------- SEGURIDAD Y NAVEGACIÓN -----------------

// Deshabilitar clic derecho
document.addEventListener("contextmenu", (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  if (
    e.keyCode === 123 || // F12
    ctrlShiftKey(e, "I") || // Ctrl+Shift+I
    ctrlShiftKey(e, "J") || // Ctrl+Shift+J
    ctrlShiftKey(e, "C") || // Ctrl+Shift+C
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) // Ctrl+U
  )
    return false;
};

// ----------------- MENÚ (si aplica) -----------------
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav)
    toggle.addEventListener("click", () => nav.classList.toggle("show"));
};

showMenu("nav-toggle", "nav-menu");

// ----------------- CHAT D-ID -----------------
class DIDChat {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chatUrl =
      "https://studio.d-id.com/agents/share?id=agt_IFidIPzC&utm_source=copy&key=WjI5dloyeGxMVzloZFhSb01ud3hNVEU0T0RjNU1UQTRNamMxTlRBNU9EYzJNakU2VjNWc1prRTVjMEpwUkhSaGVubERWSGN0ZERGaA==";
    this.init();
  }

  init() {
    const wrapper = document.createElement("div");
    wrapper.className = "iframe-wrapper";
    const iframe = document.createElement("iframe");
    iframe.className = "did-chat-iframe fade-in";
    iframe.src = this.chatUrl;
    iframe.allow = "camera;microphone;clipboard-write";
    wrapper.appendChild(iframe);
    this.container.appendChild(wrapper);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DIDChat("chat-container");
});

// ----------------- GSAP ANIMACIONES -----------------
gsap.to(".first", 1.5, { delay: 0.5, top: "-100%", ease: Expo.easeInOut });
gsap.to(".second", 1.5, { delay: 0.7, top: "-100%", ease: Expo.easeInOut });
gsap.to(".third", 1.5, { delay: 0.9, top: "-100%", ease: Expo.easeInOut });
gsap.from(".home-img", { opacity: 0, duration: 2, delay: 2, x: 60 });
gsap.from(".home-information", {
  opacity: 0,
  duration: 3,
  delay: 2.3,
  y: 25,
});
gsap.from(".anime-text", {
  opacity: 0,
  duration: 3,
  delay: 2.3,
  y: 25,
  ease: "expo.out",
  stagger: 0.3,
});
gsap.from(".nav-logo", {
  opacity: 0,
  duration: 3,
  delay: 3.2,
  y: 25,
  ease: "expo.out",
});
gsap.from(".nav-item", {
  opacity: 0,
  duration: 3,
  delay: 3.2,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});
gsap.from(".home-social", {
  opacity: 0,
  duration: 3,
  delay: 4,
  y: 25,
  ease: "expo.out",
  stagger: 0.2,
});

// ----------------- REFRESCO AUTOMÁTICO CADA 5 MINUTOS -----------------


// ----------------- FALLBACK VÍDEO CON OVERLAY Y CIERRE -----------------
window.addEventListener("DOMContentLoaded", () => {
  const videoBtn = document.getElementById("video-btn");
  const closeVideoBtn = document.getElementById("close-video-btn");
  const videoOverlay = document.getElementById("video-overlay");
  const fallbackVideo = document.getElementById("fallback-video");

  if (videoBtn && closeVideoBtn && videoOverlay && fallbackVideo) {
    videoBtn.addEventListener("click", () => {
      videoOverlay.style.display = "flex";
      fallbackVideo.currentTime = 0;
      fallbackVideo.play().catch((err) => {
        console.warn("No se pudo reproducir el video:", err);
      });
    });

    closeVideoBtn.addEventListener("click", () => {
      fallbackVideo.pause();
      fallbackVideo.currentTime = 0;
      videoOverlay.style.display = "none";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoOverlay.style.display === "flex") {
        fallbackVideo.pause();
        fallbackVideo.currentTime = 0;
        videoOverlay.style.display = "none";
      }
    });
  }
});
