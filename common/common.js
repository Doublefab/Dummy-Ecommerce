

function openModal(modalId) {
  const modal = document.getElementById(modalId);
    modal.classList.remove("hidden");
    document.getElementById("backdrop").classList.remove("hidden");
}
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
    modal.classList.add("hidden");
    document.getElementById("backdrop").classList.add("hidden");
}
  