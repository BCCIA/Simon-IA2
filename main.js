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
document.addEventListener("contextmenu", e => e.preventDefault());

// Deshabilitar teclas de desarrollo
function ctrlShiftKey(e, key) {
  return e.ctrlKey && e.shiftKey && e.keyCode === key.charCodeAt(0);
}

document.onkeydown = e => {
  if (
    e.keyCode === 123 ||                // F12
    ctrlShiftKey(e, "I") ||            // Ctrl+Shift+I
    ctrlShiftKey(e, "J") ||            // Ctrl+Shift+J
    ctrlShiftKey(e, "C") ||            // Ctrl+Shift+C
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) // Ctrl+U
  ) return false;
};

// Toggle menú responsive
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("show"));
};
showMenu("nav-toggle", "nav-menu");

// ----------------- GSAP ANIMACIONES -----------------
gsap.to(".first", 1.5, { delay: 0.5, top: "-100%", ease: Expo.easeInOut });
gsap.to(".second", 1.5, { delay: 0.7, top: "-100%", ease: Expo.easeInOut });
gsap.to(".third", 1.5, { delay: 0.9, top: "-100%", ease: Expo.easeInOut });
gsap.from(".home-img", { opacity: 0, duration: 2, delay: 2, x: 60 });
gsap.from(".home-information", { opacity: 0, duration: 3, delay: 2.3, y: 25 });
gsap.from(".anime-text", { opacity: 0, duration: 3, delay: 2.3, y: 25, ease: "expo.out", stagger: 0.3 });
gsap.from(".nav-logo", { opacity: 0, duration: 3, delay: 3.2, y: 25, ease: "expo.out" });
gsap.from(".nav-item", { opacity: 0, duration: 3, delay: 3.2, y: 25, ease: "expo.out", stagger: 0.2 });
gsap.from(".home-social", { opacity: 0, duration: 3, delay: 4, y: 25, ease: "expo.out", stagger: 0.2 });

// ----------------- REFRESCO AUTOMÁTICO CADA 5 MINUTOS -----------------
function iniciarRefresco() {
  let refreshTimeout, cancelRefresh = false;
  let message = document.getElementById("refresh-message");
  if (!message) {
    message = document.createElement("div");
    message.id = "refresh-message";
    message.innerText = "Refrescando...";
    Object.assign(message.style, {
      position: "fixed", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0,0,0,0.8)", color: "#fff",
      padding: "20px 40px", borderRadius: "10px",
      fontSize: "24px", zIndex: "9999", display: "none"
    });
    document.body.appendChild(message);
  }
  function startRefreshSequence() {
    cancelRefresh = false;
    message.style.display = "block";
    function cancelAction() {
      cancelRefresh = true;
      message.style.display = "none";
      clearTimeout(refreshTimeout);
      document.removeEventListener("click", cancelAction);
      document.removeEventListener("touchstart", cancelAction);
      setTimeout(startRefreshSequence, 300000);
    }
    document.addEventListener("click", cancelAction);
    document.addEventListener("touchstart", cancelAction);
    refreshTimeout = setTimeout(() => { if (!cancelRefresh) location.reload(); }, 5000);
  }
  setTimeout(startRefreshSequence, 300000);
}
window.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) refreshBtn.addEventListener("click", () => location.reload());

  // FALLBACK VÍDEO AL PULSAR EL BOTÓN
  const videoBtn = document.getElementById("video-btn");
  const fallbackVideo = document.getElementById("fallback-video");
  if (videoBtn && fallbackVideo) {
    videoBtn.addEventListener("click", () => {
      fallbackVideo.style.display = "block";
      fallbackVideo.play();
    });
  }

  // CERRAR AGENTE EMBEBIDO
  const closeBtn = document.getElementById("close-agent-btn");
  const agentContainer = document.getElementById("agent-container");
  if (closeBtn && agentContainer) {
    closeBtn.addEventListener("click", () => {
      agentContainer.style.display = "none";
    });
  }
});
