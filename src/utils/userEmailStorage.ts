export function setUserEmail(email: string) {
  localStorage.setItem("userEmail", email);
}

export function removeUserEmail() {
  localStorage.removeItem("userEmail");
}
