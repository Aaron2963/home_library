import Swal from "sweetalert2"
export default Swal.mixin({
  toast: true,
  position: "top",
  timer: 3000,
  showConfirmButton: false,
})